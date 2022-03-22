const ZingMp3 = require("zingmp3-api");

const run = async () => {
    // 6UW98ZW7

    console.log(await ZingMp3.getFullInfo('ZW9CODOA'));
    // console.log(await ZingMp3.search('Bông hoa đẹp nhất'));
}

run();