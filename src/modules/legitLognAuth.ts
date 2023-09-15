import { getToken } from '../modules/token';
import { getInterview } from '../modules/API';
import bcrypt from 'bcryptjs';

export const loginAuth = async (username: string, password: string) => {
    const response = await getInterview('users', sessionStorage.getItem("token"));

    const user = response.data.find((ele: any) => {
        if (username === ele.email) {
            if (bcrypt.compareSync(password, ele.hashedPassword)) {
                if (ele.admin) {
                    const payload = {
                        "email": username,
                        "password": password
                    }

                    getToken("token", payload)
                    return true;
                } else {
                    return true;
                }
            }
        }
        return false;
    });

    if (user) {
        return "AdminPanel"; 
    } else {
        return "UsersPanel";
    }
}
