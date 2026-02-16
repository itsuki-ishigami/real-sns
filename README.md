REAL-SNS

・技術スタック

フロントエンド : React, Axios
バックエンド : Express (Node.js), Mongoose
データベース : MongoDB

・環境構築方法

このプロジェクトは、MongoDBを使用したExpressバックエンドとReactフロントエンドのフルスタックアプリケーションである。以下の手順でローカル環境を構築できる。

1. リポジトリをクローン

```bash
git clone https://github.com/itsuki-ishigami/real-sns.git
```

2. バックエンドのセットアップ

```bash
cd backend
npm install
```

.envファイルを作成

MONGO_URL=<your_mongodb_connection_string>

サーバー起動

npm run dev

3. フロントエンドのセットアップ

```bash
cd ../frontend
npm install
```

.envファイルを作成

REACT_APP_PUBLIC_FOLDER=http://localhost:5000/images/

アプリ起動

npm start
