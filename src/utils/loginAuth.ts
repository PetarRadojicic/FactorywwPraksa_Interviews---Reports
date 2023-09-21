import bcrypt from 'bcryptjs';
import { getUserData } from './API';
import { getToken } from './token';

export const loginAuth = async (username: string, password: string) => {
    const response = await getUserData('users', sessionStorage.getItem("token"));

    let send = "";

    const user = response.data.find((ele: any) => {
        if (username === ele.email && bcrypt.compareSync(password, ele.password)) {
            if (ele.admin) {
                const payload = {
                    "email": username,
                    "password": password
                }
                
                getToken("token", payload);
                send = "AdminPanel";
            } else {
                send = "UsersPanel";
            }
        }
    });

    if (send === "AdminPanel") {
        return "AdminPanel";
    } else if (send === "UsersPanel") {
        return "UsersPanel";
    } else {
        alert('User doesnt exist')
        return "";
    }
}
