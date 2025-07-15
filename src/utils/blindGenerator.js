export function generateBlinds({ smallBlind, bigBlind, growthType, fixedIncrease, levels = 20 }) {
    const blinds = [];

    let sb = smallBlind;
    let bb = bigBlind;

    for (let i = 1; i <= levels; i++) {
        blinds.push({
            level: i,
            small: sb,
            big: bb,
        });

        if (growthType === "double") {
            sb *= 2;
            bb *= 2;
        } else if (growthType === "fixed" && fixedIncrease) {
            sb += fixedIncrease;
            bb += fixedIncrease;
        } else if (growthType === "standard") {
            sb += 50;
            bb += 100;
        }
    }

    return blinds;
}