import { toast } from 'react-toastify'

export const useNotification = () => {
     
    function notify(messege: string, level: "success" | "info" | "warning" | "error" ){
        toast(messege, {
            type: level
        })
    }
    
    return {
        notify
    }
}