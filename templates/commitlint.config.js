// Commitlint configuration for conventional commits
// Copy this to your repository root if you want to enforce commit message format
// Requires: npm install --save-dev @commitlint/cli @commitlint/config-conventional

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation changes
        'style',    // Code style changes (formatting, missing semicolons, etc.)
        'refactor', // Code refactoring
        'perf',     // Performance improvements
        'test',     // Adding or updating tests
        'build',    // Build system changes
        'ci',       // CI/CD changes
        'chore',    // Other changes that don't modify src or test files
        'revert',   // Revert a previous commit
      ],
    ],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [0], // Allow any case for subject
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
  },
};
