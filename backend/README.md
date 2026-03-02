# REAL-SNS Backend

Express + MongoDB で構築されたSNSアプリケーションのバックエンドAPI

## 技術スタック

- Node.js
- Express 5
- MongoDB + Mongoose
- Multer（画像アップロード）
- Helmet（セキュリティ）
- dotenv（環境変数管理）

## セットアップ

### 依存関係のインストール

```bash
npm install
```

### 環境変数の設定

`.env`ファイルを作成して以下を記述：

```env
MONGOURL=mongodb+srv://<username>:<password>@cluster0.pvezj93.mongodb.net/real-sns?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
```

または`.env.example`をコピー：

```bash
cp .env.example .env
```

その後、実際の値に置き換えてください。

### サーバーの起動

```bash
npm run dev
```

サーバーは`http://localhost:5000`で起動します。

## 利用可能なコマンド

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバー起動（nodemon使用） |
| `npm start` | 本番サーバー起動 |

## 環境変数

| 変数名 | 説明 | 例 |
|--------|------|-----|
| `MONGOURL` | MongoDB接続文字列 | `mongodb+srv://<username>:<password>@cluster0.pvezj93.mongodb.net/real-sns` |
| `PORT` | サーバーポート番号 | `5000` |

### MongoDB接続文字列の取得方法

#### MongoDB Atlas（クラウド）
1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)にログイン
2. クラスターを作成
3. Database Access でユーザーを作成
4. Network Access で接続元IPを許可（開発時は`0.0.0.0/0`）
5. Connect → Connect your application から接続文字列を取得

#### ローカル
```env
MONGOURL=mongodb://localhost:27017/real-sns
```

## APIエンドポイント

### 認証（/api/auth）

| メソッド | エンドポイント | 説明 |
|---------|---------------|------|
| POST | `/api/auth/register` | 新規ユーザー登録 |
| POST | `/api/auth/login` | ログイン |

### ユーザー（/api/users）

| メソッド | エンドポイント | 説明 |
|---------|---------------|------|
| GET | `/api/users/:id` | ユーザー情報取得 |
| PUT | `/api/users/:id` | ユーザー情報更新 |
| DELETE | `/api/users/:id` | ユーザー削除 |
| PUT | `/api/users/:id/follow` | フォロー |
| PUT | `/api/users/:id/unfollow` | フォロー解除 |

### 投稿（/api/posts）

| メソッド | エンドポイント | 説明 |
|---------|---------------|------|
| POST | `/api/posts` | 投稿作成 |
| GET | `/api/posts/:id` | 投稿取得 |
| PUT | `/api/posts/:id` | 投稿更新 |
| DELETE | `/api/posts/:id` | 投稿削除 |
| PUT | `/api/posts/:id/like` | いいね/いいね解除 |
| GET | `/api/posts/timeline/:userId` | タイムライン取得 |
| GET | `/api/posts/profile/:username` | ユーザーの投稿一覧 |

### アップロード（/api/upload）

| メソッド | エンドポイント | 説明 |
|---------|---------------|------|
| POST | `/api/upload` | 画像アップロード |

## プロジェクト構造

```
backend/
├── server.js           # エントリーポイント
├── .env               # 環境変数（Git管理外）
├── .env.example       # 環境変数のテンプレート
├── models/            # データモデル
│   ├── User.js       # ユーザーモデル
│   └── Post.js       # 投稿モデル
├── routes/           # APIルート
│   ├── auth.js       # 認証API
│   ├── users.js      # ユーザーAPI
│   ├── posts.js      # 投稿API
│   └── upload.js     # アップロードAPI
└── public/
    └── images/       # アップロード画像
        ├── person/   # プロフィール画像
        ├── post/     # 投稿画像
        └── promotion/# プロモーション画像
```

## データモデル

### User

```javascript
{
  username: String,      // ユーザー名（必須、ユニーク）
  email: String,         // メールアドレス（必須、ユニーク）
  password: String,      // パスワード（必須）
  profilePicture: String,// プロフィール画像パス
  coverPicture: String,  // カバー画像パス
  followers: [ObjectId], // フォロワーのID配列
  followings: [ObjectId],// フォロー中のID配列
  isAdmin: Boolean,      // 管理者フラグ
  desc: String,          // 自己紹介
  city: String,          // 居住地
  from: String,          // 出身地
  relationship: Number   // 交際ステータス
}
```

### Post

```javascript
{
  userId: ObjectId,      // 投稿者ID（必須）
  desc: String,          // 投稿内容
  img: String,           // 画像パス
  likes: [String],       // いいねしたユーザーID配列
  createdAt: Date        // 投稿日時
}
```

## トラブルシューティング

### MongoDB接続エラー

```
MongooseServerSelectionError: connect ECONNREFUSED
```

**解決方法：**
1. `.env`の`MONGOURL`が正しいか確認
2. MongoDB Atlasの場合：
   - ネットワークアクセスで接続元IPが許可されているか確認
   - ユーザー名とパスワードが正しいか確認
3. ローカルの場合：
   - MongoDBサービスが起動しているか確認
   ```bash
   brew services start mongodb-community
   ```

### ポート使用中エラー

```
Error: listen EADDRINUSE: address already in use :::5000
```

**解決方法：**
```bash
# Mac/Linux
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID番号> /F
```

または`.env`でポート番号を変更：
```env
PORT=5001
```

### 依存関係のエラー

```bash
rm -rf node_modules package-lock.json
npm install
```

### 画像アップロードエラー

- `public/images/`ディレクトリの書き込み権限を確認
- ディレクトリが存在するか確認
```bash
mkdir -p public/images/person public/images/post public/images/promotion
```

## セキュリティ

### 本番環境での注意点

1. **環境変数の保護**
   - `.env`は絶対にGitにコミットしない
   - 本番環境では環境変数をサーバーに直接設定

2. **CORS設定**
   - 本番環境では許可するオリジンを制限

3. **レート制限**
   - 必要に応じてレート制限ミドルウェアを追加

4. **パスワードハッシュ化**
   - 現在は平文保存（要改善）
   - bcryptなどでハッシュ化を推奨

## ライセンス

ISC
