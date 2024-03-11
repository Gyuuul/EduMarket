import { Map } from 'react-kakao-maps-sdk';
import React, { useState } from 'react'
import { positions } from './MarkPosition';
import EventMarkerContainer from './EventMarker';

export default function MapTogether() {

    const [selectedMarker, setSeleteMarker] = useState();

    return(
        <>
            <Map 
                id={"map"}
                center={{
                    lat: 37.53010411981915,
                    lng: 127.06016522021459,
                }}
                style={{
                    width:'480px',
                    height:'350px',
                    marginLeft: '60px',
                    borderRadius: '20px'
                }}
                level={8}
            >

                {positions.map((v, index)=>{
                    return(
                        <EventMarkerContainer
                        key={v.id}
                        onClick={ ()=> {setSeleteMarker(v.id) } }
                        isClicked={selectedMarker === index}
                        position={v.latlng}
                        title ={v.title}
                        location ={v.location}
                        img ={v.img}
                        page={v.page}
                        modalClose={()=>{setSeleteMarker(false)}}
                        />
                    );
                })}
            </Map>
        </>
    )
}
