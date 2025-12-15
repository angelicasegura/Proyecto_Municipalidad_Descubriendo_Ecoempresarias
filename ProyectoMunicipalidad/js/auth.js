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
// NOTIFICACIONES (para Admin / Emprendedor / Comprador)
// =====================================

const NOTIF_KEY = "eco_notifs";

function seedNotifications() {
  const existing = JSON.parse(localStorage.getItem(NOTIF_KEY) || "null");
  if (existing && Array.isArray(existing)) return;

  const demo = [
    // Admin
    {
      id: 1,
      paraRol: "Administrador",
      titulo: "Nueva solicitud pendiente",
      mensaje: "Hay una solicitud de publicación pendiente de revisión.",
      tipo: "Aprobación",
      leida: false,
      fecha: new Date().toISOString()
    },
    // Emprendedor
    {
      id: 2,
      paraRol: "Emprendedor",
      titulo: "Producto en revisión",
      mensaje: "Tu producto fue enviado y está pendiente de aprobación por el administrador.",
      tipo: "Productos",
      leida: false,
      fecha: new Date().toISOString()
    },
    // Comprador
    {
      id: 3,
      paraRol: "Comprador",
      titulo: "Bienvenida",
      mensaje: "Tu cuenta fue creada exitosamente. ¡Explora los emprendimientos!",
      tipo: "Sistema",
      leida: false,
      fecha: new Date().toISOString()
    }
  ];

  localStorage.setItem(NOTIF_KEY, JSON.stringify(demo));
}

function getNotifications() {
  seedNotifications();
  return JSON.parse(localStorage.getItem(NOTIF_KEY) || "[]");
}

function saveNotifications(list) {
  localStorage.setItem(NOTIF_KEY, JSON.stringify(list));
}

function nextNotifId(list) {
  const maxId = list.reduce((max, n) => Math.max(max, Number(n.id) || 0), 0);
  return maxId + 1;
}

/**
 * Crea una notificación para un rol (Admin/Emprendedor/Comprador)
 */
function addNotification(paraRol, titulo, mensaje, tipo = "General") {
  const list = getNotifications();
  const notif = {
    id: nextNotifId(list),
    paraRol,
    titulo,
    mensaje,
    tipo,
    leida: false,
    fecha: new Date().toISOString()
  };
  list.unshift(notif);
  saveNotifications(list);
  return notif;
}

/**
 * Cuenta no leídas del rol del usuario logueado
 */
function countUnreadNotifications() {
  const session = getSession();
  if (!session) return 0;
  const list = getNotifications();
  return list.filter(n => n.paraRol === session.rol && !n.leida).length;
}

/**
 * Obtiene notificaciones del rol actual
 */
function getMyNotifications() {
  const session = getSession();
  if (!session) return [];
  return getNotifications().filter(n => n.paraRol === session.rol);
}

function markNotificationRead(id) {
  const list = getNotifications();
  const idx = list.findIndex(n => Number(n.id) === Number(id));
  if (idx >= 0) {
    list[idx].leida = true;
    saveNotifications(list);
  }
}

function markAllMyNotificationsRead() {
  const session = getSession();
  if (!session) return;
  const list = getNotifications();
  for (const n of list) {
    if (n.paraRol === session.rol) n.leida = true;
  }
  saveNotifications(list);
}

// =====================================
// HOOKS a Login/Registro (para generar notifs)
// =====================================

const __loginUserOriginal = loginUser;
loginUser = function(email, password) {
  const result = __loginUserOriginal(email, password);
  if (result && result.ok) {
    // Ejemplo: notificación al iniciar sesión
    addNotification(result.user.rol, "Inicio de sesión", "Has iniciado sesión correctamente.", "Sistema");
  }
  return result;
};

//función de registro
function registerUser(nombre, email, password, rol = "Comprador") {
  const users = getUsers();

  if (!nombre || !email || !password) {
    return { ok: false, msg: "Completa todos los campos." };
  }

  if (users.some(u => u.email === email)) {
    return { ok: false, msg: "El correo ya está registrado." };
  }

  const newUser = {
    id: users.length + 1,
    nombre,
    email,
    password,
    rol,
    activo: true
  };

  users.push(newUser);
  saveUsers(users);

  // Notificación de bienvenida
  addNotification(rol, "Cuenta creada", "Tu cuenta fue creada exitosamente.", "Sistema");

  return { ok: true, user: newUser };
}

function logoutUser(redirectUrl = "/Usuarios/login.html") {
  clearSession();
  window.location.href = redirectUrl;
}
