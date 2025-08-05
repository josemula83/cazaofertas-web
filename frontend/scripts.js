const API = "http://localhost:3000";

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("adminSection").style.display = "block";
      } else {
        alert("Login incorrecto");
      }
    });
}

function searchProducts() {
  const category = document.getElementById("category").value;
  fetch(`${API}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category }),
  })
    .then((res) => res.json())
    .then((products) => {
      const results = document.getElementById("results");
      results.innerHTML = "";
      products.forEach((p) => {
        const card = document.createElement("div");
        card.className = "rounded-lg shadow-md border p-4 bg-white hover:shadow-lg transition duration-200";
        card.innerHTML = `
          <img src='${p.image || "https://via.placeholder.com/150"}' alt='${p.title}' class='w-full h-auto mb-2 rounded'>
          <h2 class='font-semibold text-lg mb-2'>${p.title}</h2>
          <a href='${p.url}' target='_blank' class='text-blue-600 hover:underline'>Ver producto</a>
          <p class='text-sm text-gray-600 mt-1'>Categoría: ${p.category} | Descuento: ${p.discount}%</p>
          <button onclick='saveLink("${p.title}", "${p.url}", "${p.category}", ${p.discount})' class='mt-3 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded'>Guardar</button>`;
        results.appendChild(card);
      });
    });
}

function saveLink(title, url, category, discount) {
  fetch(`${API}/save-link`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, url, category, discount }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) alert("Guardado");
    });
}

function loadLinks() {
  fetch(`${API}/public-links`)
    .then((res) => res.json())
    .then((links) => {
      const cat = document.getElementById("filterCategory").value;
      const disc = parseInt(document.getElementById("filterDiscount").value || "0");
      const filtered = links.filter(l => (!cat || l.category.includes(cat)) && l.discount >= disc);

      const container = document.getElementById("linksContainer");
      container.innerHTML = "";
      filtered.forEach((link) => {
        const card = document.createElement("div");
        card.className = "rounded-lg shadow-md border p-4 bg-white hover:shadow-lg transition duration-200";
        card.innerHTML = `
          <img src='${link.image || "https://via.placeholder.com/150"}' alt='${link.title}' class='w-full h-auto mb-2 rounded'>
          <h2 class='font-semibold text-lg mb-2'>${link.title}</h2>
          <a href='${link.url}' target='_blank' class='text-blue-600 hover:underline'>Ver producto</a>
          <p class='text-sm text-gray-600 mt-1'>Categoría: ${link.category} | Descuento: ${link.discount}%</p>`;
        container.appendChild(card);
      });
    });
}
