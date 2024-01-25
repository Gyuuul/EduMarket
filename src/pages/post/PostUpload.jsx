import React, { useState,useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Common from '../../components/common/Common'
import { URL } from '../../lib/apis/constant/path';
import album from '../../assets/icons/icon/Image-button.webp'
import deleteBtn from '../../assets/icons/icon/delete-button.webp'

export default function PostUpload() {
    const userToken = localStorage.getItem('Access Token');
    const [content, setContent]= useState('');
    const [showImage, setShowImage]= useState([]);
    const [postImage, setPostImage]= useState([]);
    const [imageMessage, setImageMessage]= useState('');
    const [uploadMessage, setUploadMessage]= useState('');
    const inputRef= useRef(null);
    const navigate= useNavigate();
    const data = {
        post: {
            content: '',
            image: '',
        },
    };
    async function UploadImage(file){
        const formData= new FormData();
        formData.append('image', file);

        const res= await axios.post(`${URL}/image/uploadfile`, formData);
        const imageName = `${URL}/` + res.data.filename;

        return imageName;
    }
        const ViewImage= (e)=>{
        let fileUrl= [...showImage];
        let files= [...postImage]
        const fileArray= e.target.files;
        const maxSize= 10 * 1024 * 1024;
        let TotalSize= 0;

        for(let i=0; i< fileArray.length; i++){
            TotalSize += fileArray[i].size;

            if(TotalSize> maxSize){
                setImageMessage(' 이미지 크기는 10MB 제한입니다.');
            }else{
                const createUrl= window.URL.createObjectURL(fileArray[i]);
                fileUrl.push(createUrl);
                files.push(fileArray[i]);
            }
        }

        if(fileUrl.length > 3){
            setImageMessage('사진은 최대 3장까지 업로드 할 수 있습니다.');
            setUploadMessage('');
            fileUrl= fileUrl.slice(0,3);
            files= files.slice(0,3);
        }else if(fileUrl.length <= 3){
            setImageMessage('');
        }
        setShowImage(fileUrl);
        setPostImage(files);
    }

    /* 이미지 삭제함수 */
    const DeleteImage= (id)=> {
        setShowImage(
            showImage.filter((_, index)=> {
                return index !== id;
            })
        );

        setPostImage(
            postImage.filter((_, index)=> {
                return index !== id;
            })
        );
    }

     /* 게시글 업로드 함수 */
    async function Upload(){
        const imageList= [];
        
        for(let i= 0; i< postImage?.length; i++){
            imageList.push(UploadImage(postImage[i]));
        }

        const List= await Promise.all(imageList);

        data.post.image = List.join(',');
        data.post.content = content;

        if(data.post.content == '' && data.post.image == ''){
            setUploadMessage('글 또는 사진을 입력해주세요.')
        }

        try{
            const res= await axios.post(`${URL}/post`, data, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-type': 'application/json',
                },
            });

            navigate(`/post/feed`);
        }catch(error){
            console.log(error);
        }
    }

    const page= (
        <UploadWrap>
            <UploadDiv>
                <Wrap>
                    <Title>
                        <h2>POST</h2>
                    </Title>
                    <Description> 글과 사진을 자유롭게 공유할 수 있습니다. </Description>
                    
                    <Div>
                        <Label htmlFor='post'/>
                        <TextArea
                            name='post'
                            id= 'post'
                            placeholder='내용을 입력해주세요.'
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                                if(e.target.value.length > 0){
                                    setUploadMessage('');
                                }
                            }}
                        />
                        <Ul>
                            {showImage.map((image, id)=> {
                                return(
                                    <Li key={id}>
                                        <img key={id} src={image} alt="게시글 이미지"/>
                                        <DeleteButton
                                            onClick= {()=> {
                                                return DeleteImage(id);
                                            }}
                                            aria-label="삭제 버튼">
                                            <img src={deleteBtn} alt="삭제" />
                                        </DeleteButton>
                                    </Li>
                                )
                            })}
                        </Ul>
                        <>
                            {uploadMessage === '' 
                            ? 
                            (<Alert>{imageMessage}</Alert>)
                            :
                            (<Alert>{uploadMessage}</Alert>)    
                            }
                        </>
                        <ImageDiv>
                            <Button onClick={Upload} aria-label="게시글 등록">게시글 등록하기</Button>
                            <Label htmlFor="input-file">
                                <img src={album} alt="앨범 이미지" />
                            </Label>
                            <Input
                                id="input-file"
                                name="PostImg"
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                onChange={(e) => {
                                    ViewImage(e);
                                    setUploadMessage('');
                                }}
                                value={data.post.image}
                                ref={inputRef}
                            />
                        </ImageDiv>
                    </Div>
                </Wrap>
            </UploadDiv>
        </UploadWrap>
    )
    return (
        <>
            <Common page={page} />
        </>
    )
}
const UploadWrap= styled.div`
    background-color: #dae1e6;
    padding: 200px 0;
`
const UploadDiv= styled.div`
    max-width: 1400px;
    margin: 0 auto;
`
const Wrap= styled.div`
    padding: 40px 80px 90px;
    border: 1px solid rgba(0,0,0,0.09);
    border-radius: 15px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    background-color: #ffff;
`
const Title= styled.div`
    padding: 50px 0 40px;
    font-size: 40px;
    text-align: center;
    color: #2b2b2b;
    border: none;
    padding-bottom: 0;
    &h2{
        display: inline-block;
        color: #2b2b2b;
    }
`
const Description= styled.h3`
    font-size: 20px;
    text-align: center;
    color: #868686;
    margin-bottom: 30px;
`
const Div= styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Alert= styled.p`
    font-size: 14px;
    color: #C63D2F;
    margin-top: 20px;
    margin-bottom: -10px;
    margin-left: -60px;
`
const ImageDiv= styled.div`
    display: flex;
    gap: 20px;
    margin-top: 30px;
`
const Label= styled.label`
    & img {
        width: 60px;
        height: 60px;
        border-radius: 7px;
    }
`
const Input= styled.input`
    display: none;
`
const TextArea= styled.textarea`
    font-family: "Noto_Sans_KR-400";
    font-size: 20px;
    resize: none;
    width: 70%;
    height: 500px;
    margin: 0 auto;
    padding: 16px;
`
const Ul= styled.ul`
    display: flex;
    gap: 15px;
    margin-top: 30px;
`
const Li= styled.li`
    border: 1px solid rgba(0,0,0,0.09);
    border-radius: 10px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    & img {
        width: 280px;
        height: 180px;
        object-fit: cover;
    }
`
const DeleteButton= styled.button`
    & img {
        position: absolute;
        width: 32px;
        height: 32px;
        border-radius: 50px;
        background-color: #475569;
        margin-top: -190px;
        margin-left: -20px;
        cursor: pointer;
    }
`
const Button= styled.button`
    width: 400px;
    height: 60px;
    line-height: 60px;
    background: #C63D2F;
    border: 1px solid #C63D2F;
    border-radius: 5px;
    color: #fff;
    font-size: 15px;
    font-weight: 400;
    cursor: pointer;
`