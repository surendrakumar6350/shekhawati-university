// react-message-popup.d.ts
declare module 'react-message-popup' {
    interface MessagePopup {
        error: (message: string, duration?: number) => void;
        success: (message: string, duration?: number) => void;
        info?: (message: string, duration?: number) => void;
        // Add more methods as needed
    }

    // Exporting message as a named export
    export const message: MessagePopup;
}