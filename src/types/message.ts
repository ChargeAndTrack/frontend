export const MessageType = {
    "Info": 'info',
    "Success": 'success',
    "Error": 'danger'
} as const;

export type MessageType = (typeof MessageType)[keyof typeof MessageType];
