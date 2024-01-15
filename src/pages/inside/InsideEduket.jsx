import React from 'react'
import styled from 'styled-components'

import Common from '../../components/common/Common'
import inside from '../../assets/icons/illustration/Inside.jpg'
import chalse from '../../assets/icons/character/chalse.jpg'
import miya from '../../assets/icons/character/miya.jpg'
import coco from '../../assets/icons/character/coco.jpg'
import toby from '../../assets/icons/character/toby.jpg'
import runa from '../../assets/icons/character/runa.jpg'

export default function InsideEduket() {
    const character=[
        {
            image: toby,
            name: 'TOBY',
            tag: 'female cat',
            introduce: '토비는 매우 온순하고 다른 이들에게 먼저 도움의 손길을 내미는 멘토 고양이다. 그러나 너무 섬세한 성격으로, 불쾌한 말을 듣게 되면 쉽게 우울해질 수 있으니 주의가 필요하다.'
        },
        {
            image: coco,
            name: 'COCO',
            tag: 'female cat',
            introduce: '코코는 활기차고 사교적인 성격을 가졌다. 항상 배우고 싶어 하며 늘 새로운 친구를 만나기를 기대하며, 유쾌한 에너지로 주변을 활력차게 만들어준다.'
        },
        {
            image: chalse,
            name: 'CHALSE',
            tag: 'male cat',
            introduce: '찰스는 생김새 때문인지 친구들에게 항상 든든하고 멋진 느낌을 주지만, 속은 감수성이 풍부하여 떨어지는 낙엽을 보고 눈물을 흘리기도 한다.'
        },
        {
            image: miya,
            name: 'MIYA',
            tag: 'male cat',
            introduce: '미야는 신중하고 신뢰성 있는 성격으로, 친구들에게 믿음을 주기 때문에 함께 스터디하고 싶은 고양이 1위이다. 그러나 가끔은 고요한 공간이 필요하며, 혼자만의 시간을 소중히 여기는 편이다.'
        },
        {
            image: runa,
            name: 'RUNA',
            tag: 'female cat',
            introduce: '루나는 어떤 상황에서도 차분하게 대처하는 부드러움의 대명사다. 다른 이들에게 도움을 주는 것을 즐기며, 항상 포근한 미소를 지니고 있어 주변을 화사하게 만든다.'
        },
    ]

    const pageTitle = 'EDUKET의 소개';
    const pageDesc = `진로 개발과 취업, 자기계발에 필요한 핵심 정보와 지식을 제공하는 플랫폼 EDUKET `;
    
    const page=  (
        <>
        <Inside>
            <InsideDiv>
                <InsidePicture>
                    <img src={inside}/>
                </InsidePicture>

                <Title>INSIDE EDUKET</Title>
                <Div>
                    <Description>
                        <strong>EDUKET</strong>은 다양한 직군의 취업준비생 또는 신입부터 경력자까지 모두 모여<br/>
                        진로 개발과 취업, 자기계발에 필요한 핵심 정보와 지식을 제공하는 플랫폼입니다.
                    </Description>

                    <SubTitle>THE ROLE OF EDUKET</SubTitle>
                    <SubDescription>
                        <strong>1. 각 직군의 사람들끼리 경험을 공유합니다.</strong><br/>
                        EDUKET은 다양한 분야의 이야기를 공유함으로써 <br/>
                        취업준비생, 신입부터 경력자까지 현업에서의 이야기를 듣고 학습할 수 있습니다.<br/>
                    </SubDescription>

                    <SubDescription>
                        <strong>2. 스터디 그룹과 멘토링 수업을 통해 학습능률이 증가합니다.</strong><br/>
                        EDUKET은 멘토링수업을 통하여 직접적인 지도와 피드백을 제공하여 <br/>
                        학습효과를 낼 수 있으며, 자신이 원하는 스터디 그룹을 형성함으로써 함께 성장할 수 있습니다.<br/>
                    </SubDescription>

                    <SubDescription>
                        <strong>3. 커뮤니티를 통한 네트워킹 활동을 할 수 있습니다.</strong><br/>
                        EDUKET은 사용자들 간의 소통을 통하여  <br/>
                        서로의 이야기를 나누며 네트워크를 형성하고 확장하여 더 나은 진로를 개발할 수 있습니다.
                    </SubDescription>

                    <SubTitle>EDUKET's CHARACTER</SubTitle>
                    <Ul>
                        {character.map((item)=> (
                            <Li>
                                <ItemDiv>
                                    <Img src={item.image} alt='EDUKET 소개 페이지 대표 이미지'/>
                                    <Name>{item.name}</Name>
                                    <Tag><p>{item.tag}</p></Tag>
                                    <Intro>{item.introduce}</Intro>
                                </ItemDiv>
                            </Li>
                        ))}
                    </Ul>
                </Div>
            </InsideDiv>
        </Inside>
        </>
    )
    return(
        <>
            <Common page={page} title={pageTitle} desc={pageDesc} />
        </>
    )
}
const Inside= styled.div`
    background-color: #dae1e6;
`
const InsideDiv= styled.div`
    position: relative;
    max-width: 1400px;
    margin: 0 auto;
`
const InsidePicture= styled.div`
        & img {
        width: 100%;
        margin: 0 auto;
        border-radius: 10px;
    }
`
const Title= styled.p`
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
const Description= styled.p`
    font-family: "Noto_Sans_KR-400";
    font-size: 27px;
    line-height: 50px;
    text-align: center;
    color: #777;
    margin: 50px 15px 0 15px;
`
const SubTitle= styled.p`
    font-family: "Noto_Sans_KR-400";
    font-size: 32px;
    font-weight: 600;
    text-align: center;
    color: #3a3a3a;
    text-shadow: 2px 2px 0px #90979f;
    margin-top: 80px;
`
const SubDescription= styled.p`
    font-family: "Noto_Sans_KR-400";
    font-size: 17px;
    line-height: 40px;
    text-align: center;
    color: #777;
    margin-top: 40px;

    & strong {
    font-size: 20px;
    line-height: 60px;
    }
`
const Div= styled.div`
    border-radius: 10px;
    margin-top: -10px;
`
const Ul= styled.ul`
    display: inline-flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 0 0;
    margin: 50px 0;
    line-height: 0;
`
const Li= styled.li`
    flex: 0 0 33.33333%;
    margin: 0 0 50px 0;
    padding: 0 0 0;
    vertical-align: top;
`
const ItemDiv= styled.div`
    height: 700px;
    margin: 0 15px;
    border: 1px solid rgba(0,0,0,0.09);
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    background-color: #f1f2f3;
`
const Img= styled.img`
    width: 100%;
`
const Name= styled.p`
    font-family: "Frutiger-lt-pro-600";
    font-size: 25px;
    font-weight: 600;
    color: #3a3a3a;

    margin: 30px 0 15px;
    padding: 10px 20px;
`
const Tag= styled.div`
    font-family: "Frutiger-lt-pro-600";
    font-size: 12px;
    margin: 0 15px 10px;
    border-radius: 10px;
    color: #101010;

    display: inline-block;
    background: #dae1e6;
    box-shadow: 0 1px 4px rgba(0,0,0,0.5);

    line-height: 30px;
    padding: 0 10px;
`
const Intro= styled.p`
    font-family: "Noto_Sans_KR-400";
    font-size: 18px;
    line-height: 30px;
    color: #777;

    padding: 0 20px;
`