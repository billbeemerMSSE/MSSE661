(() => {
    const isAuth = getStorage("isAuth");
    if (!isAuth || isAuth === null) {
        // logout();
        alert("Log in to view your gig list.");
        window.location.href = "index.html";
    }
})();