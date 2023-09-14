export const loginAuth = (username: string, password: string) => {

    if (username && password == 'admin') {
        return "AdminPanel"
    }
    else {
        return "UsersPanel"
    }
}