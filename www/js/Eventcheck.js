//remember to include googlemapsapi
var latitude = 48.921
var longitude = 9.222
var timestamp = "2013-11-25T11:00:00-0600"
var postId = '186344561541059';
var txt = new ActiveXObject("Scripting.FileSystemObject");
var emailtxt = txt.CreateTextFile(postId+'.txt', true);
//var i=0;
var organizerID;
var isOrganizer=true;
var parsejson = new Array();
var emailList = new Array();

FB.api('/me/events', function(response) {

    for (var i = 0; i < response.length; i++) {
        id = response[i];
		FB.api(id, lat, longitude, timestamp, function(response){
			from = new google.maps.LatLng(lat, long);
			to   = new google.maps.LatLng(49.321, 8.789);
			dist = google.maps.geometry.spherical.computeDistanceBetween(from, to);	
			if ( Date.parse ( timestamp ) > Date.parse ( start_time ) && Date.parse ( timestamp ) < Date.parse ( end_time )) {
	    		if ( dist <= 5){
				return true
				}
			}
			else{
				return false
			}		
		});
	}
});

FB.api('/' + postId+'/?fields=owner',function(response){
	organizerID = response.id;
});

//boolean check whther he is an organizer
FB.api('me?fields=id', function(response) {
	if(response.id!=organizerID){
		isOrganizer=false;
	}
});


FB.api('/'+postId+'/attending?fields=id', function(response) {
	console.log(response);
	var json = JSON.parse(response);
	while(json.length>0){
		parsejson.push(response.id);
	}
});
parsejson.each(function(){
	var item = $(this);
	FB.api('/'+item, function(response) {
		console.log(response.email);
		emailList.push(response.email);
		emailtxt.WriteLine(response.email+'\n');

	});
});
console.log(emailList);


