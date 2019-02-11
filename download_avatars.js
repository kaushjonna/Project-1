const request = require('request');
const fs = require('fs');
const secrets = require('./secrets.js');

const repoOwned = process.argv.slice(2);

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  const options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'GithubAvatarApp',
      Authorization: secrets.GITHUB_TOKEN,
    },
  };
  request(options, (err, res, body) => {
    cb(err, body);
  });
}

getRepoContributors(repoOwned[0], repoOwned[1], (err, result) => {
  console.log('Errors:', err);
  const data = JSON.parse(result);
  data.forEach((element) => {
    downloadImageByURL(element.avatar_url, `./Avatars/${element.login}.jpg`);
  });
});

function downloadImageByURL(url, filePath) {
  request
    .get(url)
    .on('error', (err) => {
      throw err;
    })
    .pipe(fs.createWriteStream(filePath));
}
