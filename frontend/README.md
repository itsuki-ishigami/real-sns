# REAL-SNS Frontend

React + Vite で構築されたSNSアプリケーションのフロントエンド

## 技術スタック

- React 19
- Vite 7
- React Router DOM
- Axios
- Material-UI（アイコン）
- Emotion（スタイリング）

## セットアップ

### 依存関係のインストール

```bash
npm install
```

### 環境変数の設定

`.env`ファイルを作成して以下を記述：

```env
VITE_PUBLIC_FOLDER=http://localhost:5000/images/
```

または`.env.example`をコピー：

```bash
cp .env.example .env
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで`http://localhost:5173`にアクセス。

## 環境変数

| 変数名 | 説明 | 例 |
|--------|------|-----|
| `VITE_PUBLIC_FOLDER` | バックエンドの画像フォルダURL | `http://localhost:5000/images/` |

## 利用可能なコマンド

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | 本番用にビルド |
| `npm run preview` | ビルド結果をプレビュー |
| `npm run lint` | ESLintでコードチェック |

## プロジェクト構造

```
frontend/
├── index.html          # エントリーHTML
├── vite.config.js      # Vite設定
├── .env                # 環境変数
├── public/             # 静的ファイル
│   └── assets/         # CSS、画像
└── src/
    ├── main.jsx        # エントリーポイント
    ├── App.jsx         # ルーティング設定
    ├── pages/          # ページコンポーネント
    ├── components/     # 再利用可能なコンポーネント
    └── state/          # グローバル状態管理
```

## バックエンドとの連携

### プロキシ設定

`vite.config.js`でバックエンド（localhost:5000）へのプロキシを設定：

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
    }
  }
}
```

これにより、`/api/*`へのリクエストは自動的にバックエンドへ転送されます。

## CRAからの移行について

このプロジェクトはCreate React AppからViteへ移行されました。

### 主な変更点

- エントリーファイル: `index.js` → `main.jsx`
- 環境変数: `REACT_APP_*` → `VITE_*`
- 環境変数アクセス: `process.env.*` → `import.meta.env.*`
- 起動コマンド: `npm start` → `npm run dev`
- デフォルトポート: 3000 → 5173

## トラブルシューティング

### ポートが使用中

```bash
# Mac/Linux
lsof -ti:5173 | xargs kill -9

# Windows
netstat -ano | findstr :5173
taskkill /PID <PID番号> /F
```

### 依存関係のエラー

```bash
rm -rf node_modules package-lock.json
npm install
```

### バックエンドに接続できない

1. バックエンドが起動しているか確認（localhost:5000）
2. `.env`ファイルが正しく設定されているか確認
3. `vite.config.js`のプロキシ設定を確認

## ライセンス

ISC
