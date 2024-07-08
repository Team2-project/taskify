# Taskify 
![제목 없는 디자인](https://github.com/Team2-project/taskify/assets/115947715/778f3247-9a62-4f12-92e5-a49688e7b37c)

- 🚀배포사이트 : https://6-3-2-taskify.netlify.app/

## 🗣 프로젝트 소개
Taskify는 Kanban 보드를 활용하여 효과적으로 일정을 관리할 수 있는 프로그램입니다. <br>
대시보드를 생성하여 팀원들과 함께 프로젝트와 업무를 시각적으로 관리하고, 체계적으로 관리할 수 있습니다. <br>
Taskify로 여러분의 생산성을 극대화하세요.
  
## ⌛ 개발 기간
프로젝트 기간 : 2024.06.22 ~ 2024.07.07 <p>

# 1. 개발자 소개 :technologist: 및 맡은 작업

| <img src="https://avatars.githubusercontent.com/u/162412765?v=4" width="150" height="150"> | <img src="https://avatars.githubusercontent.com/u/162130792?v=4"  width="150" height="150"> | <img src="https://avatars.githubusercontent.com/u/115947715?v=4"  width="150" height="150"> | <img src="https://avatars.githubusercontent.com/u/156271070?v=4"  width="150" height="150"> | <img src="https://avatars.githubusercontent.com/u/162083468?v=4"  width="150" height="150"> |
| :---------------------------------------------------------------: | :---------------------------------------------------------------: | :--------------------------------------------------------------: | :--------------------------------------------------------------: | :---------------------------------------------------------------: |
|           [FE_6기 김진윤](https://github.com/EveryYawm)         |        [FE_6기 박진경](https://github.com/Park-Jingyeong)      |           [FE_6기 오채연](https://github.com/oh-chaeyeon)       |        [FE_6기 은동혁](https://github.com/edhcoding)         |       [FE_6기 조예은](https://github.com/Rangbyeolang)         |
|  백로그 관리<br> API 통신 및 데이터 관리<br> Layout<br> Navigation Bar<br> 할 일 상세 Modal <br> 할 일 수정 Modal<br> 사용자 계정 관리 페이지<br> 사용자 프로필&<br>비밀번호 변경<br> Dropdown Bar<br> MyDashboard Page <br>- 대시보드 추가 기능<br> 전체적인 리펙토링<br> 발표 자료 준비 | Userflow 제작<br> Landing Page 구현<br> Mydashboard <br>Page 구현<br> 발표 자료 준비 |  프로젝트 총괄<br>프로젝트 기초 세팅<br>로그인 페이지<br>회원가입 페이지<br>로그인&로그아웃 기능 <br>auth 관련 작업<br>대시보드 페이지<br>대시보드 수정 페이지<br>발표 자료 준비<br>배포<br>README 작성 | 합성 컴포넌트<br>패턴 도입<br>Modal 컴포넌트 제작<br>Button 컴포넌트 제작<br>Input 컴포넌트 제작<br>시연 영상 제작 | Side Bar 구현 <br>- ButtonList 구현<br>발표 |

-------------------------------------------------------------------------------------
# 2.  기술 및 개발 환경
#### [기술 스택]
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)

#### [기술 도구]
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Jira](https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

#### [협력 도구]
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)

#### 라이브러리 정리
| 라이브러리              | 사용이유                                          |
| ------------------------| -------------------------------------------------|
| TanStack Query          | 서버 상태를 효율적으로 관리                        |
| Jotai                   | 전역 상태 관리(단순함 +효율)                       |
| Axios                   |  API호출 간소화, instance활용                     |
| React Datepicker        | UI형식으로 쉽게 날짜선택 도와줌                    |
| date-fns                | 내가 원하는 날짜형식으로 변환                      |
| Day.js                  | 날짜/시간 쉬운 파싱과 계산 도움                    |
| React-Toastify          | 간단하게 사용자에게 에러메시지 전달                 |
| JavaScript Cookie       | 쿠키를 간편하게 설정, 가져오기, 삭제하는 기능을 사용 |
| react-svg               | SVG 파일을 JSX 코드 안에 넣기 위해 사용            |
| SVGR                    | svg파일의 색을 동적으로 줌                         | 

### [코드 컨벤션]
- <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=Prettier&logoColor=white"/> 

```
{
  "jsxSingleQuote": true,
  "printWidth": 80,
  "quoteProps": "consistent",
  "useTabs": false,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "arrowParens": "always",
  "semi": true,
  "bracketSpacing": true,
  "endOfLine": "crlf",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```
- <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=ESLint&logoColor=white"/>

```
{
  "extends": [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@next/next/recommended",
    "next/core-web-vitals",
    "prettier"
  ],
  "rules": {
    "prettier/prettier": [
      "error",
      { "endOfLine": "auto" },
      { "usePrettierrc": true }
    ],
    "no-console": 1,
    "react-hooks/exhaustive-deps": 0,
    "no-unused-vars": "off",
    "arrow-body-style": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/display-name": "off",
    "no-unused-expression": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn"
  }
}
```

