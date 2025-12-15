// =====================================
// Autenticación 
// =====================================

const USERS_KEY = "eco_users";
const SESSION_KEY = "eco_session";

function seedUsers() {
  const existing = JSON.parse(localStorage.getItem(USERS_KEY) || "null");
  if (existing && Array.isArray(existing) && existing.length > 0) return;

  const users = [
    { id: 1, nombre: "Admin", email: "admin@muni.cr", password: "1234", rol: "Administrador", activo: true },
    { id: 2, nombre: "Emprendedor", email: "empre@muni.cr", password: "1234", rol: "Emprendedor", activo: true },
    { id: 3, nombre: "Comprador", email: "user@muni.cr", password: "1234", rol: "Comprador", activo: true }
  ];

  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getUsers() {
  seedUsers();
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setSession(user) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ id: user.id, nombre: user.nombre, email: user.email, rol: user.rol })
  );
}

function getSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

// =======================
// LOGIN (RF-016-1)
// =======================
function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return { ok: false, msg: "Usuario o contraseña incorrectos." };
  if (!user.activo) return { ok: false, msg: "Cuenta bloqueada. Contacte al administrador." };

  setSession(user);
  return { ok: true, user };
}

// =====================================================
// REGISTRO / ROLES / NOTIFICACIONES
// =====================================================

// REGISTRO (RF-016-2)
// Valida correo repetido y crea usuario con rol por defecto "Comprador"
function registerUser(nombre, email, password, rol = "Comprador") {
  const users = getUsers();

  if (!nombre || !email || !password) {
    return { ok: false, msg: "Debe completar todos los campos." };
  }

  const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return { ok: false, msg: "El correo ya está registrado." };
  }

  // Validación simple de contraseña
  if (password.length < 4) {
    return { ok: false, msg: "La contraseña es muy corta." };
  }

  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    nombre: nombre,
    email: email,
    password: password,
    rol: rol,
    activo: true
  };

  users.push(newUser);
  saveUsers(users);

  return { ok: true, user: newUser };
}

// ROLES (RF-016-3)
// Verifica si el usuario logueado es Administrador
function isAdmin() {
  const session = getSession();
  return session && session.rol === "Administrador";
}

// Cambiar rol de un usuario (solo Admin)
function updateUserRoleById(userId, newRole) {
  if (!isAdmin()) {
    return { ok: false, msg: "Acceso denegado. Solo Administrador puede gestionar roles." };
  }

  const users = getUsers();
  const idx = users.findIndex(u => u.id === userId);

  if (idx === -1) {
    return { ok: false, msg: "Usuario no encontrado." };
  }

  const oldRole = users[idx].rol;
  users[idx].rol = newRole;
  saveUsers(users);

  // Registro de auditoría simple en memoria
  addAuditLog(`Cambio de rol: ${users[idx].email} (${oldRole} → ${newRole})`);

  return { ok: true, oldRole, newRole, user: users[idx] };
}

// Auditoría
const AUDIT_KEY = "eco_audit";
function getAuditLog() {
  return JSON.parse(localStorage.getItem(AUDIT_KEY) || "[]");
}
function addAuditLog(msg) {
  const session = getSession();
  const audit = getAuditLog();
  audit.unshift({
    msg: msg,
    fecha: new Date().toLocaleString(),
    por: session ? session.email : "sistema"
  });
  localStorage.setItem(AUDIT_KEY, JSON.stringify(audit));
}

// NOTIFICACIONES (RF-013-3 / RF-011-1) 
const NOTIF_KEY = "eco_notifs";

function getNotifications() {
  return JSON.parse(localStorage.getItem(NOTIF_KEY) || "[]");
}

// Agrega notificación al usuario logueado (o a un usuario específico si se envía userId)
function addNotification(mensaje, tipo = "General", userId = null) {
  const session = getSession();
  const notifs = getNotifications();

  const targetId = userId !== null ? userId : (session ? session.id : null);
  if (targetId === null) {
    return { ok: false, msg: "No hay sesión activa para asignar la notificación." };
  }

  notifs.unshift({
    id: Date.now(),
    userId: targetId,
    tipo: tipo,
    mensaje: mensaje,
    fecha: new Date().toLocaleString(),
    leida: false
  });

  localStorage.setItem(NOTIF_KEY, JSON.stringify(notifs));
  return { ok: true };
}

// Devuelve notificaciones SOLO del usuario logueado
function getMyNotifications() {
  const session = getSession();
  if (!session) return [];
  const notifs = getNotifications();
  return notifs.filter(n => n.userId === session.id);
}

// Marca una notificación como leída
function markNotificationAsRead(notifId) {
  const notifs = getNotifications();
  const idx = notifs.findIndex(n => n.id === notifId);
  if (idx !== -1) {
    notifs[idx].leida = true;
    localStorage.setItem(NOTIF_KEY, JSON.stringify(notifs));
  }
}

