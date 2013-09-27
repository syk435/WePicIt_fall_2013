/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

 // Matt Basta

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function weHaveTheLocation(position) {
    //alert(position.latitude + ' : ' + position.longitude);
    attendee.postPhotos(position)
}

var photos_url = 'https://s3-us-west-2.amazonaws.com/wepicit/index.txt';
var attendee = {
    login: function() {
        FB.login(function(response) {
            if (response.authResponse) {
                alert('Success!');
            }else{
                alert('Login Failed!');
            }
        }, {scope: 'email'});
    },

    findLoc: function(){
        getCurrentPosition()
    },

    postPhotos: function(position) {
        FB.api('/me/events', function(response) {

            for (var i = 0; i < response.length; i++) {
                id = response[i];
                FB.api(id, timestamp, function(response){ 
                    if ( Date.parse ( timestamp ) > Date.parse ( response.start_time ) && Date.parse ( timestamp ) < Date.parse ( response.end_time )) {
                        if (position.latitude < 40.0 && position.longitude > -76.0 && position.latitude > 39.0 && position.longitude < -75.0){
                            // filepicker.pick();
                        }
                        else{
                            alert("Sorry your event is not registered.");
                        } 
                    }   else{
                            alert("Sorry your event is not registered.");
                        }
                });
            }
        });
        if (position.latitude < 40.0 && position.longitude > -76.0 && position.latitude > 39.0 && position.longitude < -75.0){
            filepicker.pick();
        }
    }

    /*viewGallery: function() {
        var gallerybox = document.querySelector('#att_gallery ul');
        var photos = new Array();
        middleHtml = "";
        for (var i = 0; i < 10; i++) {
            var li = document.createElement('li');
            li.innerHTML = '<b>Element #' + i + '</b>';
            gallerybox.appendChild(li);
        }
        $.ajax({ type:'GET', url:photos_url, success: function(data){ console.log(data); } });
        photos = data.split('\n');
        for(var i = 0;i < photos.length; i++){
            middleHtml += '<li><a href="' + photos[i] + '"><img src="' + photos[i] + '" alt="Image "' + i + '" /></a></li>';
        }
    }*/
};

var organizer = {
    login: function(){
        FB.login(function(response) {
            if (response.authResponse) {
                alert('Success!');
            }else{
                alert('Login Failed!');
            }
        }, {scope: 'email'});
    },

    populateGallery: function(){
        var gallerybox = document.querySelector('#org_gallery ul');
        middleHtml = "";
        /*for (var i = 0; i < 10; i++) {
            var li = document.createElement('li');
            li.innerHTML = '<b>Element #' + i + '</b>';
            gallerybox.appendChild(li);
        }*/
        /*$.ajax({ type:'GET', url:photos_url, success: function(data){ console.log(data); } });
        photos = data.split('\n');
        for(var i = 0;i < photos.length; i++){
            middleHtml += '<li><a href="' + photos[i] + '"><img src="' + photos[i] + '" alt="Image "' + i + '" /></a></li>';
        }*/
    },

    postGallery: function(){

    }
};

var currentCard = 0;
function switchMode() {
    currentCard++;
    currentCard %= 2;
    document.querySelector('x-deck').shuffleTo(currentCard);
}
 
/*
var button2 = {
    myFunction: function() {
        FB.login(function(response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function(response) {
                    console.log('Good to see you, ' + response.name + '.');
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });
    }  
};*/
