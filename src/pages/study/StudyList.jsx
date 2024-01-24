import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import styled from 'styled-components';

import Common from '../../components/common/Common'
import { URL } from '../../lib/apis/constant/path';
import ItemLi from './ItemLi';
import { getStudyFollowingList } from '../../components/follow/getFollowingList';
import study from '../../assets/icons/illustration/Study.webp'
import MapTogether from '../../components/map/Map'

export default function StudyList() {
    const myProfile= useSelector((state)=> state.user.myInfo.image);
    const navigate= useNavigate();
    const [ref, inView]= useInView();

    const userToken = localStorage.getItem('Access Token');

    // 내 이웃의 전체 스터디    
    const [togetherLists, setTogetherLists]= useState([]);
    // 사용자에게 보여지는 스터디
    const [showList, setShowList]= useState([]); 
    // 나의 팔로잉 목록 불러오기
    const [following, setFollowing]= useState([]);
    const [pages, setPages]= useState(0);

    const placeArr= [
        '1. 뚝섬역 모각코🖥️', 
        '2. 회계사가 알려주는 회계직무 스터디🏦', 
        '3. 제약/ 바이오 산업에 대한 스터디💊',
        '4. UI/ UX 디자이너와 함께하는 스터디🎨',
        '5. 해외영업 직무탐색 모임✈️',
    ];

    const goTogetherUpload= ()=>{
        navigate('/together/upload');
    }

    // 내가 팔로우한 사람들 리스트에 불러오기
    useEffect(()=>{
        async function fetchMyStudyList(){
            let list= await getStudyFollowingList();
            setFollowing([...list]);
        }
        fetchMyStudyList();
    },[]);

    useEffect(() => {
        function postSort(a, b) {
        if (a.createdAt < b.createdAt) {
            return 1;
        }
        if (a.createdAt > b.createdAt) {
            return -1;
        }
        return 0;
        }

        togetherList()
            .then((res) => {
                const list= res.flat(1).sort(postSort);
                setTogetherLists(list);
                setShowList(list.slice(pages * 10, pages * 10 + 10));
                setPages(pages + 1);
                console.log(list)
                console.log(pages)

        })
        .catch((error)=>{
            console.log(error);
        });
    }, [following]);
    
        // 팔로잉 사람들의 상품 리스트 불러오기
        const togetherList = async () => {
            try {
                const togetherFollowList = await Promise.all(
                    following.map(async (list) => {
                        const res = await axios.get(
                            `${URL}/product/${list.accountname}/?limit=0&skip=0`,
                            {
                                headers: {
                                    "Authorization": `Bearer ${userToken}`,
                                    "Content-type": "application/json",
                                },
                            }
                        );
                        return res.data?.product;
                    })
                );
                return togetherFollowList;
            } catch (error) {
                console.log(error);
            }
        };

        // 무한스크롤 함수
        const addShowStudy= ()=> {
            const addStudyList= togetherLists.slice(pages * 10, pages * 10 + 10);
            setShowList([...showList, ...addStudyList]);
            setPages(pages + 1);
        };
    
        useEffect(()=> {
            if(inView){
                addShowStudy();
            }
        },[inView]);

        const goStudyUpload= ()=>{
            navigate(`/together/upload`);
        }

        const pageTitle = 'STUDY PAGE';
        const pageDesc = `멘토링수업을 통하여 학습효과를 낼 수 있으며, 원하는 스터디 그룹을 형성함으로써 함께 성장할 수 있습니다`;

        const page= (
        <StudyDiv>
            <Study>
                <StudyPicture>
                    <img src={study} alt='스터디 페이지 대표 이미지'/>
                </StudyPicture>
                <StudyTitle>EDUKET STUDY</StudyTitle>

                <Div>
                    <StudyDescription>에듀켓에서 나에게 맞는 스터디/모임을 찾아보세요!</StudyDescription>
                    <MapBox>
                        <MapTogether/>
                        <StudyLists>
                            <p>🔥인기있는 EDUKET STUDY🔥</p>
                            { !placeArr
                                ? []
                            : placeArr.map((item)=>(
                                <li>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </StudyLists>
                    </MapBox>

                    <WriteSection>
                        <WriteDiv>
                            <img src={myProfile} alt="나의 프로필 이미지" />
                            <BoxDiv onClick={goStudyUpload}>
                                <p> 만들고 싶은 스터디 및 모임이 있으신가요?</p>
                            </BoxDiv>
                        </WriteDiv>
                        <button onClick={goStudyUpload} aria-label="스터디 작성 버튼"> 작성하기 </button>
                    </WriteSection>
                    
                    { togetherLists.length ? (
                            <div>
                                <Ul>
                                    {!togetherLists 
                                    ? []
                                    : showList.map((data)=> (
                                        <Li>
                                            <ItemLi
                                                data={data}
                                            ></ItemLi>
                                        </Li>
                                    ))}
                                    <div ref={ref}></div>
                                </Ul>

                                <button onClick={goTogetherUpload}></button>
                            </div>
                        ) : (
                            <>
                                <Alert> Loading . .</Alert>
                                <button onClick={goTogetherUpload} aria-label="스터디 작성 버튼"></button>
                            </>
                        )
                        
                        }
                </Div>
        </Study>
    </StudyDiv>
    )
    return (
        <>
            <Common page={page} title={pageTitle} desc={pageDesc} />
        </>
    );
}
const StudyDiv= styled.div`
    background-color: #f1f2f3;
    padding: 40px 0 50px;
`
const Study = styled.div`
    position: relative;
    max-width: 1400px;
    margin: 0 auto;
`
const Div= styled.div`
    border-radius: 10px;
    margin-top: -10px;
`
const StudyPicture= styled.div`
    & img {
        display: block;
        width: 100%;
        height: 80%;
        margin: 0 auto;
        border-radius: 10px;
        }
`
const StudyTitle= styled.strong`
    position: absolute;
    width: fit-content;

    font-family: "Frutiger-lt-pro-600";
    font-size: 35px;
    font-weight: 600;
    color: #3a3a3a;
    text-shadow: 2px 2px 0px #90979f;
    
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 20px 20px;
`
const StudyDescription= styled.p`
    font-family: "Noto_Sans_KR-400";
    font-size: 20px;
    line-height: 80px;
    text-align: center;
    color: #777;
    margin: 10px 15px 0 15px;
`
const WriteSection= styled.div`
    display: flex;

    & button {
        width: 280px;
        margin: 0 15px; 

        font-family: "Noto_Sans_KR-400";
        font-size: 20px;
        color: #3a3a3a;

        border: 1px solid rgba(0,0,0,0.09);
        border-radius: 10px;
        box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        background-color: #ffff;
    }
`
const WriteDiv= styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    width: 96%;
    padding: 10px;
    margin: 0 15px;

    border: 1px solid rgba(0,0,0,0.09);
    border-radius: 10px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    background-color: #ffff;

    & img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        padding: 12px;
    }
`
const BoxDiv= styled.div`
    width: 90%;
    padding: 15px;

    border: 1px solid rgba(0,0,0,0.09);
    border-radius: 15px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    background-color: #f1f2f3;

    cursor: pointer;

    & p {
        font-family: "Noto_Sans_KR-400";
        font-size: 20px;
        color: #94A3B8;
    }
`
const MapBox= styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;

    width: 96%;
    padding: 20px 10px;
    margin: 5px 15px 30px 15px;

    border: 1px solid rgba(0,0,0,0.09);
    border-radius: 10px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    background-color: #ffff;
`
const StudyLists= styled.div`
    margin-right: 80px;

    & p {
    font-family: "Noto_Sans_KR-600";
    font-size: 24px;
    font-weight: 600;
    color: #3a3a3a;

    margin-bottom: 30px;
    }

    & li {
        font-family: "Noto_Sans_KR-400";
        list-style: none;
        font-size: 17px;
        color: #777;
        line-height: 35px;
        margin-left: 25px;
    }
`
const Ul= styled.ul`
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 0 0;
    margin: 0 0;
    line-height: 0;
`
const Li= styled.li`
    flex: 0 0 33.33333%;
    margin: 0 0 30px 0;
    padding: 0 0 0;
    vertical-align: top;
`
const Alert= styled.p`
    font-family: "Noto_Sans_KR-600";
    font-size: 35px;
    text-align: center;
    color: #C63D2F;
    padding: 50px 0 30px;
`