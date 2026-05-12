let champions = [];

const wildRiftChampions = [
    "Ahri","Akali","Alistar","Amumu","Annie","Ashe","AurelionSol",
    "Blitzcrank","Brand","Braum","Caitlyn","Camille","Darius","Diana",
    "Draven","Ekko","Ezreal","Fiora","Fizz","Galio","Garen","Gragas",
    "Graves","Irelia","Janna","JarvanIV","Jax","Jayce","Jhin","Jinx",
    "KaiSa","Karma","Kassadin","Katarina","Kayle","Kennen","KhaZix",
    "LeeSin","Leona","Lucian","Lulu","Lux","Malphite","MasterYi",
    "MissFortune","Morgana","Nami","Nasus","Nautilus","Olaf","Orianna",
    "Pantheon","Pyke","Rakan","Rammus","Renekton","Rengar","Riven",
    "Senna","Seraphine","Sett","Shen","Shyvana","Sion","Sona","Soraka",
    "Teemo","Thresh","Tristana","Tryndamere","TwistedFate","Varus",
    "Vayne","Veigar","Vi","Wukong","Xayah","Yasuo","Yone","Yuumi",
    "Zed","Ziggs"
];

async function loadChampions() {

    try {

        const response = await fetch(
            "https://ddragon.leagueoflegends.com/cdn/14.10.1/data/en_US/champion.json"
        );

        const data = await response.json();

        const allChampions = Object.values(data.data);

        const filtered = allChampions.filter(champion =>
            wildRiftChampions.includes(champion.id)
        );

        champions = filtered.map(champion => ({
            name: champion.name,
            role: getRandomRole(),
            tier: getRandomTier(),
            counter: "Pendiente",
            winrate: `${50 + Math.floor(Math.random() * 6)}%`,
            banrate: `${5 + Math.floor(Math.random() * 20)}%`,
            description: champion.title,
            image: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`,
            items: [
                items.infinityEdge || items.blackCleaver,
                items.guardianAngel,
                items.boots
            ],
            runes: [
                runes.conqueror,
                runes.brutal,
                runes.boneplating
            ],
            spells: [
                spells.flash,
                spells.ignite || spells.heal
            ]
        }));

        renderChampions(champions);

    } catch (error) {
        console.error("Error cargando campeones:", error);
    }
}

function getRandomRole() {
    const roles = ["Top","Jungle","Mid","ADC","Support"];
    return roles[Math.floor(Math.random() * roles.length)];
}

function getRandomTier() {
    const tiers = ["S+","S","A"];
    return tiers[Math.floor(Math.random() * tiers.length)];
}

loadChampions();