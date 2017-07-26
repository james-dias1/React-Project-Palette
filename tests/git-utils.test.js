const { gitClone, normalizeGitHubUrl } = require("../helpers/git-utils");

test("Should properly normalize a GitHub url", () => {
    let url = "https://github.com/l4nk332/ianjabour.io";
    let normalized = normalizeGitHubUrl(url);
    expect(normalized.httpsCloneUrl).toBe("https://github.com/l4nk332/ianjabour.io.git");
    expect(normalized.repoUri).toBe("l4nk332/ianjabour.io");
    expect(normalized.hashedUri === normalized.repoUri).toBeFalsy();
    expect(normalized.hashedUri === normalized.uniqueHash).toBeFalsy();
});

test("Should produce unique hashes for each function call", () => {
    let url = "https://github.com/l4nk332/ianjabour.io";
    let uniqueHashes = [10];

    for (let i = 0; i < 1000; i++) {
        let hash = normalizeGitHubUrl(url);
        expect(uniqueHashes.includes(hash)).toBeFalsy();
        uniqueHashes.push(hash);
    }
});