// Cuenta cuántas no leídas tiene el usuario logueado
function countUnreadNotifications() {
  const mine = getMyNotifications();
  return mine.filter(n => !n.leida).length;
}

// Cerrar sesión 
function logoutUser(redirectTo = "../Usuarios/login.html") {
  clearSession();
  window.location.href = redirectTo;
}
// =====================================
// NOTIFICACIONES
// =====================================
const NOTIF_KEY = "eco_notifications";

function _getAllNotifs() {
  return JSON.parse(localStorage.getItem(NOTIF_KEY) || "[]");
}

function _saveAllNotifs(list) {
  localStorage.setItem(NOTIF_KEY, JSON.stringify(list));
}

function seedNotifications() {
  const existing = JSON.parse(localStorage.getItem(NOTIF_KEY) || "null");
  if (existing && Array.isArray(existing) && existing.length > 0) return;

  // Asegura que existan users (porque usamos ids)
  const users = getUsers();

  const admin = users.find(u => u.rol === "Administrador");
  const empr = users.find(u => u.rol === "Emprendedor");
  const comp = users.find(u => u.rol === "Comprador");

  const now = new Date();
  const iso = (d) => d.toISOString();

  const sample = [];

  if (admin) {
    sample.push(
      { id: 1, userId: admin.id, rol: "Administrador", tipo: "APROBACION", titulo: "Nueva solicitud pendiente", mensaje: "Hay un emprendimiento pendiente de revisión.", fechaISO: iso(new Date(now.getTime() - 1000*60*60*2)), leida: false },
      { id: 2, userId: admin.id, rol: "Administrador", tipo: "REVISION_PRODUCTO", titulo: "Producto por aprobar", mensaje: "Un emprendedor envió un producto para aprobación.", fechaISO: iso(new Date(now.getTime() - 1000*60*30)), leida: false }
    );
  }

  if (empr) {
    sample.push(
      { id: 3, userId: empr.id, rol: "Emprendedor", tipo: "ESTADO_EMPRENDIMIENTO", titulo: "Tu emprendimiento está en revisión", mensaje: "El administrador revisará tu solicitud pronto.", fechaISO: iso(new Date(now.getTime() - 1000*60*80)), leida: false },
      { id: 4, userId: empr.id, rol: "Emprendedor", tipo: "PRODUCTO_OBSERVADO", titulo: "Producto observado", mensaje: "Hay observaciones en uno de tus productos.", fechaISO: iso(new Date(now.getTime() - 1000*60*10)), leida: true }
    );
  }

  if (comp) {
    sample.push(
      { id: 5, userId: comp.id, rol: "Comprador", tipo: "EVENTO", titulo: "Nuevo evento disponible", mensaje: "Hay un nuevo evento publicado en la plataforma.", fechaISO: iso(new Date(now.getTime() - 1000*60*120)), leida: false },
      { id: 6, userId: comp.id, rol: "Comprador", tipo: "CARRITO", titulo: "Recordatorio de carrito", mensaje: "Tienes productos pendientes en tu carrito.", fechaISO: iso(new Date(now.getTime() - 1000*60*15)), leida: true }
    );
  }

  _saveAllNotifs(sample);
}

function getMyNotifications() {
  seedNotifications();
  const s = getSession();
  if (!s) return [];
  return _getAllNotifs()
    .filter(n => n.userId === s.id)
    .sort((a, b) => new Date(b.fechaISO) - new Date(a.fechaISO));
}

function countUnreadNotifications() {
  const s = getSession();
  if (!s) return 0;
  return getMyNotifications().filter(n => !n.leida).length;
}

function markNotificationRead(notifId) {
  const s = getSession();
  if (!s) return { ok: false, msg: "Debe iniciar sesión." };

  const all = _getAllNotifs();
  const idx = all.findIndex(n => n.id === notifId && n.userId === s.id);
  if (idx === -1) return { ok: false, msg: "Notificación no encontrada." };

  all[idx].leida = true;
  _saveAllNotifs(all);
  return { ok: true };
}

function markAllNotificationsRead() {
  const s = getSession();
  if (!s) return { ok: false, msg: "Debe iniciar sesión." };

  const all = _getAllNotifs().map(n => {
    if (n.userId === s.id) n.leida = true;
    return n;
  });
  _saveAllNotifs(all);
  return { ok: true };
}

// Para crear notificaciones desde otros módulos
function createNotificationForUser(userId, rol, tipo, titulo, mensaje) {
  seedNotifications();
  const all = _getAllNotifs();
  const nextId = all.length ? Math.max(...all.map(x => x.id)) + 1 : 1;

  const notif = {
    id: nextId,
    userId,
    rol,
    tipo,
    titulo,
    mensaje,
    fechaISO: new Date().toISOString(),
    leida: false
  };

  all.push(notif);
  _saveAllNotifs(all);
  return { ok: true, notif };
}
