import { MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { MapModal } from './MapModal';

import marker from '../../assets/icons/icon/map-marker.png'

const EventMarkerContainer = ({ modalClose, position, onClick, isClicked, title, location, img, page }) => {
    return (
        <>
            <MapMarker
            position={position} // 마커를 표시할 위치
            onClick={onClick}
            zIndex={-1}
            image={{
                src: marker,
                size: {
                width: 45,
                height: 45,
                },
            }}
            ></MapMarker>
            <CustomOverlayMap position={position}>
            <MapModal
                modalClose={modalClose}
                img={img}
                title={title}
                location={location}
                isClicked={isClicked}
                page={page}
            />
            </CustomOverlayMap>
        </>
        );
    };
    
export default EventMarkerContainer;