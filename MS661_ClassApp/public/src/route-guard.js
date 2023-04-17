(() => {
    const isAuth = getStorage("isAuth");
    console.log("isAuth: %s", isAuth);
    if (!isAuth) {
        logout();
        alert("Log in to view your catering list.");
        window.location.href = "/home.html";
    }
})();