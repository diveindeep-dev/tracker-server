<p align="center">
  <a href="https://tracker.diveindeep.dev/">
    <img src="https://github.com/diveindeep-dev/tracker-client/raw/main/public/logo192.png" alt="review" width="80" height="80" />
  </a>
</p>
<h1 align="center"><a href="https://tracker.diveindeep.dev/">TRACKER</a></h1>

Habit Tracker + ~~twitter~~ X의 조합으로 만든 사이트입니다.  
Habit Tracker란 습관+추적자의 조합으로 습관으로 만들고 싶은 것들을 얼마나 지켰는지 확인할 수 있는 일종의 습관 형성 도구입니다.
이 Habit Tracker와 SNS를 조합한 웹 어플리케이션입니다.

## Contents

- [Contents](#contents)
- [Requirements](#requirements)
- [Installation](#installation)
  - [Client](#client)
  - [Server](#server)
    - [Environment Variables](#environment-variables)
- [Features](#features)
- [Skills](#skills)
  - [Client-Side](#client-side)
  - [Server-Side](#server-side)
- [Test](#test)
  - [Unit Test](#unit-test)
  - [End to End Test](#end-to-end-test)
- [Deployment](#deployment)
  - [Client-Side](#client-side-1)
  - [Server-Side](#server-side-1)
- [Version Control](#version-control)
- [Challenges](#challenges)
- [Things to Do](#things-to-do)
- [💫 Deploy](#-deploy)
  - [Client](#client-1)
  - [Server](#server-1)

---

## Requirements

- Chrome Browser를 권장합니다.
- Database 주소가 있어야 합니다.


## Installation

### Client

```javascript
git clone https://github.com/diveindeep-dev/tracker-client.git
cd tracker-client
yarn install
yarn dev
```

### Server

```javascript
git clone https://github.com/diveindeep-dev/tracker-server.git
cd tracker-server
yarn install
yarn dev
```

#### Environment Variables

- dotenv로 환경변수 관리 [(참조)](https://github.com/motdotla/dotenv)
- Server 루트 디렉토리에 `.env` 파일 생성
- 하단의 변수와 발급받은 값 추가
```
JWT_SECRET=YOUR SECRET WORD
DB_URL=YOUR DATABASE URL
```


## Features

1. Auth
   - 다양한 Validation을 설정하여 회원가입
   - JSON Web Token(JWT)을 이용한 사용자 인증
   - localStorage 통한 로그인 유지
   - User별 이모지와 색상 랜덤 설정, 가입 후 설정 변경

2. Layout
   - 반응형 웹

3. Tracker
   - 새로운 Tracker 등록, 삭제
   - date-fns를 이용하여 오늘기준 2주간의 Track표시
   - 오늘 설정된 Track만 DONE/UNDO 토글
   - 각 Track별 응원(토글아닌 좋아요 기능)
   - Tracker의 제목, 태그, 참고 URL 정보를 가져와 등록할 수 있는 Retracker
   - Tracker 페이지 링크 복사
   - 전체 사용자의 Tracker를 보여주는 Home에서는 필요시 일정량의 데이터를 요청하고 IntersectionObserver를 사용하여 무한스크롤
   - Tag별 Tracker 모아 보기

4. Profile
   - 주소로부터 해당 User 정보 가져오기
   - Today섹션에선 오늘계획된 Track들만 모아 표시하고, 관리
   - 해당 User의 전체 Tracker 리스트


## Skills

### Client-Side

- Typescript
- React
- ES2015+
- 컴포넌트 기반 아키텍쳐를 위한 React
- Redux, Redux Toolkit을 이용한 State 관리
- React Router
- Axios
- Styled-components
- Jest, Cypress

### Server-Side

- ES2015+
- Node.js
- Express.js를 이용한 RESTful API 설계
- Bcrypt(bcryptjs)를 이용한 암호화
- MongoDB 기반 NoSQL Database
- Object Data Modeling 라이브러리 Mongoose


## Test

### Unit Test

- Jest를 이용한 Reducer Test, Component Test
- `yarn test`시 Unit Test 실행

### End to End Test

- Cypress 이용
- `yarn cypress`시 End to End Test 실행


## Deployment

### Client-Side

- Netlify를 통한 배포 자동화

### Server-Side

- cloudtype을 통한 서버 배포


## Version Control

- GitHub


## Challenges

- JWT을 이용하여 사용자 인증 절차를 진행하며 로그인을 구현했는데, 이를 통해 토큰 기반 인증에 관해 공부할 수 있었습니다. JWT의 구조 및 특징을 바탕으로 토큰 기반 인증의 원리와 장점들을 전반적으로 알 수 있었고 또한 세션에 관해 공부할 수 있었습니다. 그리고 비밀번호 같은 민감한 정보들을 어떻게 저장해야 하는지 고민하게 되었고, bcrypt를 사용하여 서버에 저장하기 전에 미리 해싱하여 보안성을 높일 수 있었습니다.
- 구현해야할 Track은 정사각형을 유지하며 요일을 나타내는 알파벳을 배경처럼 나타내야 했습니다. 절대적인 값으로 사이즈를 정하면 편했겠지만, 반응형 웹으로 제작을 하다보니 그럴 수 없었습니다. 또한 모바일 사이즈로 전환시 2줄로 변경되어야 했고, 계속 변하는 너비에 따라 비율이 정해져야 하는 높이가 문제였습니다. 이는 `:after`를 사용하여 가상 요소를 통해 가상요소의 padding-top(bottom)에 상대적 단위인 %값을 주어 해결하였습니다. padding은 부모 요소의 width를 기준으로 움직이기 때문에, 모바일 웹에서도 일정환 비율을 유지할 수 있도록 만들 수 있었습니다.


## Things to Do

- ~~Retracker 기능~~ DONE!
- 사용자의 전체 Tracker를 요약한 그래프
- 컴포넌트 재사용을 위한 리팩토링


## 💫 Deploy
### Client
[![Deploy to Netlify](https://www.netlify.com/img/global/badges/netlify-color-accent.svg)](https://www.netlify.com/)

### Server
[![Deploy to CloudType](https://oopy.lazyrockets.com/api/v2/notion/image?src=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fe3e24a68-dcb2-4f95-8aa0-22844af43756%2F%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-07-08_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.19.28.png&blockId=20ac359c-5ad3-4aec-807b-c8efe49530c2&width=100)](https://www.cloudtype.io/)
