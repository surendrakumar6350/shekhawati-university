// react-message-popup.d.ts
declare module 'react-message-popup' {
    interface MessagePopup {
        error: (message: string, duration?: number) => void;
        success: (message: string, duration?: number) => void;
        loading: (message: string, duration?: number) => Promise<{ destroy: () => void }>;
    }

    // Exporting message as a named export
    export const message: MessagePopup;
}