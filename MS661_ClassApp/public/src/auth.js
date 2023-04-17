/**
 * Class App Week 6 
 * MS 661
 * Bill Beemer
 */
 

const doLogin = async (event) => {
	event.preventDefault();
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	const response = await login({ email, password }).catch((error) => {
		alert("Failed to Login");
	});

	const { auth, token } = response;

	setStorage("isAuth", auth)
	setStorage("token", token);

	window.location.href = "shoot.html";

};

const doRegister = async (event) => {
	event.preventDefault();
	const username = document.getElementById("username").value;
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	const response = await register({
		username,
		email,
		password,
	});
	
	if (response) {
		window.location.href = "shoot.html";
	}
};

const doLogout = function(event) {
	event.preventDefault();
	logout();
	window.location.href = "index.html";
};

// (() => {
// 	if (storageHasData()) {
// 		const isAuth = getStorage("isAuth");
// 		// if (!isAuth) {
// 		// 	document.getElementById("logout").style.display = "none";
// 		// } else {
// 		// 	document.getElementById("logout").style.display = "block";
// 		// }
// 	}
// })();

// const doLogin = function(event) {
// 	event.preventDefault();
// 	const username = document.getElementById("username").value;
// 	const password = document.getElementById("password").value;

// 	login({
// 		username: username,
// 		password: password
// 	}).then(function(response) {
// 		window.location.href = "home.html";
// 	})
// };

// const doRegister = function(event) {
// 	event.preventDefault();
// 	const username = document.getElementById("username").value;
// 	const email = document.getElementById("email").value;
// 	const password = document.getElementById("password").value;

// 	register({
// 		username: username,
// 		email: email,
// 		password: password
// 	}).then(function(response) {
// 		window.location.href = "home.html";
// 	})
// };

// const doLogout = function(event) {
// 	event.preventDefault();
// };
 
 		