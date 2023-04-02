/**
 * Class App Week 4 
 * MS 661
 * Bill Beemer
 */
 
const doLogin = function(event) {
	event.preventDefault();
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	login({
		username: username,
		password: password
	}).then(function(response) {
		window.location.href = "home.html";
	})
};

const doRegister = function(event) {
	event.preventDefault();
	const username = document.getElementById("username").value;
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	register({
		username: username,
		email: email,
		password: password
	}).then(function(response) {
		window.location.href = "home.html";
	})
};

const doLogout = function(event) {
	event.preventDefault();
};
 
 		