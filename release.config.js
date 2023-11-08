const config = {
  // Define the branches where releases are allowed
  branches: ['main', { name: 'release', prerelease: true }],
  plugins: [
    [
      '@semantic-release/commit-analyzer', // Use the commit-analyzer plugin to analyze commit messages.
      {
        preset: 'conventionalcommits',
        releaseRules: [
          { type: 'docs', scope: 'README', release: 'patch' }, // For 'docs' commits with scope 'README', release a patch version.
          { type: 'refactor', release: 'patch' }, // For 'refactor' commits, release a patch version.
          { type: 'style', release: 'patch' }, // For 'style' commits, release a patch version.
        ],
        parserOpts: { noteKeywords: 'BREAKING' },
      },
    ],
    [
      '@semantic-release/release-notes-generator', // Use the release-notes-generator plugin to generate release notes.
      {
        preset: 'conventionalcommits', // Configure it to use the conventional commits preset.
        parserOpts: { noteKeywords: 'BREAKING' }, // Specify note keywords for breaking changes.
      },
    ],
    [
      '@semantic-release/changelog', // Use the changelog plugin to manage changelog files.
      {
        changelogFile: 'docs/CHANGELOG.md', // Specify the location of the changelog file.
      },
    ],
    [
      "@semantic-release/npm",
      {
        "npmPublish": false,
      }
    ],
    [
      '@semantic-release/github', // Use the GitHub plugin to interact with GitHub repositories.
      {
        successComment: false, // Disable posting a success comment on GitHub.
        releasedLabels: false, // Disable updating released labels on GitHub.
      },
    ],
    [
      'semantic-release-slack-bot', // Use the semantic-release-slack-bot plugin for Slack notifications.
      {
        notifyOnSuccess: true, // Notify on successful releases.
        notifyOnFail: true, // Notify on failed releases.
      },
    ],
  ],
};

if (process.env.CURRENT_BRANCH === "main") {
  config.plugins.push([
    '@semantic-release/git', // Use the git plugin to commit and push changes to Git.
      {
        assets: ['docs/CHANGELOG.md', 'package.json'], // Specify assets to be included in the Git release commit.
      },
  ]);
}

module.exports = config;
