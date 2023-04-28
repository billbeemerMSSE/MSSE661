(() => {
    const isAuth = getStorage("isAuth");
    if (!isAuth || isAuth === null) {
        // logout();
        alert("You must be logged in to view this page.");
        window.location.href = "index.html";
    }
})();