# REAL-SNS

React + Express + MongoDB を使ったSNSアプリケーション

## 概要

Real-SNSはTwitterライクなソーシャルネットワーキングサービスです。ユーザー登録、ログイン、投稿、いいね、フォロー機能を実装しています。

**主な機能**
- ユーザー認証（ログイン・新規登録）
- テキスト・画像投稿
- いいね機能
- フォロー・フォロワー機能
- タイムライン表示
- プロフィールページ

## 技術スタック

**フロントエンド**
- React 19
- Vite
- React Router DOM
- Axios
- Material-UI（アイコン）

**バックエンド**
- Express (Node.js)
- Mongoose
- Multer（画像アップロード）
- Helmet（セキュリティ）

**データベース**
- MongoDB

## セットアップ

### 前提条件

- Node.js v16以上
- npm
- MongoDB（ローカルまたはMongoDB Atlas）

### インストール手順

#### 1. リポジトリのクローン

```bash
git clone https://github.com/itsuki-ishigami/real-sns.git
cd real-sns
```

#### 2. バックエンドのセットアップ

```bash
cd backend
npm install
```

`backend/.env`ファイルを作成して以下を記述：

```env
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/real-sns?retryWrites=true&w=majority
PORT=5000
```

MongoDB Atlasの接続文字列は[こちら](https://www.mongodb.com/atlas)から取得できます。

サーバーを起動：

```bash
npm run dev
```

#### 3. フロントエンドのセットアップ

新しいターミナルを開いて：

```bash
cd frontend
npm install
```

`frontend/.env`ファイルを作成して以下を記述：

```env
VITE_PUBLIC_FOLDER=http://localhost:5000/images/
```

アプリを起動：

```bash
npm run dev
```

ブラウザで`http://localhost:5173`にアクセス。

## プロジェクト構造

```
real-sns/
├── backend/
│   ├── server.js
│   ├── models/
│   │   ├── User.js
│   │   └── Post.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── posts.js
│   │   └── upload.js
│   └── public/images/
│
└── frontend/
    ├── index.html          # Viteのエントリー
    ├── vite.config.js      # Vite設定
    ├── .env.example        # 環境変数のテンプレート
    ├── public/
    │   └── assets/         # 静的ファイル
    └── src/
        ├── main.jsx        # エントリーポイント
        ├── App.jsx         # ルーティング
        ├── pages/          # ページコンポーネント
        ├── components/     # 再利用可能なコンポーネント
        └── state/          # 認証状態管理
```

## トラブルシューティング

**MongoDB接続エラー**

`.env`ファイルの設定を確認してください。MongoDB Atlasを使用している場合は、ネットワークアクセス設定で接続元IPを許可する必要があります。

**ポートが使用中**

```bash
# Mac/Linux
lsof -ti:5173 | xargs kill -9

# Windows
netstat -ano | findstr :5173
taskkill /PID <PID番号> /F
```

**依存関係のエラー**

```bash
rm -rf node_modules package-lock.json
npm install
```

## ライセンス

ISC

## 作者

Itsuki Ishigami
