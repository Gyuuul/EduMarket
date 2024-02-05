# <span id="top">🏫 EDUKET</span>

## [🔗 EDUKET 바로가기](https://gyuuul.github.io/eduket/)

> EDUKET 테스트 계정 <br/>
> 😺 ID : eduket@naver.com<br/>
> 🔓 PW : qw332211<br/>

## EDUKET 서비스 소개💭 
**EDUKET**은 다양한 직군의 취업준비생 또는 신입부터 경력자까지 모두 모여 진로 개발과 취업, 자기계발에 필요한 핵심 정보와 지식을 공유하며 소통하는 플랫폼입니다.
<br/>

### 1. 각 직군의 사람들과 함께 경험을 공유합니다.
- **EDUKET**은 다양한 분야의 이야기를 공유함으로써 취업준비생, 신입부터 경력자까지 현업에서의 이야기를 듣고 학습할 수 있는 

### 2. 스터디 그룹과 멘토링 수업을 통해 학습능률이 증가합니다.
- **EDUKET**은 멘토링수업을 통하여 직접적인 지도와 피드백을 제공하여 학습효과를 낼 수 있으며, 자신이 원하는 스터디 그룹을 형성함으로써 함께 성장할 수 있습니다.

### 3. 커뮤니티를 통한 네트워킹 활동을 할 수 있습니다.
- **EDUKET**은 사용자들 간의 팔로우 기능을 통하여 소통을 할 수 있습니다. 서로의 이야기를 나누며 네트워크를 형성하고 확장하여 더 나은 진로를 개발할 수 있습니다.

<br/>

## 개발기간 및 일정⏰
프로젝트 기획기간 <br />
2023.11.01 - 2023.11.30

프로젝트 개발기간 <br />
2023.12.01 - 2024.01.20

리팩토링 개발기간 <br />
2024.01.20 - 2024.02-10

<br/>

## 프로젝트 목표✨
**1. React 기반, 다양한 기능 구현**
- SPA 개발
- 각 페이지의 CRUD 구현
- 재사용 가능한 컴포넌트 구현

**2. 웹페이지 최적화**
- 이미지 .webp 사용
- router 기반, code-splitting 사용
- SEO 개선을 위한 LCP, CLS 성능 최적화
- 불필요한 쿼리를 줄여, 로딩 속도 개선
- 중복 코드 제거를 통한 페이지 로딩 성능 향상

**3. 다양한 기술 사용**
- slick library 사용
- 카카오맵 오픈 api 사용
- redux toolkit을 이용하여 데이터 저장
- debounce를 사용하여 검색페이지 사용자 경험 개선
- IntersectionObserver을 사용하여 무한스크롤 구현

<br/>

## 개발 환경 
| 프론트엔드 | 백엔드 | 디자인 | 관리 |
| :---: | :---: | :---: | :---: | 
| <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/styled-components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=pink"> | 멋쟁이사자처럼에서 제공된 API 사용 | <img src="https://img.shields.io/badge/figma-FBCEB1?style=for-the-badge&logo=figma&logoColor=white"> | <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> |

<br/>

## 주요기능
|🔐 계정 |😺 홈 |💬 게시물 |📕 스터디 | 👩🏻‍💻 프로필 |🔎 검색 | 🏫 페이지 |
|--|--|--|--|--|--|--|
| - 로그인/로그아웃<br />- 회원가입<br />- 프로필 설정<br />- 유효성 검증 | - 게시글 목록<br />- 스터디 목록<br />- 추천 팔로우 목록 | - 게시물 작성/수정/삭제<br />- 게시글 목록<br />- 댓글 작성/수정/삭제/신고<br /> - 이미지 업로드 / 수정<br />- 좋아요/좋아요 취소<br />- 무한스크롤 | - 스터디 작성/수정/삭제<br />- 스터디 목록<br /> - 추천 스터디 장소<br />- 무한스크롤 |- 프로필 수정<br />- 나의 게시글 목록<br />- 나의 스터디 목록<br /> - 팔로잉/언팔로우/팔로워|- 유저 검색<br />- 유저 검색 결과 목록| - EDUKET 소개 |

