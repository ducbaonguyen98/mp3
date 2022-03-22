const cloudscraper = require("cloudscraper");

const crypto = require('crypto');


const getHash256 = (a) => {
    return crypto.createHash('sha256').update(a).digest('hex');
}
const getHmac512 = (str, key) => {
    let hmac = crypto.createHmac("sha512", key);
    return hmac.update(Buffer.from(str, 'utf8')).digest("hex");
}

const search = async () => { 
    const id = "ZWBIF86E";
    // const ctime = Math.floor(Date.now() / 1000);
    const ctime = "160718421";
    const hash256 = getHash256(`ctime=${ctime}id=${id}`); 
    const sig = getHmac512("/api/v2/song/get/streaming" + hash256, "10a01dcf33762d3a204cb96429918ff6");
    const result = await cloudscraper.get(`https://zingmp3.vn/api/v2/song/get/streaming?id=${id}&ctime=${ctime}&sig=${sig}&apiKey=38e8643fb0dc04e8d65b99994d3dafff`);
    const data = JSON.parse(result);
    
    console.log(data);
}

// search();

const run = async () => {
    try {
        // http://api.mp3.zing.vn/api/streaming/audio/IW6Z76EI/320

        
        // const id = "ZW9CODOA";
        // const id = "ZW9CODOA";
        const id = "ZWDZCE80";
        const sig = getHmac512("/song/get-song-info" + getHash256(`ctime=160718421id=${id}`), "10a01dcf33762d3a204cb96429918ff6");
        // const sig = getHmac512("/api/v2/song/get/streaming" + getHash256(`ctime=160718421id=${id}`), "10a01dcf33762d3a204cb96429918ff6");
        console.log(sig)
        const result = await cloudscraper.get({
            url: `https://zingmp3.vn/api/song/get-song-info?id=${id}&ctime=160718421&sig=${sig}&api_key=38e8643fb0dc04e8d65b99994d3dafff`, 
            // url: `https://zingmp3.vn/api/v2/song/get/streaming?id=${id}&ctime=160718421&version=1.6.3&sig=${sig}&apiKey=38e8643fb0dc04e8d65b99994d3dafff`
        });

        const data = JSON.parse(result);
    
        console.log(data.data);
    } catch (error) {
        console.log({
            error
        })
    }
}

run();

