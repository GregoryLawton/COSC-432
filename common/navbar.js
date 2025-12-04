document.addEventListener("DOMContentLoaded", function () {

  const navbar = document.createElement("nav");
  navbar.classList.add("navbar");
  navbar.setAttribute("role", "navigation");
  navbar.setAttribute("aria-label","Main navigation");

  const logo = document.createElement("div");
  logo.classList.add("navbar-logo");
  logo.textContent = "OCA";

  const navLinks = document.createElement("ul");
  navLinks.classList.add("navbar-links");

  const links = [
    {name: "Home", href: "#" },
    {name: "About", href: "#about" },
    {name: "Services", href: "#services" },
    {name: "Contact", href: "#Contact"},
  ];

  links.forEach(link =>{
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.textContent = link.name;
    a.href = link.href;
    a.classList.add("navbar-link");

    li.appendChild(a);
    navLinks.appendChild(li);
  });

  const userInfo = document.createElement("div");
  userInfo.classList.add("navbar-user-info");
  userInfo.id = "userInfo";

  navbar.appendChild(logo);
  navbar.appendChild(navLinks);
  navbar.appendChild(userInfo);

  document.body.prepend(navbar);

  if (typeof firebase !== 'undefined' && firebase.auth) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userName = document.createElement("span");
        userName.classList.add("user-name");
        userName.textContent = user.displayName || user.email;

        const logoutButton = document.createElement("button");
        logoutButton.classList.add("logout-button");
        logoutButton.textContent = "Logout";
        logoutButton.onclick = async () => {
          await firebase.auth().signOut();
          window.location.href = 'login.html';
        };

        userInfo.appendChild(userName);
        userInfo.appendChild(logoutButton);
      }
    });
  }
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
