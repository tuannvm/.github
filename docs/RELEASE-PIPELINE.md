# Standardized Go Release Pipeline

This document describes the standardized release pipeline for Go projects, providing consistent, high-quality release notes similar to the [Anthropic SDK releases](https://github.com/anthropics/anthropic-sdk-go/releases).

## Overview

The release pipeline consists of:

1. **Reusable GitHub Actions workflow** - Centralized release logic
2. **Enhanced GoReleaser configuration** - Rich, categorized release notes
3. **GitHub Release Form customization** - Better UX for manual releases
4. **Conventional commits support** - Structured, parseable commit messages

## Features

✅ **Rich Release Notes**
- Automatic categorization by commit type (Features, Bug Fixes, etc.)
- Emoji-enhanced sections for better readability
- Scope prefixes showing which component changed
- Commit hash links for traceability

✅ **Multi-Architecture Builds**
- Linux (amd64, arm64, arm/v6, arm/v7)
- macOS (amd64, arm64)
- Windows (amd64)

✅ **Docker Support** (optional)
- Multi-platform Docker images
- Automatic push to GHCR
- Build caching for faster builds
- SBOM and provenance attestation

✅ **Version Management**
- Manual version bump control (major/minor/patch)
- Semantic versioning enforcement
- Automatic changelog generation

## Quick Start

### For New Repositories

1. **Copy the GoReleaser config:**
   ```bash
   cp ~/.github/templates/.goreleaser.yml ./.goreleaser.yml
   ```

2. **Customize the config:**
   ```yaml
   builds:
     - binary: 'your-app-name'
       main: './cmd/your-app'  # or '.' for root main.go
   ```

3. **Copy the workflow file:**
   ```bash
   mkdir -p .github/workflows
   cp ~/.github/templates/release-workflow-example.yml .github/workflows/release.yml
   ```

4. **Update the workflow:**
   ```yaml
   uses: YOUR_ORG/.github/.github/workflows/release-go.yml@main
   with:
     binary_name: 'your-app-name'
     main_path: './cmd/your-app'
     # ... other settings
   ```

5. **Copy the release form config (optional):**
   ```bash
   cp ~/.github/templates/release.yml .github/release.yml
   ```

6. **Commit and push:**
   ```bash
   git add .goreleaser.yml .github/
   git commit -m "ci: add standardized release pipeline"
   git push
   ```

7. **Trigger a release:**
   - Go to Actions → Release → Run workflow
   - Select version bump type (major/minor/patch)
   - Click "Run workflow"

### For Existing Repositories

If you already have a release workflow:

1. **Backup existing files:**
   ```bash
   cp .goreleaser.yml .goreleaser.yml.backup
   cp .github/workflows/release.yml .github/workflows/release.yml.backup
   ```

2. **Follow the "New Repositories" steps above**

3. **Migrate any custom settings** from your backup files to the new configs

4. **Test the new workflow:**
   ```bash
   # Dry-run locally (requires goreleaser installed)
   goreleaser release --snapshot --clean
   ```

## Configuration Reference

### Reusable Workflow Inputs

| Input | Description | Default | Required |
|-------|-------------|---------|----------|
| `go_version` | Go version to use | `1.23` | No |
| `binary_name` | Name of the binary | - | Yes |
| `main_path` | Path to main package | `.` | No |
| `bump_type` | Version bump type | - | Yes |
| `enable_docker` | Build Docker image | `false` | No |
| `docker_platforms` | Docker platforms | `linux/amd64,linux/arm64` | No |

### GoReleaser Customization

Edit `.goreleaser.yml` in your repository:

```yaml
# Build configuration
builds:
  - binary: 'myapp'
    main: ./cmd/myapp
    ldflags:
      - -X main.Version={{.Version}}
      - -X main.GitCommit={{.Commit}}
      # Add custom ldflags here

# Custom release footer
release:
  footer: |
    ## Installation
    Your custom installation instructions here
```

### Commit Message Format

Use conventional commits for best results:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature → appears in "Features" section
- `fix`: Bug fix → appears in "Bug Fixes" section
- `docs`: Documentation → appears in "Documentation" section
- `style`: Code style changes → appears in "Styling" section
- `refactor`: Code refactoring → appears in "Refactoring" section
- `perf`: Performance improvement → appears in "Performance" section
- `test`: Test changes → appears in "Tests" section
- `build`: Build system changes → appears in "Build System" section
- `ci`: CI/CD changes → appears in "CI/CD" section
- `chore`: Other changes → excluded from changelog

**Examples:**
```bash
# Feature commit
git commit -m "feat(api): add support for Claude Opus 4.5"

# Bug fix with scope
git commit -m "fix(client): handle connection timeout gracefully"

# Breaking change
git commit -m "feat(auth)!: migrate to OAuth2
BREAKING CHANGE: API key authentication is no longer supported"

# Multiple scopes
git commit -m "refactor(api,client): standardize error handling"
```

## Release Notes Example

The enhanced configuration produces release notes like this:

```markdown
## Release Notes

**Full Changelog**: https://github.com/your-org/your-repo/compare/v1.0.0...v1.1.0

## 🚀 Features

* **api:** add support for Claude Opus 4.5 ([a03391c](link))
* **client:** implement automatic retry with backoff ([b12345d](link))

## 🐛 Bug Fixes

* **auth:** fix token refresh race condition ([c67890e](link))
* **config:** handle missing environment variables gracefully ([d23456f](link))

## 📚 Documentation

* **readme:** update installation instructions ([e34567a](link))

## ♻️ Refactoring

* **core:** simplify request handling logic ([f45678b](link))

---

### Installation

#### Homebrew (macOS/Linux)
\`\`\`bash
brew install your-org/tap/your-app
\`\`\`

#### Go Install
\`\`\`bash
go install github.com/your-org/your-app@v1.1.0
\`\`\`

#### Download Binary
Download the appropriate binary for your platform from the assets below.

### Docker
\`\`\`bash
docker pull ghcr.io/your-org/your-app:v1.1.0
\`\`\`
```

## Enforcing Commit Message Format (Optional)

To enforce conventional commits:

1. **Copy commitlint config:**
   ```bash
   cp ~/.github/templates/commitlint.config.js ./commitlint.config.js
   ```

2. **Install dependencies:**
   ```bash
   npm install --save-dev @commitlint/cli @commitlint/config-conventional husky
   npm install --save-dev @commitlint/cli @commitlint/config-conventional
   ```

3. **Setup git hooks:**
   ```bash
   npx husky install
   npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
   ```

4. **Commit:**
   ```bash
   git add .
   git commit -m "ci: add commit message linting"
   ```

Now all commits will be validated against conventional commits format.

## Troubleshooting

### Release workflow fails with "GoReleaser failed"

- **Check `.goreleaser.yml` syntax:**
  ```bash
  goreleaser check
  ```

- **Test locally:**
  ```bash
  goreleaser release --snapshot --clean
  ```

### Changelog is empty or missing commits

- **Verify commit message format:**
  Commits must follow conventional commits format (`feat:`, `fix:`, etc.)

- **Check excluded types:**
  Edit `.goreleaser.yml` → `changelog.filters.exclude` to adjust filtering

### Docker build fails

- **Verify Dockerfile exists** in repository root

- **Check platforms** - some platforms may not support your dependencies:
  ```yaml
  docker_platforms: 'linux/amd64,linux/arm64'  # Remove unsupported platforms
  ```

### Version tag already exists

- **Delete the tag locally and remotely:**
  ```bash
  git tag -d v1.0.0
  git push origin :refs/tags/v1.0.0
  ```

- **Run the release workflow again**

## Advanced Configuration

### Custom Release Header/Footer

Edit `.goreleaser.yml`:

```yaml
release:
  header: |
    ## What's Changed in v{{.Version}}

    Your custom header here

  footer: |
    ## Contributors

    Thanks to all contributors! 🎉
```

### Multiple Binaries

If your repository builds multiple binaries:

```yaml
builds:
  - id: app1
    binary: app1
    main: ./cmd/app1

  - id: app2
    binary: app2
    main: ./cmd/app2
```

### Homebrew Tap

To publish to Homebrew:

```yaml
brews:
  - repository:
      owner: your-org
      name: homebrew-tap
    folder: Formula
    homepage: https://github.com/your-org/your-app
    description: Your app description
    license: MIT
```

### Slack Notifications

To announce releases on Slack:

```yaml
announce:
  slack:
    enabled: true
    message_template: 'New release: {{ .ProjectName }} {{ .Tag }}'
    channel: '#releases'
    username: 'Release Bot'
```

Requires `SLACK_WEBHOOK` secret in repository settings.

## Migration Checklist

When migrating existing repositories:

- [ ] Backup existing `.goreleaser.yml` and workflow files
- [ ] Copy new templates to repository
- [ ] Customize binary name and main path
- [ ] Update organization/repository references
- [ ] Test locally with `goreleaser release --snapshot --clean`
- [ ] Commit changes with conventional commit message
- [ ] Trigger test release workflow
- [ ] Verify release notes format
- [ ] Update repository README with new release badge/instructions
- [ ] Document migration in team wiki/docs

## Best Practices

1. **Always use conventional commits** for meaningful changelogs
2. **Test releases locally** before pushing workflow changes
3. **Start with patch releases** when testing new pipeline
4. **Review generated changelog** before publishing (enable draft mode)
5. **Keep .goreleaser.yml** minimal - don't over-customize
6. **Document custom ldflags** in your repository README
7. **Use semantic versioning** strictly (major.minor.patch)
8. **Tag releases consistently** (always use `v` prefix)

## Support

For issues or questions:

1. Check this documentation first
2. Review [GoReleaser documentation](https://goreleaser.com)
3. Check [Conventional Commits specification](https://www.conventionalcommits.org)
4. Open an issue in the `.github` repository

## Reference

- [GoReleaser Documentation](https://goreleaser.com)
- [Conventional Commits](https://www.conventionalcommits.org)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Anthropic SDK Release Example](https://github.com/anthropics/anthropic-sdk-go/releases)
