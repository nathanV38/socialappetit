function fb_register() {
    FB.login(function(response) {
        if (response.authResponse) {
            // connected
            var access_token =   FB.getAuthResponse()['accessToken'];
            registerAPI(access_token);
        } else {
            // cancelled
        }
    }, {scope:'email,publish_actions,user_birthday'});
};

function fb_login() {
   console.log('log');
   //on test si deja connecte a FB
   FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            console.log('logOK');
             var access_token =   FB.getAuthResponse()['accessToken'];
             var fbId = FB.getAuthResponse()['userID'];
                $.ajax({
                    type: "POST",
                    url: "include/ajax/login_fb.php",
                    data: { fbId: fbId, token:access_token}
                }).done(function (e) {
                    if(e=='ok') document.location.href="index.php";
                    else {
                        alert('pas de compte FB');
                    }
                });               
              }  else if (response.status === 'not_authorized') {
            console.log('pas auth');
                    //si pas connecte ou pas authorise, j essaie de le connecter
                 FB.login(function(response) {
                    if (response.authResponse) {
                        // connected
                        console.log(response);
                        var access_token =   FB.getAuthResponse()['accessToken'];
                        FB.api('/me', function(response_me) {
                           $.ajax({
                                type: "POST",
                                url: "include/ajax/login_fb.php",
                                data: { fbId: response_me.id,  email:response_me.email, token:access_token, auth:'0'}
                            }).done(function (e) {
                                if(e=='ok') document.location.href="index.php";
                                else  alert('pas de compte FB');
                            });
                        });
                    } else { console.log('login nok'); }
                    }, {scope:'email,publish_actions,user_birthday'} );
     } else { console.log('non loggé');
        FB.login(function(response) {
                    if (response.authResponse) {
                        // connected
                        console.log(response);
                        var access_token =   FB.getAuthResponse()['accessToken'];
                        FB.api('/me', function(response_me) {
                           $.ajax({
                                type: "POST",
                                url: "include/ajax/login_fb.php",
                                data: { fbId: response_me.id,  email:response_me.email, token:access_token, auth:'0'}
                            }).done(function (e) {
                                if(e=='ok') document.location.href="index.php";
                                 else  alert('pas de compte FB');
                            });
                        });
                    } else { console.log('login nok'); }
                    }, {scope:'email,publish_actions,user_birthday'} );
      }
    });
};

/*
function fb_testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log('Good to see you, ' + response.name + '.');
        console.log(response);
    });
};*/

function registerAPI(token) {
     FB.api('/me', function(response) {
        console.log(response);
        //console.log(response.birthday);
        $.ajax({
                type: "POST",
                url: "include/ajax/signup.php",
                data: { fbId: response.id, prenom:response.first_name, nom:response.last_name , email:response.email, sexe:response.gender, token:token, naissance:response.birthday}
            }).done(function (e) {
                if(e=='ok') document.location.href="index.php";
            });
    });
}


