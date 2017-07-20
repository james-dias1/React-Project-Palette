const childProcess = require("child_process");
const path = require('path');
const crypto = require('crypto');
const shortid = require('shortid');


const gitClone = (url, clonePath=__dirname) => {
    return new Promise((resolve, reject) => {
        childProcess.exec(`git clone ${url} ${clonePath}`, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(clonePath);
            }
        });
    });
};

const normalizeGitHubUrl = (url) => {
    let httpsCloneUrl = `${url}.git`;
    let repoUri = url.replace(/https:\/\/github\.com\//, '')
    let hashedUri = crypto.createHmac('sha256', repoUri).digest('hex');
    let uniqueHash = `${hashedUri}${shortid.generate()}`;

    return {
        httpsCloneUrl,
        repoUri,
        hashedUri,
        uniqueHash
    };
};

module.exports = {
    gitClone,
    normalizeGitHubUrl
};