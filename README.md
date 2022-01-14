# 老爸的私房錢

老爸平時花錢總是不手軟，直到某一天老爸伸手到口袋竟然挖不到千元大鈔了，那時的他突然覺醒要好好地了解一下自己花錢的動向。老爸腦筋動得快，想到兒子正在 AlphaCamp 學習寫網頁前後端，於是老爸的私房錢便就此誕生啦！

網站建構使用 Node.js + Express + Express-handlebars + passport + bcryptjs + Boostrap + Font-awesome

## 頁面呈現

大螢幕與小螢幕首頁顯示

<p float="left"><img src="https://github.com/z88243310/expense_tracker/blob/master/public/img/home-pc.png" width="49%">
<img src="https://github.com/z88243310/expense_tracker/blob/master/public/img/home-phone.png" width="49%"></p>

登入與註冊

<p float="left">
<img src="https://github.com/z88243310/expense_tracker/blob/master/public/img/login-flow.gif" width="49%">
<img src="https://github.com/z88243310/expense_tracker/blob/master/public/img/register-flow.gif" width="49%">
</p>

新增與編輯

<p float="left">
<img src="https://github.com/z88243310/expense_tracker/blob/master/public/img/new-flow.gif" width="49%">
<img src="https://github.com/z88243310/expense_tracker/blob/master/public/img/edit-flow.gif" width="49%">
</p>

刪除與關鍵字分類

<p float="left">
<img src="https://github.com/z88243310/expense_tracker/blob/master/public/img/delete-flow.gif" width="49%">
<img src="https://github.com/z88243310/expense_tracker/blob/master/public/img/keyword-flow.gif" width="49%">
</p>

## 功能描述

登入

- 使用者註冊
- 第三方登入 - Facebook

資料顯示

- 關鍵字搜尋
- 年份篩選
- 月份篩選
- 類別篩選

主要功能

- 新增消費項目
- 編輯消費項目
- 刪除消費項目

## 環境建置需求

- [Node.js 14.16.0](https://nodejs.org/en/)
- Terminal | CMD | [Git Bash](https://gitforwindows.org/)
- [MongoDB 4.2.17](https://fastdl.mongodb.org/win32/mongodb-win32-x86_64-2012plus-4.2.17-signed.msi)
- MongoDB 管理工具 ( [Robo 3T](https://robomongo.org/) )
- 第三方登入 ( [Facebook developer app](https://developers.facebook.com/apps) )
- .env 檔 ( 環境變數設定 )
- ( 非必要 ) 反向代理 - 外網進入本地 ( [ngrok](https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-windows-amd64.zip) )

## 安裝與執行步驟

1.打開終端機 cd 到指定路徑 ( 以 windows 桌面 為例 )

```text
cd C:\Users\'使用者名稱'\Desktop
```

2.下載 expense_tracker 專案到本地電腦上

```text
git clone https://github.com/z88243310/expense_tracker.git
```

3.進入 expense_tracker 路徑

```text
cd expense_tracker
```

4.在 expense_tracker 路徑中，依照 package-lock.json 安裝 Express、Express-handlebars 與其他必要套件

```text
npm install
```

5.在 expense_tracker 路徑中，建立 .env 檔，設定環境變數

```text
// 必要
SESSION_SECRET="輸入任意加密字串"
MONGODB_URI=mongodb://localhost/expense-tracker
PORT=3000
```

6.製造種子資料 ( `須先確定 MongoDB 已啟動` )

```text
npm run seed
```

7.執行專案 ( 伺服器啟動後會顯示 `The server is listening on http://localhost:3000` )

```text
npm run start
```

8.開啟瀏覽器輸入網址 <http://localhost:3000>

9.使用測試帳號登入

廣志

```text
email : user1@example.com
password : 12345678
```

小新

```text
email : user2@example.com
password : 12345678
```

10.使用第三方登入 ( 建立 Facebook developer app，並於 .env 加入環境變數 )

方法一：本地測試使用

1. 建立 [Facebook developer app](https://developers.facebook.com/apps)後，點選 developer app 左上方，再次建立測試應用程式
2. 並於 .env 加入環境變數

```text
FACEBOOK_ID="輸入 facebook test app ID"
FACEBOOK_SECRET="輸入 facebook test app SECRET"
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
```

方法二：部屬 heroku，或以外網進入 localhost 測試時使用

1. 建立 [Facebook developer app](https://developers.facebook.com/apps) 取得 ID 和 SECRET
2. 使用 [ngrok](https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-windows-amd64.zip) 取得 https 本地外網網址

```text
// 選擇 - 第三方登入
FACEBOOK_ID="輸入 facebook app ID"
FACEBOOK_SECRET="輸入 facebook app SECRET"
FACEBOOK_CALLBACK="https 本地外網網址"/auth/facebook/callback
```

3. 加入環境變數後，於 [Facebook developer app](https://developers.facebook.com/apps) 設定中 <有效的 OAuth 重新導向 URI> 項目，也需輸入相同 FACEBOOK_CALLBACK 網址
4. [Facebook developer app](https://developers.facebook.com/apps) 權限與功能 > 開啟 public_profile 權限，即可正常運作

   11.快速清除資料庫

```text
npm run dropDB
```

輸入 yes 即可清除資料庫

## 開發工具版本

程式軟體

- Node.js 14.16.0
- MongoDB 4.2.17
- Robo 3T 1.4

前端外觀

- Boostrap 4.4.1 ( 搭配 popper 1.16.0 + jquery 3.4.1 )
- Font-awesome 5.13.0

後端套件

- express 4.17.2
- express-handlebars 6.0.2
- express-session 1.17.2
- mongoose 6.1.3
- method-override 3.0.0
- bcryptjs 2.4.3
- connect-flash 0.1.1
- dotenv 10.0.0
- passport 0.5.2
- passport-facebook 3.0.0
- passport-local 1.0.0

更新時間 : 2021.01.14
