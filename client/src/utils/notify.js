import { toast } from "react-toastify";

export const notifyError = (message = "Ocurrió un error") =>
  toast.error(`⚠￣ ${message}!`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

export const notifySuccess = (message = "Operación realizada con éxito") =>
  toast.success(`✅ ${message}!`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

export const notifyWarn = (message = "Algo salión mal") =>
  toast.warn(`⚠￣ ${message}!`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

export const notifyInfo = (message = "Información") =>
  toast.info(`ℹ ${message}!`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
