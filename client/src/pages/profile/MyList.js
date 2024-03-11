import instance from '../../lib/apis/interceptor';

const accountname = localStorage.getItem('Account Name');

export const getMyStudyList= async()=>{
    try {
        const response = await instance.get(`/product/${accountname}/?limit=10&skip=0`);
        console.log(response);
        return response?.data?.product;
    } catch (error) {
        console.log(error);
    }
}

export const getMyPostList= async()=>{
    try {
        const response = await instance.get(`/post/${accountname}/userpost/?limit=10&skip=0`);
        console.log(response);
        return response.data?.post;
    } catch (error) {
        console.log(error);
    }
}