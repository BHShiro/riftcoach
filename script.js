console.log("RiftCoach Interactive UI 🚀");

/* =========================
   ELEMENTS
========================= */

const container = document.getElementById("champion-container");
const searchInput = document.getElementById("search-input");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

/* =========================
   MOBILE MENU
========================= */

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show-menu");
});

/* =========================
   FAVORITES
========================= */

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

/* =========================
   FALLBACK IMAGE
========================= */

function imageFallback(event) {
    event.target.src = "assets/fallback.png";
}

/* =========================
   RENDER CHAMPIONS
========================= */

function renderChampions(data) {
    container.innerHTML = "";

    data.forEach(champion => {

        let tierClass = "a";

        if (champion.tier === "S+") tierClass = "splus";
        else if (champion.tier === "S") tierClass = "s";

        const isFavorite = favorites.includes(champion.name);

        container.innerHTML += `
            <div class="champion-card hidden">

                <div class="favorite-btn" data-name="${champion.name}">
                    ${isFavorite ? "❤️" : "🤍"}
                </div>

                <img
                    class="champion-splash"
                    src="${champion.image}"
                    alt="${champion.name}"
                    onerror="imageFallback(event)"
                >

                <div class="champion-info">

                    <h3>${champion.name}</h3>

                    <div class="role">${champion.role}</div>

                    <span class="tier ${tierClass}">
                        ${champion.tier} Tier
                    </span>

                    <div class="winrate-wrapper">

                        <div class="winrate-label">
                            WR ${champion.winrate}
                        </div>

                        <div class="winrate-bar">
                            <div
                                class="winrate-fill"
                                style="width:${champion.winrate};"
                            ></div>
                        </div>

                    </div>

                    <div class="stats">
                        <span>BR ${champion.banrate}</span>
                    </div>

                    <p>${champion.description}</p>

                    <div class="counter-box">
                        Counter: ${champion.counter}
                    </div>

                    <button class="btn secondary build-btn">
                        Ver Build
                    </button>

                    <div class="build-content">

                        <div class="build-section">
                            <h4>Items</h4>
                            <div class="icon-row">
                                ${renderIcons(champion.items)}
                            </div>
                        </div>

                        <div class="build-section">
                            <h4>Runas</h4>
                            <div class="icon-row">
                                ${renderIcons(champion.runes)}
                            </div>
                        </div>

                        <div class="build-section">
                            <h4>Spells</h4>
                            <div class="icon-row">
                                ${renderIcons(champion.spells)}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        `;
    });

    initScrollAnimations();
}

/* =========================
   ICON RENDER
========================= */

function renderIcons(list) {
    return list.map(item => `
        <div class="interactive-card">

            <img
                class="build-icon clickable"
                src="${item.image}"
                alt="${item.name}"
                onerror="imageFallback(event)"
            >

            <div class="interactive-info">
                <h5>${item.name}</h5>
                <p>${item.description}</p>
            </div>

        </div>
    `).join("");
}

/* =========================
   SEARCH
========================= */

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();

    const filtered = champions.filter(champion =>
        champion.name.toLowerCase().includes(value)
    );

    renderChampions(filtered);
});

/* =========================
   FILTERS
========================= */

document.querySelectorAll(".filter-btn").forEach(button => {

    button.addEventListener("click", () => {

        document
            .querySelector(".filter-btn.active")
            .classList.remove("active");

        button.classList.add("active");

        const role = button.dataset.role;

        if (role === "all") {
            renderChampions(champions);
        } else {
            renderChampions(
                champions.filter(c => c.role === role)
            );
        }
    });
});

/* =========================
   GLOBAL CLICK EVENTS
========================= */

document.addEventListener("click", e => {

    if (e.target.classList.contains("build-btn")) {
        e.target.nextElementSibling.classList.toggle("show-build");
    }

    if (e.target.classList.contains("clickable")) {
        e.target.parentElement
            .querySelector(".interactive-info")
            .classList.toggle("show-info");
    }

    if (e.target.classList.contains("favorite-btn")) {

        const championName = e.target.dataset.name;

        if (favorites.includes(championName)) {
            favorites = favorites.filter(name => name !== championName);
        } else {
            favorites.push(championName);
        }

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );

        renderChampions(champions);
    }
});

/* =========================
   SCROLL ANIMATION
========================= */

function initScrollAnimations() {

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    });

    document.querySelectorAll(".hidden").forEach(el => {
        observer.observe(el);
    });
}

/* =========================
   INIT
========================= */

renderChampions(champions);