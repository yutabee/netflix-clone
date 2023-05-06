# Userモデル

```prisma
model User {
  id String @id @default(auto()) @map("_id") @db.ObjectId
  name String
  image String?
  email String? @unique
  emailVerified DateTime?
  hashedPassword String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  sessions Session[]
  accounts Account[]
  favoriteIds String[] @db.ObjectId
}
```

`User` モデルは、アプリケーションのユーザー情報を保存するためのモデルです。各フィールドの詳細について説明します。

1. id
   - ユーザーの一意な識別子です。
   - `@id` でプライマリーキーとしてマークされています。
   - `@default(auto())` で自動生成されるように設定されています。
   - `@map("_id")` で MongoDB のデフォルトのプライマリーキーである `_id` にマッピングされています。
   - `@db.ObjectId` で MongoDB のオブジェクトID形式で格納されることを示しています。

2. name
   - ユーザーの名前です。
   - String 型で格納されます。

3. image
   - ユーザーのプロフィール画像のURLです。
   - String 型で格納されますが、`?` が付いているためオプショナル（nullを許容）です。

4. email
   - ユーザーのメールアドレスです。
   - String 型で格納されますが、`?` が付いているためオプショナル（nullを許容）です。
   - `@unique` でメールアドレスが一意であることを保証しています。

5. emailVerified
   - ユーザーのメールアドレスが確認済みかどうかを示す日時です。
   - DateTime 型で格納されますが、`?` が付いているためオプショナル（nullを許容）です。

6. hashedPassword
   - ユーザーのハッシュ化されたパスワードです。
   - String 型で格納されますが、`?` が付いているためオプショナル（nullを許容）です。

7. createdAt
   - ユーザーが作成された日時です。
   - DateTime 型で格納されます。
   - `@default(now())` でユーザーが作成された現在時刻が自動的に格納されるように設定されています。

8. updatedAt
   - ユーザーが最後に更新された日時です。
   - DateTime 型で格納されます。
   - `@updatedAt` でレコードが更新されるたびに、自動的に現在時刻が格納されるように設定されています。

9. sessions
   - ユーザーのログインセッションです。
   - Session 型の配列で格納されます。
   - User モデルと Session モデルの間に1対多のリレーションが定義されています。
```prisma
model Session {
id String @id @default(auto()) @map("_id") @db.ObjectId
sessionToken String @unique
userId String @db.ObjectId
expires DateTime
user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

10.   accounts
    - ユーザーが関連付けられた外部認証プロバイダ（Google、Facebook など）のアカウント情報です。
    - Account 型の配列で格納されます。
    - User モデルと Account モデルの間に1対多のリレーションが定義されています。
```prisma
model Account {
  id String @id @default(auto()) @map("_id") @db.ObjectId
  userId             String   @db.ObjectId
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String?  @db.String
  access_token       String?  @db.String
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String?  @db.String
  session_state      String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}
```

11.   favoriteIds
    - ユーザーがお気に入りとして登録した映画のIDを格納する配列です。
    - String 型の配列で格納されます。お気に入りの映画がない場合、空の配列が格納されます。
    - `@db.ObjectId` で、配列内の各IDが MongoDB のオブジェクトID形式で格納されることを示しています。