# Boom Paper

* BoomLabs EVM 1기 7팀 토이프로젝트 소스코드
  
* CREATE , SHARE , MINT

* [First Presentation](docs/BoomLabsToyProjectIdea.pdf)
* [Second Presentation](docs/BoomPaper-ProgressReport.pdf)
* [Last Presentation](docs/BoomPaper.pdf)


## Getting Started

* yarn 과 npm 을 함께 써도 된다.
  
### 1. run with yarn workspace

* yarn workspace 를 이용하여 관리 및 실행 하기

```bash
cd ~/{PROJECT_HOME}
yarn set version berry
yarn -v
yarn
yarn install
```

* yarn workspaces 확인하기
  
```bash
cd ~/{PROJECT_HOME}
yarn workspaces list
```

### 2. compile and deploy contracts pacakge

* contracts

```bash
cd packages/contracts
npm install
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.ts
npx hardhat run scripts/mint_nft_storage.ts
```

* [README](packages/contracts/README.md)

### 3. run client web package

* npm 으로 각 패키지에서 실행하기

```bash
cd ~/{PROJECT_HOME}
cd packages/web

yarn
npm install

npm run dev
#or
npx next dev
#or
yarn dev
```

* yarn workspaces 로 확인하고 실행하기

```bash
cd ~/{PROJECT_HOME}
yarn workspaces list
yarn workspace web dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 결론

* 많은 결함을 갖고 있고 보충해야 할 것이 많은 코드입니다.
* 여러분들이 찾아서 함께 더 완성도 있는 코드로 만들어주셔요.

