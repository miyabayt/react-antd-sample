# react-antd-sample

## Requirement

- Node Version Manager
- Node.js v22.5.x

```shell
$ # node v22.5.1のインストール（初回のみ）
$ nvm install v22.5.1

$ # nodeバージョンの切り替え
$ nvm use v22.5.1

$ # nodeバージョンの確認
$ node -v
v22.5.1
```

## APIモックサーバーの起動

```shell
$ # モックサーバーの資材があるディレクトリに移動する
$ cd ./mock-server

$ # モックサーバーの起動（Node版）
$ yarn dev

$ # モックサーバーの起動（Docker版）
$ docker compose up -d
```

## アプリケーションの起動

```shell
$ # 初回および依存ライブラリが変わったときに実行
$ yarn install

$ # 開発環境の起動
$ yarn dev
```

### テストユーザ
- TBD

## テストの実行

```shell
$ # 初回のみ
$ npx playwright install --with-deps

$ # テスト実行（8080ポートが利用されてないことを確認してから実行すること）
$ yarn test:e2e

$ # 特定のテストだけ実行する場合
$ yarn test:e2e --grep "TBD"
```

## Storybook

```bash
$ yarn storybook
```
