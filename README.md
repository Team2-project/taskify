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


### [맡은 작업]
### 김진윤
- 백로그 관리
- API 통신 및 데이터 관리
- Layout
- Navigation Bar 
- 할 일 상세 Modal
- 할 일 수정 Modal
- 사용자 계정 관리 페이지
- 사용자 프로필&비밀번호 변경
- Dropdown Bar
- MyDashboard Page - 대시보드 추가 기능
- 전체적인 리펙토링


### 박진경
- Userflow 제작
- Landing Page 구현
- Mydashboard Page 구현


### 오채연
- 프로젝트 총괄
- 프로젝트 기초 세팅
- Wireflow 제작
- 로그인 페이지
- 회원가입 페이지
- 로그인&로그아웃 기능
- auth 관련 작업
- 대시보드 페이지
- 대시보드 수정 페이지
- 전체적인 리펙토링
- 배포

### 은동혁
- 합성 컴포넌트 패턴 도입
- Modal 컴포넌트 제작
- Button 컴포넌트 제작
- Input 컴포넌트 제작
- 시연 영상 제작

### 조예은
- Side Bar 구현 (ButtonList 구현)



<br>

-------------------------------------------------------------------------------------
# 2.  기술 및 개발 환경 🛠️
#### [기술 스택]
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=react&logoColor=white) 

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
📁 Taskify ......................................... ## root
┣ 📁 atoms ......................................... ## Atoms@Jotai
┣ 📁 components .................................... ## components
┣ 📁 hooks ......................................... ## hooks
┣ 📁 lib ........................................... ## library
┃  ┣ 📁 api ........................................ ## API
┃  ┃  ┣ 📁 types ................................... ## 타입 정의
┃  ┃  ┣ 📄 axios.ts ................................ ## Axios 설정
┃  ┃  ┗ 📄 fetcher.ts .............................. ## 데이터 가져오기 유틸
┃  ┗ 📄 validation.ts .............................. ## 검증 스크립트
┣ 📁 pages ......................................... ## pages
┃  ┣ 📁 dashboard .................................. ## 대시보드 페이지
┃  ┃  ┗ 📁 [dashboardId] ........................... ## 동적 대시보드 폴더
┃  ┃  ┃  ┣ 📄 edit.tsx ............................. ## 편집 페이지
┃  ┃  ┃  ┗ 📄 index.tsx ............................ ## 인덱스 페이지
┃  ┣ 📄 login.tsx .................................. ## 로그인 페이지
┃  ┣ 📄 mydashboard.tsx ............................ ## 마이 대시보드 페이지
┃  ┣ 📄 mypage.tsx ................................. ## 마이 페이지
┃  ┣ 📄 signup.tsx ................................. ## 회원가입 페이지
┃  ┣ 📄 _app.tsx ................................... ## 앱 설정
┃  ┗ 📄 _document.tsx .............................. ## 문서 설정
┣ 📁 public ........................................ ## public 폴더: 각종 src들
┣ 📁 styles ........................................ ## styles 폴더: 전역 style
┣ 📄 .prettierrc ................................... ## Prettier 설정 파일
┣ 📄 package.json .................................. ## 프로젝트 설정 및 의존성 정보
┣ 📄 README.md ..................................... ## 프로젝트 설명서
┣ 📄 tailwind.config.ts ............................ ## Tailwind CSS 설정
┣ 📄 tsconfig.json ................................. ## TypeScript 설정
┗ 📄 yarn.lock ..................................... ## Yarn 의존성 잠금 파일
```

#### [배포]
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7) 


-------------------------------------------------------------------------------------
# 3. 프로젝트 진행방식 👥
### 1️⃣ jira Project
1차적으로 백로그에 적어놓은 작업들을 이슈로 옮기면서 브랜치 생성하고 개발시작하는 순서로 진행했습니다. 
<img width="840" alt="image" src="https://github.com/Team2-project/taskify/assets/115947715/d11264b8-484b-418d-8af0-a87dd68fc8a9" width="50%" height="50%">


### 2️⃣ Discord
데일리 스크럼은 Discord 스레드를 사용해 매일 1시에 업로드하는 시간을 가졌습니다.
<img width="761" alt="image" src="https://github.com/Team2-project/taskify/assets/115947715/3e70438b-71ae-4137-bf75-498608ba0aa8" width="50%" height="50%">

-------------------------------------------------------------------------------------
# 4. 주요기능 💜
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
# 5. 데이터 통신 방법 💻

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
# 6. 느낀 점 💬
### 오채연 (팀장)
협업 프로젝트를 통해 새로운 기술을 배우고 적용하며 개발 능력을 크게 향상시킬 수 있었습니다. 팀원들과의 소통, 진행사항 공유, 책임감의 중요성, 팀에 알맞은 진행 방식 등 혼자서는 배울 수 없었던 많은 점을 배웠습니다. 특히 각자의 역할과 책임을 다하는 것이 프로젝트 성공에 얼마나 중요한지 깨달았습니다. 이번 경험을 바탕으로 부족한 부분을 보완하고 더 발전하는 개발자가 되겠습니다.

### 김진윤
이번 프로젝트를 통해 기술적으로 큰 성장을 경험할 수 있었습니다. 좋은 코드를 작성하는 것뿐만 아니라, 기술 정보와 문제 해결 과정을 문서화하는 데도 많은 시간을 할애했습니다. 팀워크와 프로젝트 관리에 대해서도 깊이 생각해 볼 기회가 많았습니다. 이 모든 과정은 제게 큰 도전이었지만, 그만큼 제 발전에도 큰 도움이 되었습니다. 앞으로도 효과적인 팀워크를 구축하고, 더 나은 개발자로 성장하기 위해 지속적으로 노력할 것입니다.

### 박진경
이 프로젝트를 통해 새로운 기술들을 배우고 적용해볼 수 있었습니다. Tanstack Query를 이용한 API 연동도 직접 해보면서 익혀볼 수 있었습니다. 부족한 부분에 대해서 어떤 부분을 더 학습해 나가야할 지도 알 수 있는 시간이었습니다. 또한 팀원과 함께하는 프로젝트에서 서로 이해하고 존중하는 자세의 중요성을 느꼈습니다.

### 은동혁
이번 프로젝트를 통해 새로운 기술 스택들을 학습하고 성장하자는 목표로 TanStack Query와 Jotai를 사용한 전역 상태 관리 기술을 익히게 되어 매우 뿌듯하고 특히, 카드 데이터 전역 상태 관리를 처음 시도해보는 경험과 인증 기반 API 요청에 대한 이해도가 올라 많은 성장을 이뤘습니다. 팀원들의 협력과 소통 덕분에 많은 것을 극복할 수 있었고 모두 정말 고생 많으셨습니다!

### 조예은
중급 프로젝트 역시 이 전 번의 프로젝트와 마찬가지로 기술적인 성장을 경험할 수 있었습니다. 또한 두번째 겪은 협업이란 면에서 더 많은 내면의 성장을 얻을 수 있었습니다. 어떻게 하면 더 나은 개발자가 될 지에 대해 더 많은 고민을 하게 됐고, 그만큼 더 많은 것을 배울 수 있던 것 같습니다. 그럼으로써 결국 내가 할 수 있는 것에 대해 많은 것을 알아갔던 것 같습니다.























