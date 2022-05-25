let fs = require("fs");
let axios = require("axios");

let songs = ["JTiger.mp3", "JTwinkle.mp3"];
let durations = ["00:15", "00:05"];
let ipfsArray = [];

for (let i = 0; i < songs.length; i++) {//looping thru tracks to get thier metadata
  ipfsArray.push({
    path: `metadata/${i}.json`,
    content: {
      image: `ipfs://QmNsnqDMmRMKgWm2dQrZ4uFGQNUiZ7vmbfgptYyAgfKNVx/media/2`, 
      name: songs[i],
      animation_url: `ipfs://QmNsnqDMmRMKgWm2dQrZ4uFGQNUiZ7vmbfgptYyAgfKNVx/media/${i}`, //any multimedia attachment has to be stored using a key name "animation_url", that's the standard
      duration: durations[i],
      artist: "Snoop Jay",
      year: "1950"
    },
  });
}

axios.post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", ipfsArray, {
    headers: {
      "X-API-KEY":
        "URxmUwwxKyR7inU9CIQSjQNMgGKoexio1KEDsEIN3Vuwi8N9n9mNuJrPFCgO9nNf",
      "Content-Type": "application/json",
      accept: "application/json",
    },
  })
  .then((res) => {
    console.log(res.data);
  })
  .catch((error) => {
    console.log(error);
  });
