import { useRef } from "react";
import Content from "./Content";
import useScrollHeight from "../../hooks/useScrollHeight";
import styled from "styled-components";

export const sectionHeight = {
    contentSectionHeightPx: 1200,
    scrollSectionHeightPx: 600,
};

export const contentItem= [
    <>
        신입부터 경력자까지 모두 모여<br/>
        자기계발에 필요한<br/>
        핵심정보와 지식을 제공하는 <span style={{color:'#A73121'}}>EDUKET</span>💡<br/>
    </>,
    <>
        다양한 직무의 실무 꿀팁을 공유할 수 있는<br/>
        <span style={{color:'#A73121'}}>EDUKET의 커뮤니티</span>🙋🏻‍♀️<br/>
    </>,
    <>
        이야기를 나누며 함께 성장할 수 있는<br/>
        <span style={{color:'#A73121'}}>멘토링 수업과 스터디</span>📖<br/>
    </>,
    <>
        <span style={{color:'#A73121'}}>팔로우</span>기능으로 여러 사람들과<br/>
        다양한 생각을 공유하며 소통해요.🫱🏻‍🫲🏻<br/>
    </>,
];

const Section=()=>{
    const scrollRef= useRef(null);
    const scrollHeight= useScrollHeight(scrollRef);

    return (
            <Layout>
                <ScrollSection ref={scrollRef}>
                    <ContentSection>
                    {contentItem.map((subTitle,i) => (
                        <Content key={i} index={i} scrollHeight={scrollHeight ?? 0} contentItem={contentItem}>
                            {subTitle}
                        </Content>
                    ))}
                    </ContentSection>
                </ScrollSection>
            </Layout>
        );
    };
    
    export default Section;

const Layout= styled.div`
    height: 53rem;
    display: flex;
    align-items: center;
    justify-content: center;
`
const ScrollSection= styled.div`
    height: ${sectionHeight.scrollSectionHeightPx}px;
    overflow-y: scroll;
    scrollbar-width: none;
`
const ContentSection= styled.div`
    height: ${sectionHeight.contentSectionHeightPx}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 7.5rem;
    text-align: center;
`