import styled from "styled-components";

const Content = ({ children, index, scrollHeight, contentItem}) => {
  console.log(scrollHeight);
    const scrollSetting = {
      scrollMax: 600,
      scrollItem: 4,
    };
  
    const centerAverage = scrollSetting.scrollMax / scrollSetting.scrollItem;
    // 1. 요소가 scrollHeight 안에 있는지
    // 2. 현재 스크롤 위치가 다음 콘텐츠의 위치보다 작은지
    const isCentered =
      scrollHeight >= index * centerAverage &&
      scrollHeight <= (index + 1) * centerAverage;

      return (
      <>
        {
          isCentered ? (
            <Style1>{children}</Style1>
          ):(
            <Style2>{children}</Style2>
          )
        }
        
      </>
    );
  };
  
export default Content;

const Style1= styled.h3`
  color: #000;
  font-weight: 700;
  transition: all 0.5s;
  font-size: 2.75rem;
  line-height: 4.475rem;
  opacity: 1;
`
const Style2= styled.h3`
  color: #000;
  font-weight: 700;
  transition: all 0.5s;
  font-size: 1.5rem;
  line-height: 2.9831rem;
  opacity: 0.4;
`