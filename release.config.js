const config = {
  branches: ['main', { name: 'dev', prerelease: true }],
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
    [
        "semantic-release-slack-bot",
        {
          "notifyOnSuccess": true,
          "notifyOnFail": true,
        }
      ]
  ],
};

module.exports = config;
