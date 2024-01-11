import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

import RecFollowList from '../../components/follow/RecFollowList';
import { getFollowingList } from '../../components/follow/getFollowingList';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import prev from '../../assets/icons/icon/prev.png'
import next from '../../assets/icons/icon/next.png'

export default function FollowRecommend() {
    const [myFollowList, setMyFollowList]= useState([]);
    const [allDerivedRecFollowingList, setAllDerivedRecFollowingList]= useState([]);
    const myAccountName = localStorage.getItem('Account Name');

    const NextArrow = (props) => {
        const { style, onClick } = props;
        return (
            <div
                style={{ ...style, 
                    position: "absolute",
                    display: "block",
                    background: "transparent", 
                    borderRadius: "50px",
                    top: "35%",
                    right: "0",
                    marginRight: "-10px",
                    cursor: "pointer"
                }}
                onClick={onClick}
            >
                <img src={next} 
                    style={{...style,
                        width: "40px",
                        height: "40px",
                    }} alt='다음 버튼'/>
            </div>
        );
    };

    const PrevArrow = (props) => {
        const { style, onClick } = props;
        return (
            <div
                style={{ ...style, 
                    position: "absolute",
                    display: "block",
                    background: "transparent", 
                    borderRadius: "50px",
                    top: "35%",
                    left: "0",
                    marginLeft: "-10px",
                    cursor: "pointer"
                }}
                onClick={onClick}
            >
                <img src={prev} 
                    style={{...style,
                        width: "40px",
                        height: "40px",
                    }} alt='이전 버튼'/>
            </div>
        );
    };

    const settings = {
        dots: false,
        fade: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        arrows: true,
        nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
    };

    useEffect(()=>{
        // 나의 팔로잉 목록 불러오기 
        async function fetchMyFollowList(){
            let list= await getFollowingList(myAccountName);
            setMyFollowList((prevValue)=> [...prevValue, ...list]);
        }
        fetchMyFollowList();
    }, [])

    
    const Rec= async()=> {
        const duplicatedFollowSet= [];
        
        for(const item of myFollowList) {

        let list= await getFollowingList(item.accountname);

        list.forEach((item)=> {
        
            let flag= true;
            
            // 내 팔로잉 리스트에 포함 되어있으면 제외
            for(let i = 0; i < [...myFollowList].length; i++){
                if ([...myFollowList][i]._id === item._id) {
                    flag= false;
                    break;
                }
            }

            // 나인 경우 제외
            if(myAccountName === item.accountname){
                flag= false;
            }


            // 이미 추천 리스트에 포함된 경우 제외
            for(let i = 0; i < [...duplicatedFollowSet].length; i++){
                if([...duplicatedFollowSet][i]._id === item._id){
                    flag= false;
                    break;
                }
            }
            
            flag && duplicatedFollowSet.push(item)
        })
        setAllDerivedRecFollowingList([...duplicatedFollowSet]);
        }
    }

    useEffect(()=>{
        Rec();
    }, [myFollowList])

    return (
            <FollowSection>
                { allDerivedRecFollowingList.length ? (
                        <Ul>
                            <Sliders {...settings}>
                            {! allDerivedRecFollowingList 
                            ? []
                            : allDerivedRecFollowingList.map((myFollowingItem)=> (
                                <Li>
                                    <RecFollowList
                                        key={myFollowingItem}
                                        {...myFollowingItem}
                                    ></RecFollowList>
                                </Li>
                            )).slice(0,31)}
                            </Sliders>
                        </Ul>
                ) : (
                    <p>추천할 사람 없음</p>
                )}
            </FollowSection>
    )
}

const FollowSection = styled.section`
    max-width: 1400px;
    margin: 0 auto;
    transform: translateY(8%);
` 
const Ul = styled.ul`
    padding: 0 0;
    margin: 0 0;
    line-height: 0;
`
const Li = styled.li`
    margin: 0 0px 50px 0;
`
const Sliders =styled(Slider)`
`