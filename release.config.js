const config = {
  branches: ['main', { name: 'dev', prerelease: true }],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [
          { type: 'docs', scope: 'README', release: 'patch' },
          { type: 'refactor', release: 'patch' },
          { type: 'style', release: 'patch' },
        ],
        parserOpts: { noteKeywords: 'BREAKING' },
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        parserOpts: { noteKeywords: 'BREAKING' },
      },
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'docs/CHANGELOG.md',
      },
    ],
    [
      '@semantic-release/github',
      {
        successComment: false,
        releasedLabels: false,
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['docs/CHANGELOG.md'],
      },
    ],
    [
      'semantic-release-slack-bot',
      {
        notifyOnSuccess: true,
        notifyOnFail: true,
        onSuccessTemplate: {
          text: 'A new version of $package_name with version $npm_package_version has been released',
        },
      },
    ],
  ],
};

module.exports = config;
