async function logout() {
    const logoutConfirm = await fetch("api/users/logout", {
        method: "post",
        headers: { "Content-Type": "application/json" }
    });

    if (logoutConfirm.ok) {
        document.location.replace("/");
    } else {
        alert(logoutConfirm.statusText);
    }
}

document.querySelector("#logout").addEventListener("click", logout);