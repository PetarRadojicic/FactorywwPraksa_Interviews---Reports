import { getToken } from '../modules/token'
import { getInterview } from '../modules/API'

export const loginAuth = async (username: string, password: string) => {
    let gettoken = false;
    const response = await getInterview('users', sessionStorage.getItem("token"));

    const user = response.data.find((ele: any) => {
        if (username === ele.email && password === 'developer') {
            if (ele.admin) {
                const payload = {
                    "email": username,
                    "password": password
                }

                getToken("token", payload)

                console.log('Admin')
                gettoken = true;
                return true;
            } else {
                console.log('User')
                return true;
            }
        }
        return false;
    });

    if (user) {
        if (gettoken) {
            return "AdminPanel";
        } else {
            return "UsersPanel";
        }
    }

    alert("User doesn't exist")
    return "";
}