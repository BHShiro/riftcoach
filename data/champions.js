let champions = [];

/* =========================
   LOAD CHAMPIONS
========================= */

async function loadChampions(){

    try{

        const response =
        await fetch(
            "https://ddragon.leagueoflegends.com/cdn/14.10.1/data/en_US/champion.json"
        );

        const data =
        await response.json();

        const allChampions =
        Object.values(data.data);

        champions =
        allChampions.map(champion => {

            return {

                name: champion.name,

                role: getRandomRole(),

                tier: getRandomTier(),

                counter: "Desconocido",

                winrate:
                `${50 + Math.floor(Math.random()*6)}%`,

                banrate:
                `${5 + Math.floor(Math.random()*20)}%`,

                description:
                champion.title,

                image:
                `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`,

                items: [

                    items.infinityEdge ||
                    items.blackCleaver,

                    items.guardianAngel,

                    items.boots

                ],

                runes: [

                    runes.conqueror,

                    runes.brutal,

                    runes.boneplating,

                    runes.sweettooth

                ],

                spells: [

                    spells.flash,

                    spells.ignite ||
                    spells.heal

                ]

            };

        });

        /* =========================
           RENDER
        ========================= */

        renderChampions(champions);

    }

    catch(error){

        console.error(
            "Error cargando campeones:",
            error
        );

    }

}

/* =========================
   RANDOM ROLE
========================= */

function getRandomRole(){

    const roles = [

        "Top",
        "Jungle",
        "Mid",
        "ADC",
        "Support"

    ];

    return roles[
        Math.floor(Math.random()*roles.length)
    ];

}

/* =========================
   RANDOM TIER
========================= */

function getRandomTier(){

    const tiers = [

        "S+",
        "S",
        "A"

    ];

    return tiers[
        Math.floor(Math.random()*tiers.length)
    ];

}

/* =========================
   START
========================= */

loadChampions();