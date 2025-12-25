# Migration Guide: pm-agent-workflow

This guide walks through migrating `pm-agent-workflow` from its current release pipeline to the new standardized pipeline with enhanced release notes.

## Current State

The pm-agent-workflow repository (as of commit `3017a33`) has:

- ✅ GoReleaser configuration
- ✅ Release workflow with manual version bumping
- ✅ Multi-arch Docker builds
- ✅ Build verification pipeline
- ⚠️ **Basic changelog** (needs enhancement)

## Target State

After migration:

- ✅ Enhanced release notes with conventional commits
- ✅ Categorized changelog (Features, Bug Fixes, etc.)
- ✅ Emoji sections for better readability
- ✅ Scope prefixes showing component changes
- ✅ Commit hash links
- ✅ Consistent with Anthropic SDK release format

## Migration Steps

### 1. Backup Current Configuration

```bash
cd ~/Projects/cli/pm-agent-workflow

# Checkout the commit with the release workflow
git checkout 3017a33

# Or if you want to restore from git history
git show 3017a33:.github/workflows/release.yml > .github/workflows/release.yml.backup
git show 3017a33:.goreleaser.yml > .goreleaser.yml.backup
```

### 2. Copy New GoReleaser Configuration

```bash
# Copy the enhanced template
cp ~/Projects/cli/.github/templates/.goreleaser.yml ./.goreleaser.yml

# Customize for pm-agent-workflow
```

Edit `.goreleaser.yml`:

```yaml
version: 2

before:
  hooks:
    - go mod tidy
    - go mod verify

builds:
  - binary: 'pm-agents'  # Keep your existing binary name
    main: ./cmd/pm-agents  # Keep your existing main path
    env:
      - CGO_ENABLED=0
    goos:
      - linux
      - darwin
    goarch:
      - amd64
      - arm64
    ldflags:
      - -s -w
      - -X main.Version={{.Version}}
      - -X main.Commit={{.Commit}}
      - -X main.Date={{.Date}}
    flags:
      - -trimpath

# ... rest of the template (keep as is for enhanced changelog)
```

### 3. Update Release Workflow

**Option A: Use Reusable Workflow (Recommended)**

Replace `.github/workflows/release.yml` with:

```yaml
name: Release

on:
  workflow_dispatch:
    inputs:
      bump_type:
        description: 'Version bump type'
        required: true
        default: 'patch'
        type: choice
        options:
          - major
          - minor
          - patch

jobs:
  release:
    uses: YOUR_ORG/.github/.github/workflows/release-go.yml@main
    with:
      go_version: '1.25'  # Match your current Go version
      binary_name: 'pm-agents'
      main_path: './cmd/pm-agents'
      bump_type: ${{ github.event.inputs.bump_type }}
      enable_docker: true
      docker_platforms: 'linux/amd64,linux/arm64,linux/arm/v7,linux/arm/v6'
    secrets:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**Option B: Standalone Workflow**

If you prefer not to use the reusable workflow, keep your existing `release.yml` but ensure GoReleaser uses the new enhanced configuration.

### 4. Add GitHub Release Form Configuration

```bash
# Copy the release form template
cp ~/Projects/cli/.github/templates/release.yml ./.github/release.yml
```

This enhances the GitHub UI when creating releases manually.

### 5. Verify Commit Message Format

Check recent commits:

```bash
git log --oneline -20
```

**Good examples (conventional commits):**
- `feat(api): add new endpoint`
- `fix(auth): resolve token refresh issue`
- `docs: update README`

**Bad examples (need updating):**
- `Added new feature`
- `Fixed bug`
- `Update docs`

If your commits don't follow conventional format, that's okay! Going forward:

1. **Team communication**: Inform team about new commit format
2. **Add commitlint** (optional): Enforce format with pre-commit hooks
3. **Past commits**: Don't worry about history - start fresh

### 6. Optional: Add Commit Message Linting

```bash
# Copy commitlint config
cp ~/Projects/cli/.github/templates/commitlint.config.js ./commitlint.config.js

# Install dependencies
npm install --save-dev @commitlint/cli @commitlint/config-conventional husky

# Setup git hook
npx husky install
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

### 7. Test Locally

```bash
# Install goreleaser if not already installed
brew install goreleaser

# Test the new configuration
goreleaser release --snapshot --clean

# Check the generated changelog in dist/CHANGELOG.md
cat dist/CHANGELOG.md
```

Expected output:

```markdown
## 🚀 Features
* **api:** add support for X ([abc123](link))

## 🐛 Bug Fixes
* **client:** fix connection handling ([def456](link))

## 📚 Documentation
* update README with examples ([ghi789](link))
```

### 8. Commit Changes

```bash
git add .goreleaser.yml .github/
git commit -m "ci: enhance release pipeline with categorized changelog

- Add conventional commits parsing
- Categorize changelog by commit type
- Add emoji sections for better readability
- Include commit hash links
- Align with Anthropic SDK release format"

git push
```

