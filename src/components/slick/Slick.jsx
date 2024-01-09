import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { styled } from 'styled-components';

export default function Slick({ images }) {
    const settings = {
        dots: true,
        fade: true,
        // infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    return (
        <>
            <Slider {...settings}>
                {images.split(',').map((imgSrc, idx) => {
                    if (!imgSrc.includes('https://api.mandarin.weniv.co.kr'))
                        return null;
                    else {
                        return (
                            <ImageWrapper key={idx}>
                                <Img src={imgSrc} />
                            </ImageWrapper>
                        );
                    }
                })}
            </Slider>
        </>
    );
}

const ImageWrapper = styled.div`
    object-fit: cover;
`;

const Img = styled.img`
    width: 200px;
`;
