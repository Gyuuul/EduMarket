// 새로고침 후에도 삭제되지 않도록 스토리지에 저장
export default function checkToken() {
    const token = localStorage.token;

    if (!token) {
        return false;
    }

    return true;
}
