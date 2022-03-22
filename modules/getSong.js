const cloudscraper = require("cloudscraper");

const crypto = require('crypto');


const getHash256 = (a) => {
    return crypto.createHash('sha256').update(a).digest('hex');
}
const getHmac512 = (str, key) => {
    let hmac = crypto.createHmac("sha512", key);
    return hmac.update(Buffer.from(str, 'utf8')).digest("hex");
}

const getSong = async (id) => {
    try { 
        const sig = getHmac512("/song/get-song-info" + getHash256(`ctime=160718421id=${id}`), "10a01dcf33762d3a204cb96429918ff6");
        const result = await cloudscraper.get({
            url: `https://zingmp3.vn/api/song/get-song-info?id=${id}&ctime=160718421&sig=${sig}&api_key=38e8643fb0dc04e8d65b99994d3dafff`, 
        });

        const data = JSON.parse(result);
    
        return data.data;
    } catch (error) {
        console.log({
            error
        })
    }

    return null;
} 

module.exports = getSong;

