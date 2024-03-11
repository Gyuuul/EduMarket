import instance from "../../lib/apis/interceptor";

export default async function getUserProfile(accountname) {
    try {
        const response = await instance.get(`/profile/${accountname}`);
        console.log(response);
        return response.data.profile;
    } catch (error) {
        console.log(error);
    }
}
