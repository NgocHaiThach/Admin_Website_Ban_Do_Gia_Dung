export const formatDate = (date) => {
    let d = new Date(date);
    return (
        paddingZero(d.getUTCDate()) +
        '/' +
        paddingZero(d.getUTCMonth() + 1) +
        '/' +
        d.getFullYear()
    );
}

const paddingZero = (n) => {
    return n < 10 ? '0' + n : n;
}

export const formatPhone = (p) => {
    return '+84' + p.replace(/-/g, '');
}