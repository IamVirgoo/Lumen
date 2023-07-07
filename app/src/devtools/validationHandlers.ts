import addNotification from "react-push-notification";

export const errorHandler = (error : string) => {
    addNotification({
        title: "Warning",
        subtitle: error,
        theme: "light",
    })
}

export const submissionHandler = (text : string) => {
    addNotification({
        title: "Success",
        subtitle: text,
        theme: "light"
    })
}
