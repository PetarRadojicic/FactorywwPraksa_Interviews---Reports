import { getToken } from '../modules/token';
import { getInterview } from '../modules/API';
import bcrypt from 'bcryptjs';

export const loginAuth = async (username: string, password: string) => {
    const response = await getInterview('users', sessionStorage.getItem("token"));

    let send = "";

    // missed the point
    // if you read documentation, you can find that you are able to logina via /login api route
    // theres no need to get all users and then loop trough them
    // all you need to do is handle /login in a correct manner
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
