export const checkSearch = (name:string,input:string) => {
    if (name.toLowerCase().startsWith(input)) {
        return true;
    }
    else {
        return false;
    };
};
