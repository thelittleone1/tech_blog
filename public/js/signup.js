async function signup(event) {
    event.preventDefault();

    const username = document.querySelector("#username");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");

    if (username && email && password) {
        const signupConfirm = await fetch("/api/users", {
            method: "post",
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            console.log("Account Created!");
            document.location.replace("/dashboard");
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector(".signup_form").addEventListener("submit", signup);