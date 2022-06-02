async function comment(event) {
    event.preventDefault();

    const comment_text = document.querySelector('textareap[name="comment_body"]');

    const post_id = window.location.toString().split("/")[window.location.toString().split("/").length -1];
}

// Still need to create partial comment handle bar
document.querySelector(".comment_form").addEventListener("submit", comment);