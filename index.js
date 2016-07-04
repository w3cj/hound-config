const fs = require('fs');
const GitHubApi = require("github");
const github = new GitHubApi();


require('dotenv').load();

github.authenticate({
    type: "oauth",
    token: process.env.GITHUB_AUTH_TOKEN
});

const config = {
  org: 'gschool',
  page: 1,
  per_page: 100
};

const repos = {};

function getPage(page) {
  config.page = page;
  console.log(`Getting page ${page}`);
  github.repos.getForOrg(config, (error, results) => {
    if(error) {
      console.log(`Error getting page ${page}`);
      console.log("error!", error);
    } else {
      console.log(`Got page ${page}`);

      results.forEach(repo => {
        repos[repo.name] = {
          url: repo.ssh_url
        };
      });

      if(results.length == 100) {
        getPage(page+1);
      } else {
        console.log(`Writing ${Object.keys(repos).length} repos to file...` );
        fs.writeFile('repos.json', JSON.stringify(repos), (error) => {
          if(error) console.log('Error!', error);
          console.log('Wrote file!');
        });
      }
    }
  });
}

getPage(1);
