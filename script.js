console.log("RiftCoach Interactive UI 🚀");

/* =========================
   CONTAINER
========================= */

const container =
document.getElementById("champion-container");

/* =========================
   SEARCH
========================= */

const searchInput =
document.getElementById("search-input");

/* =========================
   MOBILE MENU
========================= */

const menuToggle =
document.getElementById("menu-toggle");

const navLinks =
document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("show-menu");

});

/* =========================
   FAVORITES
========================= */

let favorites =
JSON.parse(
    localStorage.getItem("favorites")
) || [];

/* =========================
   FALLBACK IMAGE
========================= */

function imageFallback(event){

    event.target.src =
    "assets/fallback.png";

}

/* =========================
   RENDER CHAMPIONS
========================= */

function renderChampions(data){

    container.innerHTML = "";

    data.forEach(champion => {

        let tierClass = "";

        if(champion.tier === "S+"){

            tierClass = "splus";

        }

        else if(champion.tier === "S"){

            tierClass = "s";

        }

        else{

            tierClass = "a";

        }

        const isFavorite =
        favorites.includes(champion.name);

        container.innerHTML += `

            <div class="champion-card hidden">

                <!-- FAVORITE -->

                <div
                    class="favorite-btn"
                    data-name="${champion.name}"
                >
                    ${isFavorite ? "❤️" : "🤍"}
                </div>

                <!-- SPLASH -->

                <img
                    class="champion-splash"
                    src="${champion.image}"
                    alt="${champion.name}"
                    onerror="imageFallback(event)"
                >

                <div class="champion-info">

                    <!-- NAME -->

                    <h3>
                        ${champion.name}
                    </h3>

                    <!-- ROLE -->

                    <div class="role">
                        ${champion.role}
                    </div>

                    <!-- TIER -->

                    <span class="tier ${tierClass}">
                        ${champion.tier} Tier
                    </span>

                    <!-- WINRATE -->

                    <div class="winrate-wrapper">

                        <div class="winrate-label">

                            WR ${champion.winrate}

                        </div>

                        <div class="winrate-bar">

                            <div
                                class="winrate-fill"
                                style="
                                width:${champion.winrate};
                                "
                            >
                            </div>

                        </div>

                    </div>

                    <!-- STATS -->

                    <div class="stats">

                        <span>
                            BR ${champion.banrate}
                        </span>

                    </div>

                    <!-- DESCRIPTION -->

                    <p>
                        ${champion.description}
                    </p>

                    <!-- COUNTER -->

                    <div class="counter-box">

                        Counter:
                        ${champion.counter}

                    </div>

                    <!-- BUILD BUTTON -->

                    <button class="btn secondary build-btn">

                        Ver Build

                    </button>

                    <!-- BUILD CONTENT -->

                    <div class="build-content">

                        <!-- ITEMS -->

                        <div class="build-section">

                            <h4>
                                Items
                            </h4>

                            <div class="icon-row">

                                ${champion.items.map(item => `

                                    <div class="interactive-card">

                                        <img
                                            class="build-icon clickable"
                                            src="${item.image}"
                                            alt="${item.name}"
                                            onerror="imageFallback(event)"
                                        >

                                        <div class="interactive-info">

                                            <h5>
                                                ${item.name}
                                            </h5>

                                            <p>
                                                ${item.description}
                                            </p>

                                        </div>

                                    </div>

                                `).join("")}

                            </div>

                        </div>

                        <!-- RUNES -->

                        <div class="build-section">

                            <h4>
                                Runas
                            </h4>

                            <div class="icon-row">

                                ${champion.runes.map(rune => `

                                    <div class="interactive-card">

                                        <img
                                            class="build-icon clickable"
                                            src="${rune.image}"
                                            alt="${rune.name}"
                                            onerror="imageFallback(event)"
                                        >

                                        <div class="interactive-info">

                                            <h5>
                                                ${rune.name}
                                            </h5>

                                            <p>
                                                ${rune.description}
                                            </p>

                                        </div>

                                    </div>

                                `).join("")}

                            </div>

                        </div>

                        <!-- SPELLS -->

                        <div class="build-section">

                            <h4>
                                Spells
                            </h4>

                            <div class="icon-row">

                                ${champion.spells.map(spell => `

                                    <div class="interactive-card">

                                        <img
                                            class="build-icon clickable"
                                            src="${spell.image}"
                                            alt="${spell.name}"
                                            onerror="imageFallback(event)"
                                        >

                                        <div class="interactive-info">

                                            <h5>
                                                ${spell.name}
                                            </h5>

                                            <p>
                                                ${spell.description}
                                            </p>

                                        </div>

                                    </div>

                                `).join("")}

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
   SEARCH
========================= */

searchInput.addEventListener("input", e => {

    const value =
    e.target.value.toLowerCase();

    const filtered =
    champions.filter(champion =>

        champion.name
        .toLowerCase()
        .includes(value)

    );

    renderChampions(filtered);

});

/* =========================
   FILTERS
========================= */

const filterButtons =
document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        document
        .querySelector(".filter-btn.active")
        .classList.remove("active");

        button.classList.add("active");

        const role =
        button.dataset.role;

        if(role === "all"){

            renderChampions(champions);

        }

        else{

            const filtered =
            champions.filter(champion =>
                champion.role === role
            );

            renderChampions(filtered);

        }

    });

});

/* =========================
   BUILD TOGGLE
========================= */

document.addEventListener("click", e => {

    if(e.target.classList.contains("build-btn")){

        const buildContent =
        e.target.nextElementSibling;

        buildContent.classList.toggle("show-build");

    }

});

/* =========================
   INTERACTIVE INFO
========================= */

document.addEventListener("click", e => {

    if(e.target.classList.contains("clickable")){

        const card =
        e.target.parentElement;

        const info =
        card.querySelector(".interactive-info");

        info.classList.toggle("show-info");

    }

});

/* =========================
   FAVORITES
========================= */

document.addEventListener("click", e => {

    if(e.target.classList.contains("favorite-btn")){

        const championName =
        e.target.dataset.name;

        if(favorites.includes(championName)){

            favorites =
            favorites.filter(name =>
                name !== championName
            );

        }

        else{

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

function initScrollAnimations(){

    const observer =
    new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    });

    const hiddenElements =
    document.querySelectorAll(".hidden");

    hiddenElements.forEach(el => {

        observer.observe(el);

    });

}