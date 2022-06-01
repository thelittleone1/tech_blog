async function login(event) {
    event.preventDefault();

    const email = document.querySelector("#email");
    const password = document.querySelector("#password");

    if (email && password) {
        const loginConfirm = await fetch("api/users/login", {
            method: "Post",
            body: JSON.stringify({
                email,
                password
            }),
            headers: { "Content-Type": "application/json" }
        });

        if(response.ok) {
            document.location.reload("/dashboard");
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector(".login_form").addEventListener("submit", login);