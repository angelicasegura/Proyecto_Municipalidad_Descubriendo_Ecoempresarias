import type React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import {
  PlusCircle,
  Save,
  Building2,
  Phone,
  Mail,
  MapPin,
  Fingerprint,
  User,
  Image as ImageIcon,
  FileText,
} from "lucide-react";

import { type TipoActividad } from "../../../../types/emprendedoresType";

interface ModalCrearEmprendimientoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tiposActividad: TipoActividad[];
  onSubmit: (data: any) => Promise<void>;
}

export function ModalCrearEmprendimiento({
  open,
  onOpenChange,
  tiposActividad,
  onSubmit,
}: ModalCrearEmprendimientoProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    cedulaJuridica: "",
    telefono: "",
    email: "",
    direccion: "",
    descripcion: "",
    tipoActividadId: "",
    usuarioId: "",
  });

  const [imagen, setImagen] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const validate = () => {
    const newErrors: Record<string, boolean> = {};
    if (!formData.nombre) newErrors.nombre = true;
    if (!formData.cedulaJuridica) newErrors.cedulaJuridica = true;
    if (!formData.telefono) newErrors.telefono = true;
    if (!formData.email) newErrors.email = true;
    if (!formData.tipoActividadId) newErrors.tipoActividadId = true;
    if (!formData.usuarioId) newErrors.usuarioId = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const formDataToSend = new FormData();

    formDataToSend.append("Nombre", formData.nombre);
    formDataToSend.append("CedulaJuridica", formData.cedulaJuridica);
    formDataToSend.append("Telefono", formData.telefono);
    formDataToSend.append("Email", formData.email);
    formDataToSend.append("Direccion", formData.direccion);
    formDataToSend.append("Descripcion", formData.descripcion);
    
    formDataToSend.append("TipoActividadId", String(formData.tipoActividadId));
    formDataToSend.append("UsuarioId", String(formData.usuarioId));
    formDataToSend.append("EstadoId", "1");

    if (imagen) {
      formDataToSend.append("Imagen", imagen);
    }

    onSubmit(formDataToSend);
    handleClose(false);
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setFormData({
        nombre: "",
        cedulaJuridica: "",
        telefono: "",
        email: "",
        direccion: "",
        descripcion: "",
        tipoActividadId: "",
        usuarioId: "",
      });
      setImagen(null);
      setErrors({});
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[650px] max-h-[95vh] overflow-y-auto">
        <DialogHeader className="bg-[#056F94] -m-6 mb-2 p-6 rounded-t-lg">
          <DialogTitle className="flex items-center gap-2 text-white text-xl">
            <PlusCircle className="h-6 w-6" />
            Registrar Nuevo Emprendimiento
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          {/* SECCIÓN 1 */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <User className="h-4 w-4" /> Datos del Propietario
            </h3>

            <div className="space-y-2">
              <Label>
                ID de Usuario (Dueño) <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="Ej: 119770693"
                className={errors.usuarioId ? "border-red-500 shadow-sm" : ""}
                value={formData.usuarioId}
                onChange={(e) =>
                  setFormData({ ...formData, usuarioId: e.target.value })
                }
              />
            </div>
          </div>

          {/* SECCIÓN 2 */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Building2 className="h-4 w-4" /> Detalles del Negocio
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  Nombre Comercial <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Nombre del emprendimiento"
                  className={errors.nombre ? "border-red-500" : ""}
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Cédula Jurídica <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Fingerprint className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="X-XXX-XXXXXX"
                    maxLength={12}
                    className={`pl-10 ${errors.cedulaJuridica ? "border-red-500" : ""}`}
                    value={formData.cedulaJuridica}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cedulaJuridica: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Tipo actividad + Teléfono */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  Tipo de Actividad <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.tipoActividadId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, tipoActividadId: value })
                  }
                >
                  <SelectTrigger
                    className={errors.tipoActividadId ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Seleccione una actividad" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposActividad.map((tipo) => (
                      <SelectItem
                        key={`modal-act-${tipo.tipoActividadId}`}
                        value={String(tipo.tipoActividadId)}
                      >
                        {tipo.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>
                  Teléfono <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="8888-8888"
                    className={`pl-10 ${errors.telefono ? "border-red-500" : ""}`}
                    value={formData.telefono}
                    onChange={(e) =>
                      setFormData({ ...formData, telefono: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label>
                Correo Electrónico <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  type="email"
                  placeholder="contacto@ejemplo.com"
                  className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Dirección */}
            <div className="space-y-2">
              <Label>Dirección Física</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Provincia, Cantón, señas exactas..."
                  className="pl-10"
                  value={formData.direccion}
                  onChange={(e) =>
                    setFormData({ ...formData, direccion: e.target.value })
                  }
                />
              </div>
            </div>

            {/* NUEVOS CAMPOS SIN CAMBIAR DISEÑO */}
            <div className="space-y-2">
              <Label>Descripción</Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  className="pl-10"
                  placeholder="Descripción del emprendimiento"
                  value={formData.descripcion}
                  onChange={(e) =>
                    setFormData({ ...formData, descripcion: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Imagen / Logo</Label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  type="file"
                  accept="image/*"
                  className="pl-10"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImagen(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50"
              onClick={() => handleClose(false)}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              className="bg-[#54b413] hover:bg-[#3c810e] text-white px-8"
            >
              <Save className="h-4 w-4 mr-2" />
              Guardar Emprendimiento
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
