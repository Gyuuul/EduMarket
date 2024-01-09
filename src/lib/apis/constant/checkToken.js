export default function checkToken() {
    const token = localStorage.getItem('Access Token');

    if (!token) {
        return false;
    }

    return true;
}
