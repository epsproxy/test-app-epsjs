import { toast } from 'react-toastify';

export default class Toast {
    constructor(message) {
        if (message) {
            this.id = toast.loading(message)
        }
    }

    success(message) {
        this.show("success", message)
    }

    error(message) {
        this.show("error", message)
    }

    loading(message) {
        this.id = toast.loading(message)
    }

    show(type, message) {
        toast.update(this.id, { render: message, type: type, isLoading: false });
    }

    dismiss() {
        setTimeout(() => {
            toast.dismiss(this.id)
        }, 5000)
    }
}

