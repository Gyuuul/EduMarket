import styled from "styled-components";

const Content = ({ children, index, scrollHeight}) => {
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
      const className = isCentered ? 'centered' : 'not-centered';
      return (
      <>
        <ContentStyle className={className}>{children}</ContentStyle>
      </>
    );
  };
  
export default Content;

const ContentStyle = styled.h3`
  font-weight: 700;
  transition: all 0.5s;

  &.centered {
    font-size: 2.7rem;
    line-height: 4.2rem;
    opacity: 1;
  }

  &.not-centered {
    font-size: 1.5rem;
    line-height: 2.5rem;
    opacity: 0.4;
  }
`;
