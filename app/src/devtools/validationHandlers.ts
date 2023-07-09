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

export const parameterValidation = (parameter : string, value : number) => {
    switch (parameter) {
        case "Пульс" : {
            if (value >= 60 && value <= 90) return "Норма"
            else return "Отклонено от нормы"
        }
        case "Давление" : {
            if (value >= 115 && value <= 135) return "Норма"
            else return "Отклонено от нормы"
        }
        case "Температура" : {
            if (value >= 36 && value < 37) return "Норма"
            else return "Отклонено от нормы"
        }
        case "Сатурация" : {
            if (value >= 95 && value <= 100) return "Норма"
            else return "Отклонено от нормы"
        }
        case "Сахар" : {
            if (value >= 3.3 && value <= 5.5) return "Норма"
            else return "Отклонено от нормы"
        }
        default : {
            return "Отклонено от нормы"
        }
    }
}

export const metricValidation = (parameter : string) => {
    switch (parameter) {
        case "Пульс" : return "уд/мин"
        case "Давление" : return "ммрт"
        case "Температура" : return "°"
        case "Сатурация" : return "%"
        case "Сахар" : return "ммоль/л"
        default : return ""
    }
}
