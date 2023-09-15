import {getToken} from '../modules/token'

export const loginAuth = (username: string, password: string) => {

    //DEBUG 

    const payload = {
        "email": "dev@dev.com",
        "password": "developer"
      }

      getToken("token",payload)

    //   console.log(token)
    //   const payload = {
    //       "email": username,
    //       "password": password
    //     }

    if (username == 'dev@dev.com') {
        return "AdminPanel"
    }
    else {
        return "UsersPanel"
    }
}