#### [폴더구조]
```
📁 Taskify .............................................. ## root
┣ 📁 atoms .............................................. ## Atoms@Jotai
┣ 📁 components ......................................... ## components
┣ 📁 hooks .............................................. ## hooks
┣ 📁 lib ................................................ ## library
┃  ┣ 📁 api ............................................. ## API
┃  ┃  ┣ 📁 types ........................................ ## 타입 정의
┃  ┃  ┣ 📄 axios.ts ..................................... ## Axios 설정
┃  ┃  ┗ 📄 fetcher.ts ................................... ## 데이터 가져오기 유틸
┃  ┗ 📄 validation.ts ................................... ## 검증 스크립트
┣ 📁 pages .............................................. ## pages
┃  ┣ 📁 dashboard ....................................... ## 대시보드 페이지
┃  ┃  ┗ 📁 [dashboardId] ................................ ## 동적 대시보드 폴더
┃  ┃  ┃  ┣ 📄 edit.tsx .................................. ## 편집 페이지
┃  ┃  ┃  ┗ 📄 index.tsx ................................. ## 인덱스 페이지
┃  ┣ 📄 login.tsx ....................................... ## 로그인 페이지
┃  ┣ 📄 mydashboard.tsx ................................. ## 마이 대시보드 페이지
┃  ┣ 📄 mypage.tsx ...................................... ## 마이 페이지
┃  ┣ 📄 signup.tsx ...................................... ## 회원가입 페이지
┃  ┣ 📄 _app.tsx ........................................ ## 앱 설정
┃  ┗ 📄 _document.tsx ................................... ## 문서 설정
┣ 📁 public ............................................. ## public 폴더: 각종 src들
┣ 📁 styles ............................................. ## styles 폴더: 전역 style
┣ 📄 .prettierrc ........................................ ## Prettier 설정 파일
┣ 📄 package.json ....................................... ## 프로젝트 설정 및 의존성 정보
┣ 📄 README.md .......................................... ## 프로젝트 설명서
┣ 📄 tailwind.config.ts ................................. ## Tailwind CSS 설정
┣ 📄 tsconfig.json ...................................... ## TypeScript 설정
┗ 📄 yarn.lock .......................................... ## Yarn 의존성 잠금 파일
```

#### [배포]
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7) 


-------------------------------------------------------------------------------------
# 3. 프로젝트 진행방식
### 1️⃣ jira Project
1차적으로 백로그에 적어놓은 작업들을 이슈로 옮기면서 브랜치 생성하고 개발시작하는 순서로 진행했습니다. 
<img width="840" alt="image" src="https://github.com/Team2-project/taskify/assets/115947715/d11264b8-484b-418d-8af0-a87dd68fc8a9" width="50%" height="50%">


### 2️⃣ Discord
데일리 스크럼은 Discord 스레드를 사용해 매일 1시에 업로드하는 시간을 가졌습니다.
<img width="761" alt="image" src="https://github.com/Team2-project/taskify/assets/115947715/3e70438b-71ae-4137-bf75-498608ba0aa8" width="50%" height="50%">

-------------------------------------------------------------------------------------
# 4. 주요기능
#### 로그인/회원가입 기능 & 계정 관리
![로그인3](https://github.com/Team2-project/taskify/assets/115947715/835e218f-861f-4660-bbb6-2d92a7e9d1ea)

#### 나만의 대시보드 만들기
![대시보드3](https://github.com/Team2-project/taskify/assets/115947715/4a6b15e8-5da2-4de6-89cf-0617feeaef83)

#### 할일 생성 & 수정 & 삭제 기능
![모달창_-Clipchamp로-제작](https://github.com/Team2-project/taskify/assets/115947715/604e5a86-51c2-478d-a85c-3a8356202625)

#### 할 일 모달창에 댓글 달기
![댓글기능_-Clipchamp로-제작](https://github.com/Team2-project/taskify/assets/115947715/8bdeeb22-b216-4246-8089-80ca4ba171b5)


#### 대시보드에 유저 초대하기
![초대하기3](https://github.com/Team2-project/taskify/assets/115947715/bfb4890b-f1b0-48de-9f10-e5210536a039)

-------------------------------------------------------------------------------------
# 5. 데이터 통신 방법

### 기술스택
1. Axios - HTTP 통신 관리
2. 공용 fetcher함수 - Axios 설정 기반으로 API 요청을 효율적으로 처리
3. Tanstack Query - 데이터 상태 관리와 캐싱 처리


### 공용 Fetcher 함수의 역할과 구현

- 공용 fetcher 함수는 Axios 인스턴스를 활용하여 API 요청을 실행함.
- 이 함수는 자동으로 사용자 인증 토큰을 요청 헤더에 추가하고, API 응답을 처리하여 직접적으로 필요한 데이터만 반환함.
- 이로써, 코드 중복을 줄이고, 유지 보수를 용이하게 하며 각 요청마다 일관된 방식으로 인증 정보를 처리함

### TanStack Query의 통합과 이점

- API 요청 결과는 TanStack Query를 사용하여 관리됨
- TanStack Query는 자동으로 캐싱하고, 데이터의 로딩 상태 및 에러 상태를 효과적으로 관리함
- 네트워크 요청의 수를 줄이고, 사용자 인터페이스 반응성을 개선함
- 거기에 더해, 예를 들어, 대시보드 데이터를 조회&생성&수정&삭제 기능을 구현한 커스텀 훅을 만들어, 컴포넌트에서 데이터 관리를 쉽고 일관되게 수행함

### 에러 핸들링과 성능 최적화

- fetcher 함수와 Tanstack Query를 결합하여 강력한 에러 핸들링 전략을 시행함
- 모든 API 호출이 중앙에서 에러를 포착하고 처리되며 실패한 요청에 대해 사용자 피드백을 즉각적으로 제공함
- Tanstack Qeury의 무효화(invalidation) 기능을 사용하여 관련 데이터가 변경될 떄 자동으로 새로 고침하고 최신 상태를 유지하도록 함

-------------------------------------------------------------------------------------
# 6. 느낀 점

### 김진윤

### 박진경

### 오채연

### 은동혁

### 조예은
























