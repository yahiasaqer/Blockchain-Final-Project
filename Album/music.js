let fs = require("fs");
let axios = require("axios");

let media = ["JTiger.mp3", "JTwinkle.mp3", "NonFungible.png"];
let ipfsArray = [];
let promises = [];

for (let i = 0; i < media.length; i++) { //looping thru media to push its contents into ipfsArray
  promises.push(
    new Promise((res, rej) => {
      fs.readFile(`${__dirname}/export/${media[i]}`, (err, data) => {
        if (err) rej();
        ipfsArray.push({
          path: `media/${i}`, //we will push path (which is key) and the content coded to base64
          content: data.toString("base64"),
        });
        res();
      });
    })
  );
}
Promise.all(promises).then(() => {
  axios
    .post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", ipfsArray, { //then we store ipfs in moralis
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
});
