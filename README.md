# 学びの輪 — Project Archive

学習支援システムの開発概要、進捗、検証データ、今後の展開を伝えるプロジェクトサイトです。Next.js互換のApp Router構成で、GitHub Pages向けに静的出力します。

## ローカル確認

```bash
npm install
npm run dev
```

## GitHub Pagesへの公開

1. GitHubにリポジトリを作成し、このプロジェクトを`main`ブランチへpushします。
2. リポジトリの **Settings → Pages → Build and deployment** でSourceを **GitHub Actions** にします。
3. 同梱のワークフローが自動でビルド・公開します。

公開URLがユーザーサイトや独自ドメイン直下の場合は、ワークフローの`PAGES_BASE_PATH`を空文字に変更してください。

## 注意

画面上の「限定公開」は現在デザイン上の表示です。GitHub Pagesは静的ホスティングのため、QRコードを読み取った端末だけにアクセスを限定する強固な認証は実装できません。認証が必要になった段階で、Cloudflare Accessなどの認証レイヤーまたはサーバー側の仕組みを追加してください。

## さくらのAI Engineを使う質問機能

APIトークンを公開しないため、`workers/sakura-ai` のCloudflare WorkerがさくらのAI Engineを中継します。

WorkerはCloudflare Durable Objectで、接続元IPごとに直近1分5回・日本時間の1日50回、サイト全体で日本時間の暦月2,700回までに制限します。上限に達したリクエストにはHTTP 429と`Retry-After`を返します。ログインのない公開サイトなので、同じIPを共有する利用者は枠も共有します。AIページの直近3往復は同じブラウザタブの間だけ保持し、新しい会話またはタブを閉じると消えます。

1. `workers/sakura-ai/wrangler.jsonc` の `ALLOWED_ORIGIN` を公開サイトのOriginに変更します（末尾の `/` は付けません）。
2. Cloudflareへログインして、さくらAIのアカウントトークンをSecretとして登録・デプロイします。

```bash
npx wrangler login
npm run ai:secret
npm run ai:deploy
```

3. デプロイ後に表示されたWorker URLを、サイトのビルド環境変数へ設定します。

```bash
NEXT_PUBLIC_SAKURA_AI_PROXY_URL=https://sechack-sakura-ai.<subdomain>.workers.dev npm run build
```

GitHub Actionsで公開する場合は、リポジトリのSettings → Secrets and variables → Actions → Variablesに `NEXT_PUBLIC_SAKURA_AI_PROXY_URL` を登録し、ワークフローのbuildステップへ同名の環境変数を渡します。さくらAIのトークンはGitHub Pages側へ登録しないでください。
# sechack365
