import toast, { ToastOptions } from "react-hot-toast";

const toastOptions: ToastOptions = {
  duration: 2500,
  position: 'bottom-right'
}

const showToast = () => {
  const showToastFun = (message: string, type: 'success' | 'error', option?: ToastOptions) => {
    if (type === 'success') {
      toast.success(message, { ...toastOptions, ...option });
    } else if (type === 'error') {
      toast.error(message, { ...toastOptions, ...option });
    }
  }

  return showToastFun;
}

export default showToast;
