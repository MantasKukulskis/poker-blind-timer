export function generateBlinds({ smallBlind, bigBlind, growthType, fixedIncrease, levels = 20 }) {
    const blinds = [];

    let sb = smallBlind;
    let bb = bigBlind;

    for (let i = 1; i <= levels; i++) {
        blinds.push({
            level: i,
            smallBlind: sb,  // 👈 čia pervadinta
            bigBlind: bb,    // 👈 čia pervadinta
        });

        if (growthType === "double") {
            sb *= 2;
            bb *= 2;
        } else if (growthType === "fixed" && fixedIncrease) {
            sb += fixedIncrease;
            bb += fixedIncrease;
        }
    }

    return blinds;
}