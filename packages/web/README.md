
# Boom Paper Front End

## Getting Started

### setup

* cd {PROJECT_HOME}
* vi {PROJECT_HOME}/packages/contracts/.env.local
    * fill in your settings
* cp {PROJECT_HOME}/packages/contracts/.env.local {PROJECT_HOME}/packages/contracts/.env.
* yarn
* cd {PROJECT_HOME}/packages/contracts/
* npm install
* npx hardhat compile
* npx hardhat test
* npx hardhat deploy
* npx hardhat deploy --network mumbai

### execution 

* cd {PROJECT_HOME}
* yarn workspace web dev

## 'ToDo's

### flow  - DONE

* layout coding
* connect wallet
    * local node
    * mumbai
* create a paper
* create a comment NFT 
* list papers
* list comments
* create a paper NFT

### tasks



#### 2022-09-02~03 Tasks

* 예외처리
  *  Go Create  눌렀을때  connect 아니면 연결하게 하기
  *  https://boompaper.vercel.app/paper/1 여기로 바로  갔을때 연결이 안되면 연결 시키고, 연결되면 리프레시 하기
  *  https://boompaper.vercel.app/paper/1 소셜 링크 공유 코드 넣기
  * https://boompaper.vercel.app/paper/list 에서 페이퍼 리스트 스타일링
  * https://boompaper.vercel.app/paper/list 문구들 괜찮은지
  * https://boompaper.vercel.app/paper/list 로딩중 표시?
  * https://boompaper.vercel.app/paper/1  문구들 괜찮은지
  * https://boompaper.vercel.app/paper/1 에서 로딩중 표시 
  * https://boompaper.vercel.app/paper/1  최적화 가능할지
  * https://boompaper.vercel.app/paper/comment  로딩중 표시 가능할지
  * https://boompaper.vercel.app/paper/comment  뒤로 가기 버튼?
  * https://boompaper.vercel.app/paper/comment 이 connected 아닐때 연결시키는 페이지로 하고, 커넥트되면 리프레시
  * https://boompaper.vercel.app/paper/comment  민팅 버튼이 사라졌네? ㅎㅎ 
  * https://boompaper.vercel.app/paper/comment 멀티라인 텍스트 지원 ( ㅠㅠ )
  * https://boompaper.vercel.app/paper/comment 폰트(예지님이 주신 것) 아직  지원 못함;;
  * https://boompaper.vercel.app/paper/comment 랜덤으로 그림 보여주게 한 상태 
  * https://boompaper.vercel.app/paper/comment  에서  민팅 누르고, 메타마스크 뜰때까지 기다리도록 진행중 표시
  * https://boompaper.vercel.app/paper/comment 민팅 누르고, 취소하면? 버튼 사라진채로 있다 ㅎ 

#### 2022-09-02 - Tech

* 예외처리
  * Transaction
  * Flow
  * Wallet Connected
  * Wallet Disconnected
  * Error Messages ( English, Korean )
  * Wallet 설치 안내 
* 최적화
* PaperManager Contract 에 field 추가
  * image
  * owner name 
* Profile Contract 만들어 두기
  * favorite
  * PFP link
  * PFP mint 
  * PFP picture upload 
* Image Tag 

* 관리용
  * 템플릿 추가 관리자가 할 수 있게
  * 로컬 서버 테스트 방법
  * 서비스 관리 대쉬보드
  * 업그레이드 가능하게 , 업그레이드 테스트


* 최적화
  * 콤포넌트화 못한 것




#### 2022-09-02 ( 전체적인 일 )

* 간단한 task
  * Social Share ( facebook, twitter )
    * Meta Data 넣기
    * 트레이딩 피 설정?
    * 히든 설정?

* UI 다듬기

  * Hero Component 
    * Go Create 대신에 더 멋지게?
  * loading 중...
  * 

* 예외사항 처리

  * 로딩 
  * 트랜잭션 진행중
  * 렌더링 안되는 경우 없나
  * 트랜잭션 에러
  * 트랜잭션 취소

