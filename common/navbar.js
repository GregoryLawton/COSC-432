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

  navbar.appendChild(logo);
  navbar.appendChild(navLinks);

  document.body.prepend(navbar);
});
