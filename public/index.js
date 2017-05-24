// TODO: delete id's out of redis server
// TODO: make sure random id generated is not already in use

const Peer = require('simple-peer');

var peer;
var id = 0;

if (location.hash === "#init") {
  document.getElementById('joinChannel').style = "display: none";
  document.getElementById('createChannel').addEventListener('click', function() {
    peer = new Peer({
      initiator: location.hash === "#init",
      trickle: false
    });

    do_connection();
  })
} else {
  document.getElementById('createChannel').style = "display: none";
  peer = new Peer({
    initiator: location.hash === "#init",
    trickle: false
  });

  do_connection();
}



function do_connection() {

  peer.on('signal', function(data) {
    if (peer.initiator) {
      var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
      xmlhttp.open("POST", "http://127.0.0.1:3000/create");
      xmlhttp.setRequestHeader("Content-Type", "application/json");
      xmlhttp.send(JSON.stringify(data));
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4) {
          id = xmlhttp.responseText;
          alert('Share this key with a friend: ' + id);
          document.getElementById('yourId').value = JSON.stringify(data);
          // alert('Send this id to someone else to join your room: ' + xmlhttp.responseText); //Outputs a DOMString by default
        }
      }
    } else {
      document.getElementById('yourId').value = JSON.stringify(data);

      var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
      xmlhttp.open("POST", "http://127.0.0.1:3000/local_answer/" + id + "_answer");
      xmlhttp.setRequestHeader("Content-Type", "application/json");
      xmlhttp.send(JSON.stringify(data));
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4) {
          // id = xmlhttp.responseText;
          // document.getElementById('yourId').value = xmlhttp.responseText;
          // alert('Send this id to someone else to join your room: ' + xmlhttp.responseText); //Outputs a DOMString by default
        }
      }
    }
  });

  document.getElementById('connect').addEventListener('click', function() {
    if (!peer.initiator) {
      let otherId = document.getElementById('joinChannel').value;
      id = otherId;
      var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
      xmlhttp.open("GET", "http://127.0.0.1:3000/receive_offer/"+otherId);
      xmlhttp.send();
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4) {
          document.getElementById('otherId').value = xmlhttp.responseText;
          peer.signal(xmlhttp.responseText);
          // alert('Send this id to someone else to join your room: ' + xmlhttp.responseText); //Outputs a DOMString by default
        }
      }
    } else {
      poll_on_server();
      // let otherId = JSON.parse(document.getElementById('otherId').value);
      // peer.signal(otherId);
    }
    
  function poll_on_server() {
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    xmlhttp.open("GET", "http://127.0.0.1:3000/receive_answer/" + id + "_answer");
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
        // var offerDesc = new RTCSessionDescription(JSON.parse(xmlhttp.responseText))
        if (xmlhttp.responseText === document.getElementById('yourId').value) {
          setTimeout(poll_on_server, 5000);
        } else {
          document.getElementById('otherId').value = xmlhttp.responseText;
          let otherId = JSON.parse(document.getElementById('otherId').value);
          peer.signal(otherId);
        }
      }
    }
  }

    // id = otherId;
    // var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    // xmlhttp.open("GET", "http://127.0.0.1:3000/receive_offer/"+id);
    // xmlhttp.send();
    // xmlhttp.onreadystatechange = function() {
    //   if (xmlhttp.readyState === 4) {
    //     id = xmlhttp.responseText;
    //     document.getElementById('otherId').value = xmlhttp.responseText;
        
    //     peer.signal(JSON.parse(xmlhttp.responseText));
    //     // alert('Send this id to someone else to join your room: ' + xmlhttp.responseText); //Outputs a DOMString by default
    //   }
    // }
  });

  document.getElementById('send').addEventListener('click', function() {
    let yourMessage = document.getElementById('yourMessage').value;
    peer.send(yourMessage);
  });

  peer.on('data', function(data) {
    document.getElementById('messages').textContent += data + '\n';
  });

}
