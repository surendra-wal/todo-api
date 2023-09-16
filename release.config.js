const changelogFile = 'docs/CHANGELOG.md';

const config = {
  branches: ['main', { name: 'dev', prerelease: true }],
  repositoryUrl: 'git@github.com:surendra-wal/todo-api.git',
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
        releaseRules: [
          { type: "docs", scope: "README", release: "patch" },
          { type: "refactor", release: "patch" },
          { type: "style", release: "patch" },
        ],
        parserOpts: { noteKeywords: "BREAKING" },
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
        parserOpts: { noteKeywords: "BREAKING" },
      },
    ],
    // For '@semantic-release/changelog'
    // updates the docs/CHANGELOG.md file
    [
      "@semantic-release/changelog",
      {
        changelogTitle: "# Changelog",
      },
    ],
    // For '@semantic-release/github',
    // creates a release on GitHub
    [
      "@semantic-release/github",
      {
        successComment: false,
        releasedLabels: false,
      },
    ],
  ],
};

if (process.env.GIT_BRANCH === "main") {
  // For '@semantic-release/git'
  // makes a commit to the `main` branch containing updates to package.json and the changelog file
  config.plugins.push([
    "@semantic-release/git",
    {
      assets: ["package.json", changelogFile],
      message:
        "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
    },
  ]);
}

module.exports = config;
