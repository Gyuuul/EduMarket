import Slick from '../../components/slick/Slick';
import { SubTitle, Alert, StudyName, StudyIntro, Ul, Li, Div, PostStudyDiv } from './MyProfile'

export default function PostStudy ({ itemList, itemClick, itemRenderer }) {
    return(
        <PostStudyDiv>
            {itemList ? (
                <>
                    <SubTitle>{itemRenderer === 'post' ? 'My Post' : 'My Study'}</SubTitle>
                    <Ul>
                        {itemList.map((item) => (
                            <Li key={item.id}>
                                <Div onClick={async (e) => {
                                e.stopPropagation();
                                itemClick(item.id);
                                }}>
                                    {itemRenderer === 'post' && item?.image ? <Slick images={item?.image} /> : null}
                                    {itemRenderer === 'study' && <img src={item.itemImage} alt='스터디 대표 이미지' />}
                                    <p>{item?.content}</p>
                                    {itemRenderer === 'study' && <StudyName>{item.itemName}</StudyName>}
                                    {itemRenderer === 'study' && <StudyIntro>{item.link}</StudyIntro>}
                                </Div>
                            </Li>
                        ))}
                    </Ul>
                </>
            ) : (
                <Alert>{`등록된 ${itemRenderer === 'post' ? '게시글' : '스터디'}이(가) 없습니다.`}</Alert>
            )}
        </PostStudyDiv>
    )
}