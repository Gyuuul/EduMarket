import instance from '../../lib/apis/interceptor';

export const getDelete= async(Id)=>{
    try {
        const response = await instance.delete(`/product/${Id}`);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export const getStudyList= async(accountname)=>{
    try {
        const response = await instance.get(`/product/${accountname}/?limit=10&skip=0`);
        console.log(response);
        return response.data?.product;
    } catch (error) {
        console.log(error);
    }
}