### 9. Create a Test Release

1. Go to GitHub Actions → Release → Run workflow
2. Select `patch` version bump
3. Click "Run workflow"
4. Monitor the workflow execution
5. **Review the generated release notes**

### 10. Verify Release Output

Check that the release notes now include:

- ✅ Section headers (🚀 Features, 🐛 Bug Fixes, etc.)
- ✅ Scope prefixes (e.g., `**api:**`)
- ✅ Commit hash links
- ✅ Proper categorization
- ✅ Full changelog comparison link

## Migration Checklist

- [ ] Backup existing `.goreleaser.yml` and workflow files
- [ ] Copy new `.goreleaser.yml` template
- [ ] Customize binary name and main path
- [ ] Update release workflow (Option A or B)
- [ ] Add `.github/release.yml` for GitHub UI
- [ ] Verify commit message format
- [ ] Optional: Add commitlint for enforcement
- [ ] Test locally with `goreleaser release --snapshot --clean`
- [ ] Commit changes with conventional commit message
- [ ] Create test release
- [ ] Verify release notes format
- [ ] Communicate changes to team
- [ ] Update repository README with conventional commits guidelines

## Rollback Plan

If something goes wrong:

```bash
# Restore backup files
cp .goreleaser.yml.backup .goreleaser.yml
cp .github/workflows/release.yml.backup .github/workflows/release.yml

# Or restore from git history
git show 3017a33:.github/workflows/release.yml > .github/workflows/release.yml
git show 3017a33:.goreleaser.yml > .goreleaser.yml

# Commit and push
git add .goreleaser.yml .github/workflows/release.yml
git commit -m "revert: rollback to previous release pipeline"
git push
```

## Troubleshooting

### Issue: Changelog is empty

**Cause**: Commits don't follow conventional format

**Solution**: Ensure commits use `feat:`, `fix:`, etc. For historical releases, add commits manually or adjust GoReleaser's `changelog.filters.exclude`.

### Issue: Docker build fails

**Cause**: Platform incompatibility or missing Dockerfile

**Solution**:
1. Verify `Dockerfile` exists in repository root
2. Reduce platforms if some fail: `docker_platforms: 'linux/amd64,linux/arm64'`

### Issue: Version tag already exists

**Cause**: Previous release created the tag

**Solution**:
```bash
git tag -d vX.X.X
git push origin :refs/tags/vX.X.X
```

Then re-run the workflow.

## Expected Outcome

**Before Migration:**

```markdown
## Changelog

* 3017a33 ci(release): build and push multi-arch Docker image to GHCR
* df501dc ci: add build and release workflows with lint, test, and security scans
```

**After Migration:**

```markdown
## Release Notes

**Full Changelog**: https://github.com/your-org/pm-agent-workflow/compare/v1.0.0...v1.1.0

## 🚀 Features

* **api:** add support for Claude Agent SDK v2 ([3017a33](link))
* **dashboard:** implement real-time agent monitoring ([df501dc](link))

## 🐛 Bug Fixes

* **server:** fix session persistence on restart ([abc1234](link))

## 📚 Documentation

* **readme:** add quick start guide ([def5678](link))

## 👷 CI/CD

* **release:** build and push multi-arch Docker image to GHCR ([3017a33](link))
* **build:** add build and release workflows with lint, test, and security scans ([df501dc](link))

---

### Installation

#### Go Install
\`\`\`bash
go install github.com/your-org/pm-agent-workflow/cmd/pm-agents@v1.1.0
\`\`\`

#### Docker
\`\`\`bash
docker pull ghcr.io/your-org/pm-agent-workflow:v1.1.0
\`\`\`
```

## Team Communication

Share this with your team:

> **📢 Release Pipeline Update**
>
> We've upgraded our release pipeline to provide better release notes! Going forward:
>
> **Commit Message Format:**
> - Use conventional commits: `type(scope): description`
> - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`
> - Example: `feat(api): add new endpoint for user profiles`
>
> **Benefits:**
> - ✅ Automatically categorized release notes
> - ✅ Better changelog readability
> - ✅ Easier to track features vs bug fixes
> - ✅ Consistent with industry standards (Anthropic SDK, Angular, etc.)
>
> See our [Release Pipeline Guide](../RELEASE-PIPELINE.md) for details.

## Next Steps

After successful migration of pm-agent-workflow:

1. **Apply to other repositories** - Use the same process for your other Go projects
2. **Share the template** - Point other teams to `~/.github/templates/`
3. **Monitor adoption** - Check that teams are using conventional commits
4. **Iterate** - Gather feedback and improve the templates

## Support

If you encounter issues during migration:

1. Check the [Release Pipeline Guide](RELEASE-PIPELINE.md)
2. Review [GoReleaser documentation](https://goreleaser.com)
3. Open an issue in the `.github` repository
4. Reach out to the DevOps/Platform team
