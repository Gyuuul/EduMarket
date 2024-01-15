import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import Common from '../../components/common/Common'
import { URL as url } from '../../lib/apis/constant/path';
import album from '../../assets/icons/icon/Image-button.png'
import deleteBtn from '../../assets/icons/icon/delete-button.png'

export default function PostModify() {
    const { postId }= useParams();
    const userToken = localStorage.getItem('Access Token');
    const [content, setContent] = useState(''); // 게시글 입력 내용
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

    /* 이미지 업로드 함수 */
    async function UploadImage(file) {
        const formData = new FormData();
        formData.append('image', file);

        const response = await axios.post(`${url}/image/uploadfile`, formData);
        const imgName = `${url}/` + response.data.filename;

        return imgName;
    }

    /* 이미지 띄워주는 함수 */
    async function ViewImage(e) {
        let fileUrl= [...showImage];
        let files= [...postImage];
        const fileArray= e.target.files;

        // 이미지 사이즈 10MB 제한
        const maxSize = 10 * 1024 * 1024;
        let TotalImgSize = 0;

        for (let i = 0; i < fileArray.length; i++) {
            TotalImgSize += fileArray[i].size;

            if (TotalImgSize > maxSize) {
                alert(' 총 이미지의 크기는 10MB입니다.');
            } else {
                const createImgUrl = URL.createObjectURL(fileArray[i]);
                // fileImgs.push(await UploadImg(files[i]));
                fileUrl.push(UploadImage(fileArray[i]));
                files.push(createImgUrl);

            }
        }

        if(fileUrl.length> 3){
            setImageMessage('사진은 최대 3장까지 업로드 할 수 있습니다.');
            fileUrl= fileUrl.slice(0,3);
            files= files.slice(0,3);
        }else if(fileUrl.length <= 3){
            setImageMessage('');
        }

        setShowImage(fileUrl);
        setPostImage(files);
    }

    /* 이미지 삭제함수 */
    const DeleteImage = (id) => {
        setShowImage(
            showImage.filter((_, index) => {
                return index !== id;
            })
        );

        setPostImage(
            postImage.filter((_, index) => {
                return index !== id;
            })
        );
    };

    /* 게시글 업로드 함수 */
    async function Upload() {
        const imgList = [...showImage];
        const snsImgList = await Promise.all(imgList);

        data.post.image = snsImgList.join(',');
        data.post.content = content;

        if(data.post.content == '' && data.post.image == ''){
            setUploadMessage('글 또는 사진을 입력해주세요.')
        }

        try {
            const res = await axios
                .put(`${url}/post/${postId}`, data, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        'Content-type': 'application/json',
                    },
                });

                navigate(`/post/detail/${postId}`);

        }catch(error){
            console.log(error);
        }
    }
    
    /* 게시글 수정 함수 */
    async function PostModify() {
        const {
            data: {
                post,
            },
        } = await axios.get(`${url}/post/${postId}`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-type': 'application/json',
            },
        });

        // 기존 게시물에서 이미지를 받아올 땐 join으로 합쳤던 것을 다시 split로 나눠야함
        setPostImage(post.image.split(','));
        setShowImage(post.image.split(','));
        setContent(post.content);
    }

    useEffect(() => {
        PostModify();
    }, []);

    const page = (
        <UploadWrap>
            <UploadDiv>
                <Wrap>
                    <Title><H2>POST</H2></Title>
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
                            }}
                        />

                    {/* 이미지 미리보기 */}
                    <Ul>
                        {postImage.length !== 0
                            ? postImage.map((image, id) => {
                                    return (
                                        // 기존에 이미지가 있다면 뒤에 추가
                                        image && (
                                            <Li key={id}>
                                                <img key={id} src={image} />
                                                <DeleteButton
                                                    onClick= {()=> {
                                                        return DeleteImage(id);
                                                    }}
                                                >
                                                    <img src={deleteBtn} alt="" />
                                                </DeleteButton>
                                            </Li>
                                        )
                                    );
                                })
                            : postImage.map((image, id) => {
                                return (
                                    // 기존에 이미지가 없다면 새로 이미지 추가
                                    <Li key={id}>
                                        <img key={id} src={image} />
                                        <DeleteButton
                                            onClick= {()=> {
                                                return DeleteImage(id);
                                            }}
                                        >
                                            <img src={deleteBtn} alt="" />
                                        </DeleteButton>
                                    </Li>
                                );
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
                        <Button onClick={Upload}>게시글 수정하기</Button>
                        {/* 이미지 등록 버튼 */}
                        <Label htmlFor="input-file">
                            <img src={album} alt="" />
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
                            ref={inputRef}
                        />
                        </ImageDiv>
                    </Div>
                </Wrap>
            </UploadDiv>
        </UploadWrap>
    );

    return (
        <>
            <Common page={page} />
        </>
    );
}
const UploadWrap= styled.div`
    background-color: #f1f2f3;
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
`
const H2= styled.h2`
    font-family: "Noto_Sans_KR-600";
    display: inline-block;
    color: #2b2b2b;
`
const Description= styled.h3`
    font-family: "Noto_Sans_KR-400";
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
    font-family: "Noto_Sans_KR-400";
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
    font-family: "Noto_Sans_KR-400";
    display: none;
`
const TextArea= styled.textarea`
    font-family: "Noto_Sans_KR-400";
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
    font-family: "Noto_Sans_KR-400";
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