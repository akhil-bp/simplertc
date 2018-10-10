easyrtc.setStreamAcceptor( function(callerEasyrtcid, stream) {
    var video = document.getElementById('caller');
    easyrtc.setVideoObjectSrc(video, stream);
});

 easyrtc.setOnStreamClosed( function (callerEasyrtcid) {
    easyrtc.setVideoObjectSrc(document.getElementById('caller'), "");
});


function my_init() {
    easyrtc.setRoomOccupantListener( loggedInListener);
    console.log(loggedInListener)
    var connectSuccess = function(myId) {
        console.log("My easyrtcid is " + myId);
    }
    var connectFailure = function(errorCode, errText) {
        console.log(errText);
    }
    easyrtc.initMediaSource(
          function(){        // success callback
              var selfVideo = document.getElementById("self");
              easyrtc.setVideoObjectSrc(selfVideo, easyrtc.getLocalStream());
              easyrtc.connect("Company_Chat_Line", connectSuccess, connectFailure);
          },
          connectFailure
    );
 }


function loggedInListener(roomName, otherPeers) {
    var otherClientDiv = document.getElementById('otherClients');
    while (otherClientDiv.hasChildNodes()) {
        otherClientDiv.removeChild(otherClientDiv.lastChild);
    }
    //console.log(otherPeers ,'no')
    function isEmpty(obj) {
        if(Object.keys(obj).length === 0){             
            return true
        }else{
            return false
        }
    }
    if(isEmpty(otherPeers)){        
        var otherClientDiv2 = document.getElementById('no_users_online');
        var tag = document.createElement('p');
        label = document.createTextNode("No users are online");
        tag.appendChild(label);
        otherClientDiv2.appendChild(tag);
    }else{
        
        document.getElementById('no_users_online').style.visibility = 'hidden';
       
        for(var i in otherPeers) {
            
            var button = document.createElement('button');
            button.onclick = function(easyrtcid) {
                return function() {
                    performCall(easyrtcid);
                }
            }(i);
            var br_tag = document.createElement('br');
            var br_tag2 = document.createElement('br');
            label = document.createTextNode(i);
            button.appendChild(label);
            otherClientDiv.appendChild(button);
            otherClientDiv.appendChild(br_tag);
            otherClientDiv.appendChild(br_tag2);
        }
    }    
}


function performCall(easyrtcid) {
    easyrtc.call(
       easyrtcid,
       function(easyrtcid) { console.log("completed call to " + easyrtcid);},
       function(errorCode, errorText) { console.log("err:" + errorText);},
       function(accepted, bywho) {
          console.log((accepted?"accepted":"rejected")+ " by " + bywho);
       }
   );
}
