export const trimDate = (date: string) => {

    if (!date) return ''
    else {
        const trimmedDate = `.${date.split(' ')[1]}.${date.split(' ')[2]}.${date.split(' ')[3]}`

        return trimmedDate
    }
}
