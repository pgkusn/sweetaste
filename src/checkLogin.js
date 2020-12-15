export function checkLogin () {
    const lineLogged = localStorage.getItem('lineProfile');
    const fbLogged = localStorage.getItem('fbProfile');
    const userLogged = localStorage.getItem('userProfile');
    return lineLogged || fbLogged || userLogged;
}
