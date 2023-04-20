(() => {
    const isAuth = getStorage("isAuth");
    console.log("isAuth: %s", isAuth);
    if (!isAuth || isAuth === null) {
        // logout();
        alert("Log in to view your catering list.");
        window.location.href = "index.html";
    }
})();