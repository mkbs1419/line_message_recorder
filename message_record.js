//LINE BOT TOKEN
var CHANNEL_ACCESS_TOKEN = "{{YOUR_CHANNEL_ACCESS_TOKEN}}";
//指定試算表
var SpreadSheet = SpreadsheetApp.openById("{{YOUR_SPREADSHEETAPP_ID}}");

//抓取IP位置
function doGet(e) {
  return ContentService.createTextOutput(UrlFetchApp.fetch("http://ip-api.com/json"));
}

//處理Line server傳進來訊息
function doPost(e) {

  var events = JSON.parse(e.postData.contents).events[0];
  var reply_token = events.replyToken;

  if (typeof reply_token === 'undefined')
    return;
  
  retMsg = ProcMsg(events);
  console.log(retMsg);

  return ContentService.createTextOutput(JSON.stringify({ 'content': 'post ok' })).setMimeType(ContentService.MimeType.JSON);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ProcMsg(events) {
  var massage_time = UNIXToTime(events.timestamp);
  var userName = getprofile (events.source.userId);
  var massage_type = events.message.type;
  var massage_text = events.message.text;
  if (typeof massage_text === 'undefined'){
    massage_text = events.message.type;
  }
  var retMsg;

  switch (massage_type) {
    case 'text':
      retMsg = massage_text;
      writesheet (massage_time, userName, massage_type, retMsg);
      break;

    case 'image':    
      var blob = getImg(events.message.id);
      var upload_result = driveUPLOAD(blob, massage_time);  //上傳到Google Drive
      var file = upload_result[1]
      
      file.setName(getTimeStamp());
      
      var fileNAME = file.getName()
      var fileID = file.getId()
      var fileURL = file.getUrl()

      retMsg = 'file: ' + fileNAME + '： ' + fileURL;
      writesheet (massage_time, userName, massage_type, retMsg);
      break;

    case 'sticker':
      retMsg = 'packageId: ' + events.message.packageId + ', stickerId: ' + events.message.stickerId;
      writesheet (massage_time, userName, massage_type, retMsg);
      break;
  }
  return retMsg;
}

//
function UNIXToTime (input) {
  var dt = new Date(input);
  Y = dt.getFullYear() + '-';
  M = (dt.getMonth()+1 < 10 ? '0'+(dt.getMonth()+1) : dt.getMonth()+1) + '-';
  D = dt.getDate() + ' ';
  h = dt.getHours() + ':';
  m = dt.getMinutes() + ':';
  s = dt.getSeconds(); 
  return Y+M+D+h+m+s;
}

function getTimeStamp () {
  var d = new Date();
  h = d.getHours();
  m = d.getMinutes();
  s = d.getSeconds(); 
  h = ("0" + h).slice(-2);
  m = ("0" + m).slice(-2);
  s = ("0" + s).slice(-2);
  return h+m+s;
}

function getImg (msgID) {
  var url = 'https://api.line.me/v2/bot/message/' + msgID + '/content';
  var header = {
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
  }
  var options = {
    'headers': header,
    'method': 'GET'
  }
  var response = UrlFetchApp.fetch(url, options);
  var content_type = response.getAllHeaders()["Content-Type"]
  var blob = response.getAs(content_type) //EX: image/png
  return blob;
}

function driveUPLOAD (blob, massage_time) {
  try {
    var parentFolderName = "message_record照片資料夾";
    var parentFolders = DriveApp.getFoldersByName(parentFolderName);
    var parentFolder;
    
    //由於可能有同名稱的資料夾，這邊做預設處理
    if (parentFolders.hasNext())
    { parentFolder = parentFolders.next(); }
    else //如果資料夾不存在就自動建立
    { parentFolder = DriveApp.createFolder(parentFolderName); }

    //處理檔案寫入工作
    if (blob != 'undefined') {
      splitmessage = massage_time.split(" ");
      var subFolderName = splitmessage[0];
      var subFolders = parentFolder.getFoldersByName(subFolderName);
      var subFolder;
      
      //由於可能有同名稱的資料夾，這邊做預設處理
      if (subFolders.hasNext())
      { subFolder = subFolders.next(); }
      else //如果資料夾不存在就自動建立子資料夾
      { subFolder = parentFolder.createFolder(subFolderName); }
      
      //寫入資料
      var file = subFolder.createFile(blob);
    }
    return ['圖片訊息上傳成功。', file];
  }
  catch (error)
  { 
    return "Upload failed! Reason: " + error.toString();
  }
}

function getprofile (UID) {
  var header = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
  }
  var options = {
    'headers': header,
  }
  url_profile = "https://api.line.me/v2/bot/profile/" + UID
  
  try {
    var response = UrlFetchApp.fetch(url_profile, options);
    var rJSON = JSON.parse(response);
    return rJSON.displayName;
  } catch (e) {
    return 'LINE_DEV';
  }
}

function writesheet (massage_time, userName, massage_type, massage_text) {
  var Sheet = SpreadSheet.getSheetByName("工作表1");
  var LastRow = Sheet.getLastRow();
  
  //--開始寫入資料--
  Sheet.getRange(LastRow+1, 1).setValue(massage_time);
  Sheet.getRange(LastRow+1, 2).setValue(userName);
  Sheet.getRange(LastRow+1, 3).setValue(massage_type);
  Sheet.getRange(LastRow+1, 4).setValue(massage_text);
}