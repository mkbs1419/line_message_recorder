# line_message_recorder

需搭配Google Drive使用。

Google Drive: https://www.google.com/intl/zh-TW_ALL/drive/
LINE Developers: https://developers.line.me/en/

## LINE Developers新帳號部署步驟

1) 到LINE Developers網站，建立Provider
2) 建立BOT帳號


3) 修改BOT設定
4) 產生新Token
5) 啟用webhooks
undefinedundefined6) 建立試算表，複製文件ID
EX： https://docs.google.com/spreadsheets/d/1Aj9gBDOPLwDuiGR3pHPE1H_wO9ut-u2brc8Z272IiP8/edit#gid=0
其文件ID為：1Aj9gBDOPLwDuiGR3pHPE1H_wO9ut-u2brc8Z272IiP8
7) 到GAS程式碼 [message_record.gs]
修改部分：[CHANNEL_ACCESS_TOKEN]、[SpreadSheet]
8) 點選 [發佈]→[部署為網路應用程式...]
*注意事項：專案版本為[新增]
*具有應用程式存取權的使用者：[任何人，甚至是匿名使用者]
*第一次需提供授權
undefined9) 複製[網路應用程式網址]
10) 回到LINE Developers，編輯Webhook URL，並點選Verify
*Verify雖會顯示錯誤，但如果可在試算表看到LINE_DEV的訊息，即代表部署成功
undefinedundefined
GAS重新部署

每次修改GAS程式碼之後都需要重新發佈網路應用程式，專案版本請修改為[新增]。
