const request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  const options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'GithubAvatarApp',
      Authorization: 'token d4042bc13aaca7fd5b2d18476d2f3510a62ad5f5',
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
