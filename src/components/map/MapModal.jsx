import React from 'react';
import { MapModalWrap, MapSection } from './MapStyle';

export const MapModal = ({ modalClose, isClicked, title, location, img, page }) => {
    return isClicked ? (
        <MapModalWrap>
        <MapSection>
            <div className='wrap'>
            <div className='info'>
                <div className='title'>
                🔥EDUKET STUDY TOP 10🔥
                <div className='close' onClick={modalClose} title='닫기'></div>
                </div>
                <div className='body'>
                <div className='img'>
                    <img src={img} width='110' height='75' alt='스터디이미지' className='preview' />
                </div>
                <div className='desc'>
                    <div className='ellipsis'>{title}</div>
                    <div className='jibun ellipsis'>{location}</div>
                    <div>
                    <a href={page} target='blank' className='link' rel='noreferrer'>
                        장소 자세히 보기
                    </a>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </MapSection>
        </MapModalWrap>
    ) : null;
};