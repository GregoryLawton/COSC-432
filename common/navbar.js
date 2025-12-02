document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.createElement("nav");
  navbar.classList.add("navbar");

  const logo = document.createElement("h1");
  logo.textContent = "OCA"; 
  navbar.appendChild(logo);

  document.body.insertBefore(navbar, document.body.firstChild);
});

function sendMessageToGPT(userText) {
  fetch("http://127.0.0.1:8000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userText })
  })
  .then(res => res.json())
  .then(data => {
    const chatHistory = document.getElementById("chatHistory");
    const ocaMessage = document.createElement("p");
    ocaMessage.textContent = "OCA: " + data.reply;
    ocaMessage.classList.add("oca-msg");
    chatHistory.appendChild(ocaMessage);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  })
  .catch(err => console.error(err));
}
