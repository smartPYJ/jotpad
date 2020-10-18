

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

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
	} else {
		// document.getElementById('page-top').style.display = 'none';
		swal({
			type: 'error',
			title: 'Login',
			text: "Login to view this page",
			color: "#4e73df",
			icon: "warning"
		}).then((value) => {
			setTimeout(function () {
				window.location.replace("index.html");
			}, 1000)
		});
	}
});

function send_note() {
	if (
		document.getElementById("note").value === "") {

		swal('JOTPAD', 'C`mon , Write something !!',
		).then((value) => {
			setTimeout(function () {

			}, 1000)
		});
	} else {

		var dayObj = {
			0: "Sunday",
			1: "Monday",
			2: "Tuesday",
			3: "Wednesday",
			4: "Thursday",
			5: "Friday",
			6: "Saturday"

		};
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				var userId = firebase.auth().currentUser.uid;
				var d = new Date();
				var h = d.getUTCHours() + 1;
				var m = d.getUTCMinutes();
				var dy = d.getDay();
				var dyy = (dayObj[dy]);
				var datetime = (String(dyy) + ", " + String(h) + ":" + String(m));
				var subject = document.getElementById("note_subject").value;
				var note = document.getElementById("note").value;

				var firebaseRef = firebase.database().ref();
				var notes = {
					Subject: subject,
					Note: note,
					Date: datetime,
				}
				// Create a root reference
				firebaseRef.child("/user/" + userId + '/note/').push().set(notes);
				console.log(notes);
				document.getElementById("note_subject").value = " ";
				document.getElementById("note").value = " ";
				swal('JOTPAD', 'Your note was added  successfully!.',
				).then((value) => {
					setTimeout(function () {

					}, 1000)
				});

			} else {


			}

		});
	}
}


var contents = '';
firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		var userId = firebase.auth().currentUser.uid;
		var urlRef = firebase.database().ref("/user/" + userId + "/note/");

		urlRef.once("value", function (snapshot) {
			snapshot.forEach(function (data) {
				var subject = data.val().Subject;
				var text = data.val().Note;
				var date = data.val().Date;
				// create button to contain subject and date
				const button = document.createElement('button');
				button.classList.add('collapsible');
				button.style.fontWeight = 900;
				button.innerHTML = `${subject}  <span style="float: right;">${date}</span>`;

				// create paragraph to contain content and hide it
				const content = document.createElement('p');
				content.textContent = text;
				content.style.display = 'none';

				// add button and content to notes
				$('#my_notes').append(button);
				$('#my_notes').append(content);

				// add click event listener to button
				button.addEventListener('click', (event) => {
					event.target.classList.toggle('active');
					const content = event.target.nextElementSibling;
					if (content.style.display == 'block') {
						content.style.display = 'none';
					} else {
						content.style.display = 'block';
					}
				});

			});

		});
	}
});

