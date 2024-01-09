import React, { useState, useEffect } from 'react'
import { SwiperContents } from './SwiperContents';
import SwiperItem from './SwiperItem';
// import './swiper.css'

export default function Swiper() {

    const [currentSlide, setCurrentSlide]= useState(0);
    // 현재 슬라이드의 index
    // 초기값을 0으로 설정함

    const [slides, setSlides] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [currentTimerId, setCurrentTimerId]= useState(-1);
    // 5초가 지나면 다음 슬라이드로 이동해야 하니까 초기값을 -1초로 설정
    
    const [play, setPlay]= useState(true)
    // 자동재생, 일시정지, 재생 기능
    // defalult 값은 자동재생이므로 초기값을 true로 설정

    const maxSlide= SwiperContents.length -1;
    // 마지막 슬라이드는 contetns의 길이에서 1을 뺀 수가 index가 된다

    const rightArrowClickHandler= ()=>{
        setCurrentSlide(prevState  => (prevState< maxSlide? prevState+1: 0));
        clearTimeout(currentTimerId);
    };
    // 오른쪽으로 가는 버튼을 눌렀을 때, 현재 slide가 마지막 slide가 아니라면 오른쪽으로 이동하고, 마지막 장이라면 0번째 index인 slide로 이동
    // 저장해두었던 타이머를 삭제한다.

    // const leftArrowClickHandler= ()=>{
    //     setCurrentSlide(prevState  => (prevState>0? prevState-1: maxSlide));
    //     clearTimeout(currentTimerId);
    // };
    // 왼쪽으로 가는 버튼을 눌렀을 때 현재 slide가 0보다 크면 왼쪽으로 이동하고 0보다 작다 하면(slide의 인덱스가 0일 때) 맨 마지막 장으로 이동한다.
    
    useEffect(() => {
        if (play) {
            const timer = setTimeout(() => rightArrowClickHandler(), 6000);
            setCurrentTimerId(timer);
            }
        }, [currentSlide, play]);

        useEffect(() => {
          const DELAY_TIME =1000;
      
          setTimeout(() => {
            setSlides(SwiperContents);
            setIsLoading(false);
          }, DELAY_TIME);
        }, []);

        let content;

        if (isLoading) {
          content = (
            <div style={{ width: '100vw' }}>
              <p
                style={{
                  maxWidth: '75rem',
                  width: '100%',
                  height: '380px',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: 'gray',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '0 auto',
                }}>
                로드 중...
              </p>
            </div>
          );
        } else {
          content = slides.map((slide, index) => (
            <SwiperItem
              key={slide.keyword}
              keyword={slide.keyword}
              title={slide.title}
              description={slide.description}
              tag={slide.tag}
              img={slide.img}
              background={slide.background}
              fontColor={slide.fontColor}
              tagColor={slide.tagColor}
              tagBackground={slide.tagBackground}
              isActive={currentSlide}
              index={index}
            />
          ));
        }


    

    return (
        <>

        </>
    )
}