* 기술적인 이슈

  * svg 폰트 : Spoqa Han Sans Neo 를 svg 에 뿌리기
  * svg multiline text : text area 로 입력 받고, \n 으로 구분하여 여러 라인으로 
  * 악평 차단
    * 허용된 유저 ( whitelist ) , 차단된 유저 ( blacklist )
    * burn NFT 
  * paper home : 이미지, 타이틀, 글쓴이
  * 최적화 
     * 이미지 최적화
     * 모바일 최적화
     
* 논의할 것
  * 페이퍼 등록 비용
    * 받아들이게
    * 점점 올림? ㅎ 
  * NFT 등록 비용
    * 받아들이게
  * 거래 비용 
  * burn 비용  
  * 선물 기능 
  * https://boompaper.vercel.app/paper/1
    * 오픈시에서 보기 링크 추가?

*  더 하고 싶은 것

   * 리스트 filter
     * 날짜 역순
     * favorites
     * my paper
   * Paper 페이지
     * 대표 사진 업로드 ( ipfs )
   * 메시지 다양성
     * 템플릿 추가
     * 사진 업로드
       * SVG 업로드  
   * Profile 페이지
     * PFP 등록 ( 유저 등록 )
   * 선물 기능
     * NFT 민팅시 주인(Paper Owner) 에게 선물
       * MATIC or ETH
       * 다른 뭔가 
   * 월릿 교체
     * rainbow kit 
   * 확장성
     * 인원수 제한 또는 무한대  
     * Server, Database  
   * 하나로 합친 SVG ( Tile 형식 )
     * 비싸게 받자 ㅋ

* main 넷 준비

   * BI 
    * 정식 도메인
    * Logo, Icon , Colors

   * 베타(포커스 그룹,클로즈드,오픈) 서비스, 정식 서비스 
   * 마케팅 시드
   * 해외 고려 ( 영어 지원 )
   * 확장성 ( 웹2가 들어가야 )
   * 관리 및 서비스 운영
   * feedback 운영
   * 투자
   * 분배

* Vision
   * 추석 이후 이벤트 및 기념일 용도
     * 결혼
     * 출산
     * 이벤트 종류에 따라 다른 사이트?
   * 캐릭터 , 컨텐츠 , 디자인
   * Coin
     * Boom Paper Coin?
       * APE Coin? 
   * Social 기능
     * Lens Protocol
     * Follow 
     * Messenger
   * 다른 메인넷
     * ETH, Solana , ADA , Near , ....
       

#### 2022-08-29 - Almost Done

* rename 'Papers' -> 'PaperManager'( Paper Manager ) -> mint 'Paper' Contract aka 'Paper'
    * 완료
* rename 'Paper' -> 'Paper'(Comments Manager) -> mint 'Paper Token' aka 'Comment' NFT
    * 완료
* get the wallet connect
    * local/mumbai 로 연결되는거 확인 필요 
    * rainbowkit 으로 해보자  ( 안하기로 )
    * mumbai 완료 
* create a paper creation form
    * paper 생성 form 만든다.
    * 완료
    * 디자인 퍼블리싱 필요
* call paper creation contract 'PaperManager'
    * form에서 입력 받은 내용 validation 하고, paper contract 를 만든다.
    * 완료
    * 디자인 퍼블리싱 필요
* list papers from 'PaperManager' contract
    * 생성된 paper 들을 리스팅 한다.
    * 완료
    * 디자인 퍼블리싱 필요
* select a paper from the paper list
    * 완료
    * 디자인 퍼블리싱 필요
* create a comment form 
    * 메시지 입력 폼을 만든다.
    * 완료
    * 디자인 퍼블리싱 필요
* call comment NFT creation contract 'Paper' 
    * 완료
    * 디자인 퍼블리싱 필요
* list comments from the 'Paper' contract
    * 아직 
    * 디자인 퍼블리싱 필요

* hero page
    * 할까?

* about page
    * 할까?

