import {postInterview} from '../modules/API'

export const loginAuth = (username: string, password: string) => {

    const payload = {
        "email": "dev@dev.com",
        "password": "developer"
      }


    const getToken = async () => {
        postInterview(payload).then(response => {
            sessionStorage.setItem("token",response.data.accessToken);
          })
    }
    getToken()

    if (username && password == 'root') {
        return "AdminPanel"
    }
    else {
        return "UsersPanel"
    }
}