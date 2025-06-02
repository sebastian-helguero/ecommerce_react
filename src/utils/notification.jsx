import { toast, Bounce } from "react-toastify";

const defaultNotificationConfig = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce
}

export const errorToast = (message, config) => {
    return toast.error(message, {
        ...defaultNotificationConfig,
        ...config
    })
}

export const successToast = (message, config) => {
    return toast.success(message, {
        ...defaultNotificationConfig,
        ...config
    })
}

export const warningToast = (message, config) => {
    return toast.warning(message, {
        ...defaultNotificationConfig,
        ...config
    })
}