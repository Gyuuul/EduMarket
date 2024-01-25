import { Map } from 'react-kakao-maps-sdk';
import React, { useEffect, useState } from 'react'
import { positions } from './MarkPosition';
import EventMarkerContainer from './EventMarker';

export default function MapTogether() {

    const [selectedMarker, setSeleteMarker] = useState();

    useEffect(()=> {
        const script= document.createElement("script");
        const makerscript= document.createElement("script");

        script.src= "//dapi.kakao.com/v2/maps/sdk.js?appkey=ae234c1689c66dd1ef43235462a2a092&autoload=false";
        makerscript.src= "//dapi.kakao.com/v2/maps/sdk.js?appkey=APIKEY&libraries=services&autoload=false";
        
        document.head.appendChild(script);
        document.head.appendChild(makerscript);

        script.addEventListener("load", () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById("map");
                const options = {
                    center: new window.kakao.maps.LatLng(37.53010411981915, 127.06016522021459), 
                    level: 8, // 지도 확대 레벨
            };
                new window.kakao.maps.Map(container, options);

                
            });
        });
    }, []);

        // <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=ae234c1689c66dd1ef43235462a2a092&autoload=false"></script>
        // <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=APIKEY&libraries=services"></script>
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
            >

                {positions.map((v, index)=>{
                    console.log(v)
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
