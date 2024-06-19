import { toast } from 'react-toastify';

const configToast:any = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
}

class Toastify {
    static success(message: string) {
        toast.success(message, configToast);
    }

    static danger(message: string) {
        toast.error(message, configToast);
    }

    static warn(message: string) {
        toast.warn(message, configToast);
    }
}


export { Toastify }
