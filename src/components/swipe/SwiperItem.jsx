import React from 'react';
import styles from './swiper.css'

// 부모 컴포넌트인 Swiper로부터 props를 전달받음
// 이미지 안에 들어가는 글씨 부분을 담는 컴포넌트
export default function SwiperItem({
  keyword,
  title,
  description,
  tag,
  img,
  background,
  fontColor,
  tagColor,
  tagBackground,
  isActive,
  index,
}) {
  const backgroundStyle = { backgroundColor: background };
  const fontStyle = { color: fontColor };
  const tagStyle = {
    color: tagColor,
    backgroundColor: tagBackground,
  };

  return (
    <li
      className={`swipe-item-wrapper ${
        isActive === index ? 'swipe-item-active' : ''
      }`}
      key={keyword}>
      <a className="swipe-item" style={backgroundStyle}>
        <div className="wrapper__swipe-item-contents">
          <div className="desc-wrapper__swipe-item-content" style={fontStyle}>
            <div className="align-swipe-item-content">
              {tag && (
                <div className="wrapper__swipe-item-tag">
                  {tag.map(tag => (
                    <span
                      className="swipe-item-tag"
                      style={tagStyle}
                      key={Math.random()}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h1>{title}</h1>
              <p>{description}</p>
            </div>
          </div>
          <div>
            <img src={img} alt={keyword} />
          </div>
        </div>
      </a>
    </li>
  );
}