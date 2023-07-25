## 프로젝트 소개

[ChallengeFlow](https://challenge-flow.herokuapp.com/)는 그룹을 구성하여 원하는 주제에 대해 서로 학습을 도모할 수 있도록 서비스를 제공하는 웹 서비스입니다.

## 주요 기능

| GitHub 로그인                                                                                                                | 챌린지 생성                                                                                                                             |
| :--------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| ![02-user-login](https://github.com/DesignSystemLab/challenge-flow/assets/46988995/6c70079c-fcf8-4f6b-af80-f1f4594f9404)     | ![new-challenge](https://github.com/DesignSystemLab/challenge-flow/assets/46988995/e115a7a8-d45a-4e58-8266-91d0bc44373c)                |
| **챌린지 상세**                                                                                                              | **워크스페이스 목록**                                                                                                                   |
| ![04-view-challenge](https://github.com/DesignSystemLab/challenge-flow/assets/46988995/1106e683-6824-4eca-a025-4c6d81dc3802) | ![06-workspace-infinite-scroll](https://github.com/DesignSystemLab/challenge-flow/assets/46988995/360f46fc-aa19-4c95-91eb-85e04ce68509) |
| **워크스페이스 상세**                                                                                                        | **이메일 로그인**                                                                                                                       |
| ![07-workspace-view](https://github.com/DesignSystemLab/challenge-flow/assets/46988995/76666ddb-cdde-4553-a495-09852939abe2) | ![08-email-login](https://github.com/DesignSystemLab/challenge-flow/assets/46988995/dabfe62b-332d-493d-bdd7-28ba9339d7d5)               |

### 선언적인 코드

코드의 가독성과 재사용성을 고려하여 선언적인 코드를 작성하려 노력했습니다. 구체적인 예로, React 18 버전에서 제공하는 Suspense와 ErrorBoundary를 활용하여 로딩 상태와 오류 경계를 구성했으며, 로딩과 오류 UI에 대한 책임을 컴포넌트 외부로 위임할 수 있었습니다.

```jsx
<section>
  <WorkspaceSearchFilter handleChangeOpenType={setOpenType} />
  <CompositionBoundaryReactQuery error={(errorProps) => <WorkspaceError {...errorProps} />} suspense={<Loader />}>
    <WorkspaceList openType={openType} />
  </CompositionBoundaryReactQuery>
</section>
```

### 지역성을 고려한 프로젝트 구조

```plaintext
📦root/src
├── 📂 auth
├── 📂 challenge
├── 📂 layout
├── 📂 pages
│   ├── 📂 api
│   ├── 📂 challenge
│   ├── 📂 profile
│   └── 📂 workspace
├── 📂 reaction
│   ├── 📂 comment
│   └── 📂 emoji
├── 📂 shared
└── 📂 workspace
```

지역성을 고려한 패키지 구조란, 연관성이 높은 코드끼리 같은 폴더 내에 위치시키는 구조입니다.

이러한 구조를 선택함으로써 두가지 큰 이점을 얻을 수 있습니다.

**1. 높은 응집도**  
폴더 내부는 서로 밀접하게 연관되어 있으므로, 변경이 발생하더라도 해당 패키지 내에서 대부분 처리가 가능합니다. 이는 유지보수를 쉽게하고, 코드의 가독성을 향상시킵니다.

**2. 낮은 결합도**  
서로 다른 패키지간의 의존을 최소화함으로써, 한 폴더 내에서의 변경이 다른 폴더에 미치는 영향을 줄일 수 있습니다. 이는 전체적인 시스템의 안정성을 유지하는데 도움이 됩니다.

해당 프로젝트에서는 `auth` `challenge` `reaction` `workspace` 의 큰 도메인별로 폴더를 구성했습니다. 이러한 구조는 각 도메인별로 컴포넌트, 훅 등을 포함하고 있으며, 이는 각 도메인이 독립적으로 작동할 수 있도록 해줍니다.

### 디자인시스템 활용

팀 자체적으로 개발한 [디자인시스템](https://github.com/DesignSystemLab/design-system)을 활용하여 미리 설계된 UI 컴포넌트 및 스타일 헬퍼 컴포넌트를 적극적으로 활용하여 초기 개발 속도를 높일 수 있었습니다.

## 기술 선택

프로젝트에 사용된 기술들은 다음과 같습니다.

### ReactQuery

- **서버 상태관리**  
  React Query는 서버 상태를 쉽게 관리할 수 있습니다. fetch, cache, 동기화라는 주요 문제를 해결하는 데 초점을 맞춘 라이브러리이므로, API와의 통신을 담당하고 결과를 캐시하고 동기화하도록 하는 기능을 포함하고 있습니다.
- **캐싱**  
  React Query는 자동으로 데이터를 캐시하고, 백그라운드에서 자동으로 캐시를 업데이트하므로, 사용자는 항상 최신데이터를 볼 수 있습니다. 또한 캐시된 데이터는 메모리에 저장되어 페이지간 이동시에 재활용할 수 있습니다.
- **React와의 통합**  
  React Query는 React와 잘 통합되도록 설계되었습니다. React의 ContextAPI와 Suspense를 활용하여, 더 좋은 사용자 경험과 개발자 경험을 제공할 수 있습니다.

### IntersectionObserver API

무한스크롤 기능을 도입하기 위해 `react-intersection-observer `라이브러리를 활용하였습니다. 이 라이브러리는 선언적인 hook을 제공하고, IntersectionObserver API를 간편하게 사용할 수 있어서 유용하게 활용할 수 있었습니다.

### NextAuth

NextAuth는 사용자 인증 처리를 제공합니다. 프로젝트 데이터베이스는 Firebase를 사용하므로, NextAuth에서 제공하는 인증 공급자(Provider)와 연동하여 회원 관리 기능을 수행하고 API 통신 시 서버 내에서 세션을 활용한 인증 로직을 구현하였습니다.

### Firebase

Challenge Flow는 Firebase를 사용함으로써, 서버를 직접 구축하고 유지관리할 필요 없이 백엔드 서비스를 손쉽게 사용할 수 있었습니다. 이를 통해 개발 단계에서 클라이언트 사이드 개발에 더욱 집중하고, 프로젝트의 초기버전을 신속하게 릴리즈하는데 초점을 맞출 수 있었습니다.

초기버전에서는 신속한 개발을 위해 Firebase를 활용했지만 프로젝트가 성장하면서 더 복잡하고 탄탄한 백엔드 시스템이 필요할 경우 Firebase를 Node.js와 RDBS를 기반으로 하는 백엔드 시스템으로 전환할 계획을 가지고 있습니다.

### XState

UI 관점에서 클라이언트 상태를 제어하기 위해 '유한상태기계' 개념을 활용했습니다. 유한상태기계란, 시스템이 특정 상태에서 다른 상태로 전이되는 과정을 모델링하는 수학적 모델입니다. 이 모델을 사용하여 기존 데이터 관점 상태 관리보다 사용자 인터페이스에서 발생하는 다양한 상황에 대응할 수 있습니다.
