# line_message_recorder

Developed by **Line Messaging API** + **Google Apps Script**

將BOT加入對話群組，BOT會將群組內的對話、照片等存在Google Drive內。

Google Apps Script: https://developers.google.com/apps-script/
Google Drive: https://www.google.com/intl/zh-TW_ALL/drive/

LINE Developers: https://developers.line.me/en/

## 佈署方式

### LINE Developers新帳號部署步驟

1) 到LINE Developers網站，建立Provider

2) 建立BOT帳號

3) BOT設定
![GITHUB](https://raw.githubusercontent.com/mkbs1419/line_message_recorder/master/PNG/1.png "修改BOT設定")
4) 產生新Token
5) 啟用webhooks
![GITHUB](https://raw.githubusercontent.com/mkbs1419/line_message_recorder/master/PNG/2-1.png "修改BOT設定")
![GITHUB](https://raw.githubusercontent.com/mkbs1419/line_message_recorder/master/PNG/2-2.png "修改BOT設定")
6) 建立試算表，複製文件ID

從 Google Drive裡建立一份Google Sheets，其網址格式為：
```
https://docs.google.com/spreadsheets/d/{試算表ID}/edit#gid=0
```
舉例來說，我的試算表網址為：
```
https://docs.google.com/spreadsheets/d/1Aj9gBDOPLwDuiGR3pHPE1H_wO9ut-u2brc8Z272I123/edit#gid=0
```

則其文件ID為：1Aj9gBDOPLwDuiGR3pHPE1H_wO9ut-u2brc8Z272I123

7) 到GAS程式碼 [message_record.gs]
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
* Verify雖會顯示錯誤，但如果可在試算表看到LINE_DEV的訊息，即代表部署成功

### GAS重新部署

* 每次修改GAS程式碼之後都需要重新發佈網路應用程式，專案版本請修改為[新增]。```