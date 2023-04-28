/**
 * Class App Week 8
 * MS 661
 * Bill Beemer
 */
 

const doLogin = async (event) => {
	event.preventDefault();
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	try {
		const response = await login({ email, password });
		if (response.isAuth === false) {
			alert("Failed to Login");
			window.location.href = "index.html";
		} else {
			const { id, isAuth, token } = response;
			setStorage("id", id)
			setStorage("isAuth", isAuth)
			setStorage("token", token);
			window.location.href = "shoot.html";
		}

	} catch (error) {
		alert("Failed to Login");
	}
};

const doRegister = async (event) => {
	event.preventDefault();
	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	const response = await register({
		name,
		email,
		password,
	});
	
	if (response) {
		const { id, isAuth, token } = response;
		setStorage("isAuth", isAuth)
		setStorage("id", id)
		window.location.href = "shoot.html";
	}
};

const doLogout = function(event) {
	event.preventDefault();
	logout();
	window.location.href = "index.html";
};
