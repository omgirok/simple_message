
function serialize(obj, prefix) {
  var str = [];
  for(var p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push(typeof v == "object" ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}

function get(url, data, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      //console.log("GET request success!");
      callback(JSON.parse(xhttp.responseText));
    }
  };
  //xhttp.open("GET", url + ((Object.keys(data).length > 0) ? "?" : "" ) + serialize(data), true);
  xhttp.open("GET", url, true);
  xhttp.send();
}

function post(url, data, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      callback(JSON.parse(xhttp.responseText));
    }
  };
  
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(serialize(data));
}

function sendMessage() {
  // post function here
  
  id = this.id;
  var msgField = document.getElementById('user_'+id);
  var msg = msgField.value;

  console.log('sending the msg: ' + msg + ', to user_id: ' + id);
  post('/messages/send', {"user_id": id, "message": msg}, 
    function(data) {
      if (data.success) {
        msgField.value = '';
        writeMessageClient(id, msg);
      }
      else {
        console.log(data.error);
      }
    });
}

function pullChatHistory(user_id) {
  get("/messages/history/" + user_id, {}, function(data) {
    if (data.success) { 
      console.log('was success');
      console.log(data);
      writeMessages(user_id, data.messages);
      // console.log(msgs);
      // return msgs;
    } 
    else {
      console.log("data was empty?");
      // setTimeout(pullChatHistory, 10000);
    }
  });
}

function writeMessages(id, msgs) {
  console.log("begin writing msgs:");
  console.log(msgs);
  var parent = document.getElementById('history_user_' + id);
  for(var x of msgs) {
    var ele = document.createElement('p');
    var timeformat = x.time.slice(0,-3);
    var line = document.createTextNode('[' + timeformat + '] - ' + x.message);
    ele.appendChild(line);
    parent.appendChild(ele);
  }
}

function timestamp() {
  date = new Date();
  var hour = date.getHours().toString() - 12;
  var min = date.getMinutes().toString();
  var sec = date.getSeconds().toString();
  time = hour + ':' + min + ':' + sec;
  return time;
}

function writeMessageClient(id, msgs) {
  console.log("begin writing msgs:");
  console.log(msgs);
  var time = timestamp();
  var parent = document.getElementById('history_user_' + id);
  var ele = document.createElement('p');
  var line = document.createTextNode('[' + time + '] - ' + msgs);
  ele.appendChild(line);
  parent.appendChild(ele);
}

function initElems() { 
  var txt = document.getElementsByClassName('send-btn');
  var msg = document.getElementsByClassName('message');
  for (var i = 0; i < txt.length; i++) {
    txt[i].setAttribute('id', + i);
  }
  for (var i = 0; i < msg.length; i++) {
    msg[i].setAttribute('id', 'user_' + i);
  }

}
function initEvents() {
  var submits = document.getElementsByClassName('send-btn');
  for (var i = 0; i < submits.length; i ++) {
    submits[i].addEventListener("click", sendMessage);
  }

}

window.onload = function() {
  console.log('1. pullChatHistory(0)');
  pullChatHistory(0);
  console.log('2. pullChatHistory(1)');
  pullChatHistory(1);
  console.log('initializing elements with attributes');
  initElems();
  console.log('initializing elements with eventhandlers');
  initEvents();

}
// writeMessages(toWrite);

/*
  1. initialize [send] button with user id
  2. addeventlistener to [send] button with onclick to send message

*/

