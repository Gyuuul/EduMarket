import { useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { URL } from '../../lib/apis/constant/path'
import album from '../../assets/icons/icon/Image-button.webp'

export const StudyImage= ({itemImage, setItemImage})=> {
    const imgStyle= {
        backgroundImage: `url(${itemImage})`,
    };
    const previewImage = useRef();

    function handle(e){
        const loadImage= e.target.files;
        const formData= new FormData();

        formData.append('image', loadImage[0]);
        onLoadImage(formData, loadImage);
    }
    async function onLoadImage(formData, loadImage){
        try{
            const response= await axios.post(`${URL}/image/uploadfile`, formData, {
                'Content-Type': 'multipart/form-data',
            });
            if(response.data.filename){
                setItemImage(`${URL}/${response.data.filename}`);
                preview(loadImage);
            }else{
                alert('.jpg, .gif, .png, .jpeg, .bmp, .tif, .heic 파일만 업로드 가능합니다.');
            }
        } catch (error){
            console.log(error);
        }
    }
        function preview(loadImage){
            const reader= new FileReader();
            reader.onload= ()=>{
                previewImage.current.style.backgroundImage = `url(${reader.result})`;
                previewImage.current.style.backgroundSize = 'cover';
                previewImage.current.style.backgroundRepeat = 'no-repeat';
            };
            reader.readAsDataURL(loadImage[0]);
        }
    return(
        <>
            <Div ref={previewImage} style={imgStyle}>
                <Label htmlFor="input-file"/>
                <Input
                    id="input-file"
                    name="PostImg"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={handle}
                />
            </Div>
        </>
    )
}

const Div= styled.div`
    position: relative;
    width: 400px;
    height: 300px;
    margin-bottom: 70px;
    border-radius: 10px;
    background: #dbdbdb;
    background-size: cover;
`
const Label= styled.label`
    position: absolute;
    width: 50px;
    height: 50px;
    bottom: 20px;
    right: 20px;
    border-radius: 7px;
    background: url(${album});
    background-size: contain;
`
const Input= styled.input`
    display: none;
`