<br/>

## code 컨벤션
- Prettier 설정

```js
{
  "tabWidth": 4,
  "singleQuote": true,
  "semi": true,
  "printWidth": 80,
  "trailingComma": "es5"
}
```

- css 컨벤션

```js
position
display
width
height
margin
padding
border
background
font
기타
```

- import 순서 규칙

```jsx
/* 1. hook */
import { useState } from 'react';
import { Link } from 'react-router-dom';

/* 2. styled-component*/
import styled from 'styled-components';

/* 3. Common 파일*/
import Common from '../common/Common.jsx';

/* 4. import로 가져오는 컴포넌트 파일*/
import Post from './Post.jsx';

/* 5. 이미지 파일*/
import postImg1 from './../../assets/testImg/post1.png';
import postImg2 from './../../assets/testImg/post2.png';
```
<br/>

## 폴더 구조

```
EDUKET
 ┣ 📂node_modules
 ┣ 📂public
 ┣ 📂src
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📂fonts
 ┃ ┃ ┗ 📂icons
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂body
 ┃ ┃ ┣ 📂comment
 ┃ ┃ ┣ 📂common
 ┃ ┃ ┣ 📂follow
 ┃ ┃ ┣ 📂footer
 ┃ ┃ ┣ 📂header
 ┃ ┃ ┣ 📂heart
 ┃ ┃ ┣ 📂map
 ┃ ┃ ┣ 📂post
 ┃ ┃ ┣ 📂search
 ┃ ┃ ┣ 📂slick
 ┃ ┃ ┗📂toggle
 ┃ ┣ 📂lib
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂follow
 ┃ ┃ ┣ 📂home
 ┃ ┃ ┣ 📂inside
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┣ 📂post
 ┃ ┃ ┣ 📂profile
 ┃ ┃ ┣ 📂signup
 ┃ ┃ ┗ 📂study
 ┃ ┣ 📂route
 ┃ ┣ 📂store
 ┃ ┣ 📜App.js
 ┃ ┣ 📜index.js
 ┃ ┗ 📜reset.css
 ┣ 📜.gitignore
 ┣ 📜.prettierrc.json
 ┣ 📜package-lock.json
 ┗ 📜package.json
 ```

## 기능 UI🎨
<table>
  <tr>
    <th>MAIN (로그인❌)</th>
  </tr>
    <tr align="center">
      <td><img src="https://github.com/Gyuuul/eduket/assets/126536442/0cd8e715-6648-42f0-b1c1-fcb94a24c74a"> </td>
    </tr>
  <tr>
    <th>HOME (로그인⭕)</th>
  </tr>
    <tr align="center">
      <td><img src="https://github.com/Gyuuul/eduket/assets/126536442/48688601-0888-46ca-9dea-f3a86cc61082"> </td>
    </tr>
  <tr>
    <th>POST 목록</th>
  </tr>
    <tr align="center">
      <td><img src="https://github.com/Gyuuul/eduket/assets/126536442/030ac33f-1a7c-455b-9da8-45c36c3eab36"> </td>
    </tr>
      <tr>
    <th>POST 업로드</th>
  </tr>
    <tr align="center">
      <td><img src="https://github.com/Gyuuul/eduket/assets/126536442/81efaac1-bee4-49fc-8789-c8a826d84e48"> </td>
    </tr>
      <tr>
    <th>POST 수정</th>
  </tr>
    <tr align="center">
      <td><img src="https://github.com/Gyuuul/eduket/assets/126536442/60f2e0a3-fc2a-4b2d-b7e4-ce6b3e528473"> </td>
    </tr>
      <tr>
    <th>POST 삭제</th>
  </tr>
    <tr align="center">
      <td><img src="https://github.com/Gyuuul/eduket/assets/126536442/f1d3d753-b2a9-4bf9-9b54-b8d85a5a248e"> </td>
    </tr>
</table>







## 트러블 슈팅🚨
- 검색 debounce
- 
