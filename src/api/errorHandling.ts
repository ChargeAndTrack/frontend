import { reactive } from 'vue';
import { MessageType } from '@/types/message';

const message = reactive<{
    show: boolean,
    text: string,
    type: MessageType
}>({ show: false, text: '', type: MessageType.Info });

export function useErrorHandler() {

    const handleError = (error: any) => {
        message.show = true;
        const status = error.response?.status;
        const backendMessage = error.response?.data?.message;
        message.text = backendMessage ?? '';

        if (message.text === '') {
            switch (status) {
                case 400:
                    message.text = "Invalid request. Please check your input.";
                    break;
                case 404:
                    message.text = "The requested resource was not found.";
                    break;
                case 500:
                    message.text = "Server error. We're working on it!";
                    break;
                default:
                    message.text = "An unexpected error occurred.";
            }
        }
        message.type = MessageType.Error;
        setTimeout(() => (message.show = false), 4000);
    };

    const showSuccess = (msg: string) => {
        message.show = true;
        message.type = MessageType.Success;
        message.text = msg;
        setTimeout(() => (message.show = false), 4000);
    };

    return { message, handleError, showSuccess };
}
