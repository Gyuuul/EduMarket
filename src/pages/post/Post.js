import instance from '../../lib/apis/interceptor';

export const getDelete= async(Id)=>{
    try {
        // 위에서 지정한 baseURL 뒤에 다음 URL이 붙는다.
        const response = await instance.delete(`post/${Id}`);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export const getDetail= async( Id )=> {
    try {
        const response = await instance.get(`post/${Id}`);
        console.log(response);
        return response.data?.post;
    } catch (error) {
        console.log(error);
    }
}

export const getUserPost= async(accountname)=> {
    try {
        const response = await instance.get(`/post/${accountname}/userpost/?limit=10&skip=0`);
        console.log(response);
        return response.data?.post;
    } catch (error) {
        console.log(error);
    }
}