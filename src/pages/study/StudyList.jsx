import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import Common from '../../components/common/Common'
import ItemLi from './ItemLi';
import { getStudyFollowingList } from '../../components/follow/getFollowingList';
import study from '../../assets/icons/illustration/Study.webp'
import MapTogether from '../../components/map/Map'
import instance from '../../lib/apis/interceptor';

export default function StudyList() {
    const myProfile= useSelector((state)=> state.user.myInfo.image);
    const navigate= useNavigate();
    const [ref, inView]= useInView();
    const [togetherLists, setTogetherLists]= useState([]);
    const [showList, setShowList]= useState([]); 
    const [following, setFollowing]= useState([]);
    const [pages, setPages]= useState(0);
    const placeArr= ['1. 뚝섬역 모각코🖥️', '2. 회계사가 알려주는 회계직무 스터디🏦', '3. 제약/ 바이오 산업에 대한 스터디💊','4. UI/ UX 디자이너와 함께하는 스터디🎨','5. 해외영업 직무탐색 모임✈️'];
    
    const goTogetherUpload= ()=>{
        navigate('/together/upload');
    }

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
        })
        .catch((error)=>{
            console.log(error);
        });
    }, [following]);
    
        const togetherList = async () => {
            try {
                const togetherFollowList = await Promise.all(
                    following.map(async (list) => {
                        const res = await instance.get(
                            `/product/${list.accountname}/?limit=0&skip=0`
                        );
                        return res.data?.product;
                    })
                );
                return togetherFollowList;
            } catch (error) {
                console.log(error);
            }
        };

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
                                <ul>
                                    <li><span>{item}</span></li>
                                </ul>
                            ))}
                        </StudyLists>
                    </MapBox>

                    <WriteSection>
                        <WriteDiv>
                            <img src={myProfile} alt="나의 프로필 이미지" />
                            <BoxDiv onClick={goStudyUpload}><p> 만들고 싶은 스터디 및 모임이 있으신가요?</p></BoxDiv>
                        </WriteDiv>
                        <button onClick={goStudyUpload} aria-label="스터디 작성"> 작성하기 </button>
                    </WriteSection>
                    
                    { togetherLists.length ? (
                            <>
                                <Ul>
                                    {!togetherLists 
                                    ? []
                                    : showList.map((data)=> (
                                        <Li>
                                            <ItemLi data={data}/>
                                        </Li>
                                    ))}
                                    <div ref={ref}></div>
                                </Ul>
                                <button onClick={goTogetherUpload} aria-label="스터디 작성"></button>
                            </>
                        ) : (
                            <>
                                <Alert> Loading . .</Alert>
                            </>
                        )}
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
    padding: 40px 0 50px;
    background-color: #f1f2f3;
`
const Study = styled.div`
    position: relative;
    max-width: 1400px;
    margin: 0 auto;
`
const Div= styled.div`
    margin-top: -10px;
    border-radius: 10px;
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
    left: 50%;
    padding: 10px 20px 20px;
    font-family: "Frutiger-lt-pro-600";
    font-size: 35px;
    font-weight: 600;
    color: #3a3a3a;
    text-shadow: 2px 2px 0px #90979f;
    transform: translate(-50%, -50%);
`
const StudyDescription= styled.p`
    margin: 10px 15px 0 15px;
    font-family: "Noto_Sans_KR-400";
    font-size: 20px;
    line-height: 80px;
    text-align: center;
    color: #777;
`
const WriteSection= styled.div`
    display: flex;
    & button {
        width: 280px;
        margin: 0 15px; 
        border: 1px solid rgba(0,0,0,0.09);
        border-radius: 10px;
        background-color: #ffff;
        box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        font-family: "Noto_Sans_KR-400";
        font-size: 20px;
        color: #3a3a3a;
    }
`
const WriteDiv= styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    width: 96%;
    margin: 0 15px;
    padding: 10px;
    border: 1px solid rgba(0,0,0,0.09);
    border-radius: 10px;
    background-color: #ffff;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    & img {
        width: 60px;
        height: 60px;
        padding: 12px;
        border-radius: 50%;
    }
`
const BoxDiv= styled.div`
    width: 90%;
    padding: 15px;
    border: 1px solid rgba(0,0,0,0.09);
    border-radius: 15px;
    background-color: #f1f2f3;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
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
    margin: 5px 15px 30px 15px;
    padding: 20px 10px;
    border: 1px solid rgba(0,0,0,0.09);
    border-radius: 10px;
    background-color: #ffff;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
`
const StudyLists= styled.div`
    margin-right: 80px;
    & p {
    margin-bottom: 30px;
    font-family: "Noto_Sans_KR-600";
    font-size: 24px;
    font-weight: 600;
    color: #3a3a3a;
    }
    & li {
        margin-left: 25px;
        font-family: "Noto_Sans_KR-400";
        list-style: none;
        font-size: 17px;
        color: #777;
        line-height: 35px;
    }
`
const Ul= styled.ul`
    display: flex;
    flex-wrap: wrap;
    margin: 0 0;
    padding: 0 0;
    box-sizing: border-box;
    line-height: 0;
    @media screen and (max-width: 800px) {
        flex-direction: column;
    }   
`
const Li= styled.li`
    flex: 0 0 33.33333%;
    margin: 0 0 30px 0;
    padding: 0 0 0;
    vertical-align: top;
    @media screen and (max-width: 1200px) {
        flex: 0 0 33.5%;
    }
    @media screen and (max-width: 1100px) {
        flex:0 0 50%;
    }
    @media screen and (max-width: 800px) {
        width: 100%;
    }
`
const Alert= styled.p`
    padding: 50px 0 30px;
    font-family: "Noto_Sans_KR-600";
    font-size: 35px;
    text-align: center;
    color: #C63D2F;
`