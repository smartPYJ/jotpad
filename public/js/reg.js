// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDmxu64lDa3rUZNkrKMXYN4sJN28zdfQM0",
    authDomain: "jotpada.firebaseapp.com",
    databaseURL: "https://jotpada.firebaseio.com",
    projectId: "jotpada",
    storageBucket: "jotpada.appspot.com",
    messagingSenderId: "991137459253",
    appId: "1:991137459253:web:391993e979ffb2f1f8557c",
    measurementId: "G-YHHB393PJ3"
  };

  firebase.initializeApp(firebaseConfig);
firebase.analytics();


function signup(){
  var email =  document.getElementById("email").value;
   var password= document.getElementById("password").value ;

    firebase.auth().createUserWithEmailAndPassword(email, password).then((success) => {
        var user = firebase.auth().currentUser;
        var uid;
        if (user != null) {
            uid = user.uid;
        }

        var firebaseRef = firebase.database().ref();
        var userData = {
            userEmail:email,
          
        }
        firebaseRef.child("/user/" + uid + '/profile/').set(userData)
        document.getElementById("password").value = "";
        document.getElementById("email").value = "";

        swal({
            type: 'success',
            title: 'Account Created',
            text: "Your account was created successfully, Login ",
            timer: 2000,
            button: false,
        }
        ).then((value) => {
            setTimeout(function () {
                window.location.replace("note.html");
            }, 1000)
        });
    }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        swal({
            type: 'error',
            title: 'Error',
            text: errorMessage,
        })
    });
}


function signin() {
    var email =  document.getElementById("email").value;
    var password= document.getElementById("password").value ;

    firebase.auth().signInWithEmailAndPassword(email,password).then((success) => {
        swal({
            type: 'successfull',
            title: 'Succesfully signed in',
            icon: "success",
            timer: 2000,
            button: false,
        }).then((value) => {
            setTimeout(function () {
                window.location.replace("note.html");
            }, 1000)
        });
    }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        swal({
            type: 'error',
            title: 'Login',
            text: errorMessage,
        })
    });

}
