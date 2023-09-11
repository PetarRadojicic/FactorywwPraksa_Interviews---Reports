export const loginAuth = (username: string, password: string) => {

    if (username && password == 'root') {
        return "AdminPanel"
    }
    else {
        return "UsersPanel"
    }
}