/*
*
COMMON
*
*/

//DEV: https://localhost:1337; //for development, need another for production
const backendBaseURI = (window.DBHelper) ? DBHelper.DATABASE_URL : 'https://localhost:1337'; 


/*
*
GUI Functionality
*
*/
const tablinks = document.body.querySelectorAll('.tablink');
const tabdivs = document.body.querySelectorAll('.tabcontent');


var tabDict = {};
tablinks.forEach((key, i) => {
  let thisContentDiv = document.body.querySelector(`#${key.name}`);
  tabDict[key.name] =thisContentDiv;
  thisContentDiv.style.display = 'none';
});

var activeTab;


//Add callbacks
tablinks.forEach((iTab) => {
  iTab.addEventListener('click', switchView);
});

//Set Default tab
document.body.querySelector('#defaultTab').click();


function switchView(e) {
  let currentTab = e.currentTarget;
  let tabname = currentTab.name;
  

  if (activeTab && activeTab.name == tabname) return;

  if (activeTab) {
    activeTab.classList.remove('active');
    tabDict[activeTab.name].style.display = 'none';
  }

  currentTab.classList.add('active');
  tabDict[currentTab.name].style.display = 'block';
  activeTab = currentTab;
  

}

/*
*
LOCAL
*
*/

//Set the actions for login and sign up buttons
const loginForm = document.body.querySelector('form#signin');
loginForm.action = `${backendBaseURI}/auth/local`;

const registerForm = document.body.querySelector('form#signup');
registerForm.action = `${backendBaseURI}/auth/register`;
registerForm.onsubmit = createLocalUser;
registerForm.password.onchange = comparePasswords;
registerForm.password2.onchange = comparePasswords;

function createLocalUser(e){
  
  console.log('New Local User Requested');
  //Manually handle the submission and response


  return false;

}

function comparePasswords(){

  const pw1 = registerForm.password;
  const pw2 = registerForm.password2;
  //make sure passwords are the same
  if(pw1.value !== pw2.value) {
    pw2.setCustomValidity("Passwords are not the same");
  } else {
    pw2.setCustomValidity('');
  }
}



/*
*
FACEBOOK
*
*/

const fbButtonList = document.body.querySelectorAll('.btn-login.facebook');


// Initialize the app when loaded
if (window.FB) {
  initializeFB();
} else {
  window.fbAsyncInit = initializeFB;
}

function initializeFB(){
  FB.init(
    {appId: '245576876070392',
    status: false, 
    version: 'v3.1',
    });

  //User clicks the button
  fbButtonList.forEach(btn => btn.addEventListener('click', function() {FB.getLoginStatus(fbSignInAttempt)}));
  
}


// Callback after login attempted
function fbSignInAttempt(logInStatus) {

  let loginOptions = {
    scope: 'public_profile,email',
    return_scope: true
  }

  switch (logInStatus.status) {
    case 'connected':
      sendFBTokenToBackend(logInStatus.authResponse);
      break;

    case 'not_authorized':
      loginOptions.auth_type = 'rerequest';

    case 'unknown':
    default:
      FB.login( function(response) {
        if (response.authResponse) {
          sendFBTokenToBackend(response.authResponse);
        } else {
          console.log('User cancelled login or did not fully authorize');
        }
      }, loginOptions); //add event listener

  }


}

//Send login token to backend
function sendFBTokenToBackend(authResponse) {
  //TEMP Make sure ok
  FB.api('/me', res => {
    if (res.authResponse) console.log(`Hey ${res.name}, I'll let the backend know you're here`);
  })

  //DONT FORGET TO CONFIGURE CORS on the backend
  fetch(`${backendBaseURI}/auth/facebook`, {
    method: 'POST',
    mode: 'cors',
    headers: {'Content-Type': 'application/json; charset=utf-8'},
    body: JSON.stringify({idtoken: authResponse.accessToken})
  }).then(res => res.json()).then( user => {
    //TO DO: Change this to a redirect from the backend
    console.log(`${user.name} (id=${user.id}) has been verified from the backend.`); //user information
  }).catch( err => {
    //if there is an error, let the user know
    //TO DO: Save the authenticated user to the db after we sync again
      console.log(err);
  })


}


/*
*
GOOGLE
*
*/


//Google Library
//https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleauthsignin

const googleBtnList = document.body.querySelectorAll('.btn-login.google');

function googleSignIn(e) {
  console.log('Trying to sign in');
  authInstance = gapi.auth2.getAuthInstance();
  authInstance.signIn().then(user =>{

    //send the user and ID token to the back end
    backendURL = `${backendBaseURI}/auth/google`; //use the id token to validate user on back end

    fetch(backendURL, {
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: JSON.stringify({idtoken: user.getAuthResponse().id_token})
    }).then(res => res.json()).then( user => {
      console.log(`${user.name} (id=${user.id}) has been verified from backend.`); //user
    })
    .catch( err => {
      //if there is an error, let the user know
      //TO DO: Save the authenticated user to the db after we sync again
      console.log(err);
    });
    
    
    
  }).catch(err=>{
    console.log(err);
    console.log(`Sigin in failed: ${err.error}`)
  });

}

function gapiInit() {
  googleBtnList.forEach(btn => btn.addEventListener('click', googleSignIn));
  gapi.load('auth2', function(){
    //Initialize the api
    gapi.auth2.init({
      client_id: '685762170340-57tkpqm1mbfmqjklvkl76uq4nkelv4l5.apps.googleusercontent.com',
    });

  })
  
  console.log('Google API is ready');

}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}


/*
*
LOCAL
*
*/