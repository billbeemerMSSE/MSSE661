(() => {
    const isAuth = getStorage("isAuth");
    if (!isAuth || isAuth === null) {
        // logout();
        alert("Log in to view your catering list.");
        window.location.href = "index.html";
    }
})();