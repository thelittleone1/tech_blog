async function addPost() {
    event.preventDefault();

    const title = document.querySelector("input[name='post-title']").value;
    const post_text = document.querySelector("textarea[name='post_text]").value;

    const newPostConfirm = await fetch("api/posts", {
        method: "Post",
        body: JSON.stringify({
            title,
            post_text
        }),
        headers: {
            "Content Type": "application/json"
        }
    });

    if (response.ok) {
        document.location.replace("/dashboard/");
    } else {
        alert(response.statusText);
    }
}

document.querySelector(".new_post_form").addEventListener("submit", addPost);