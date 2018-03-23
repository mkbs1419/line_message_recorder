# line_message_recorder

Developed by **Line Messaging API** + **Google Apps Script**

將BOT加入對話群組，BOT會將群組內的對話、照片等存在Google Drive內。

|網站說明                |                                              |
|-----------------------|-----------------------------------------------|
|Google Apps Script:    | https://developers.google.com/apps-script/    |
|Google Drive:          | https://www.google.com/intl/zh-TW_ALL/drive/  |
|LINE Developers:       | https://developers.line.me/en/                |

## 佈署方式

### LINE Developers新帳號建立步驟

1) 到LINE Developers網站，建立Provider

2) 建立BOT帳號

3) BOT設定
![GITHUB](https://raw.githubusercontent.com/mkbs1419/line_message_recorder/master/PNG/1.png "修改BOT設定")
4) 產生新Channel Access Token(重要)

5) 啟用webhooks

![GITHUB](https://raw.githubusercontent.com/mkbs1419/line_message_recorder/master/PNG/2-1.png "產生Channel Access Token")

![GITHUB](https://raw.githubusercontent.com/mkbs1419/line_message_recorder/master/PNG/2-2.png "啟用webhooks")

### Google Drive

7) 在Google Drive上建立名為 **[message_record照片資料夾]** 的資料夾，做為照片存檔位置。

6) 建立一份新的Google 試算表，並取得文件ID

![GITHUB](https://raw.githubusercontent.com/mkbs1419/line_message_recorder/master/PNG/4-2.png "試算表格式範例")

接下來要取得試算表的文件ID，Google 試算表的網址格式為：
```
https://docs.google.com/spreadsheets/d/{試算表ID}/edit#gid=0
```
舉例來說，我的試算表網址為：
```
https://docs.google.com/spreadsheets/d/1Aj9gBDOPLwDuiGR3pHPE1H_wO9ut-u2brc8Z272I123/edit#gid=0
```

則其文件ID為：1Aj9gBDOPLwDuiGR3pHPE1H_wO9ut-u2brc8Z272I123

### GAS Code 佈署

7) 在Google Drive上建立GAS程式，並複製 **message_record.js** 內的程式碼

修改部分：[CHANNEL_ACCESS_TOKEN]、[SpreadSheet]
```js
var CHANNEL_ACCESS_TOKEN = "{{YOUR_CHANNEL_ACCESS_TOKEN}}";
var SpreadSheet = SpreadsheetApp.openById("{{YOUR_SPREADSHEETAPP_ID}}");
```

8) 點選 [發佈]→[部署為網路應用程式...]

* 注意事項：專案版本為[新增]
* 具有應用程式存取權的使用者：[任何人，甚至是匿名使用者]
* 第一次需提供授權

9) 複製[網路應用程式網址]

10) 回到LINE Developers，編輯Webhook URL，並點選Verify

* Verify雖會顯示錯誤，因為程式沒有做回應機制，如果可在試算表看到LINE_DEV的訊息，即代表部署成功

## 其它事項

### 照片存檔位置
* 預設為Google Drive下的 **[message_record照片資料夾]** 資料夾，依照 **[西元年-月-日]** 的編碼建立資料夾，並用時間戳做為照片名稱。
* 如果未找到名為 **[message_record照片資料夾]** 的資料夾，照片將會存在Google Drive 的根目錄下。

### GAS重新部署

* 每次修改GAS程式碼之後都需要重新發佈網路應用程式，專案版本請修改為[新增]。```