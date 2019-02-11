const request = require('request');
const secrets = require('./secrets.js');

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

getRepoContributors('jquery', 'jquery', (err, result) => {
  console.log('Errors:', err);
  console.log('Result:', JSON.parse(result));
});
