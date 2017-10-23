 function sendAPIData(url,data){
	var USERNAME = 'arm';
	var PASSWORD = '@rm1k0y1l@g0s';
    $.ajax({
        url: 'https://api.arm.com.ng/Pdiv/'+url,
        type: 'POST',
        dataType: 'json',
         xhrFields: {
            withCredentials: true
        },
        headers: {
        	"Content-Type":"application/json",
        	"Accept": "application/json",
            "Access-Control-Allow-Origin": "https://127.0.0.1",
            "Access-Control-Allow-Credentials": "true",
	    	"Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD)
	  	},
        data:"{\"Username\":\"zinoadidi@gmail.com\",\"Password\":\"champain\"}",
        success: function (result) {
            console.log(result);
        },
        error: function (result) {
            console.log(result);
        }
    });   

}