REAL-SNS

・技術スタック

フロントエンド : React, Axios
バックエンド : Express (Node.js), Mongoose
データベース : MongoDB

・環境構築方法

このプロジェクトは、MongoDBを使用したExpressバックエンドとReactフロントエンドのフルスタックアプリケーションである。以下の手順でローカル環境を構築できる。

1. リポジトリをクローン

git clone https://github.com/your-username/your-repo-name.git

2. バックエンドのセットアップ

cd backend
npm install

.envファイルを作成

MONGO_URL=<your_mongodb_connection_string>

サーバー起動

npm run dev

3. フロントエンドのセットアップ

cd ../frontend
npm install

.envファイルを作成

REACT_APP_PUBLIC_FOLDER=http://localhost:5000/images/

アプリ起動

npm start
