import addNotification from "react-push-notification";

export const errorHandler = (error : string) => {
    addNotification({
        title: "Warning",
        subtitle: error,
        theme: "light",
    });
}
