# .github

Standardized CI/CD templates for Go projects with enhanced release notes.

## Templates

```
templates/
├── .goreleaser.yml          # GoReleaser config with conventional commits
├── release-standalone.yml   # GitHub Actions release workflow
├── release.yml              # GitHub release form UI
└── commitlint.config.js     # Commit message linting (optional)
```

## Usage

### 1. Copy templates to your repo
```bash
cp ~/Projects/cli/.github/templates/.goreleaser.yml ./
cp ~/Projects/cli/.github/templates/release-standalone.yml .github/workflows/release.yml
cp ~/Projects/cli/.github/templates/release.yml .github/release.yml  # optional
```

### 2. Commit and push
```bash
git add .goreleaser.yml .github/
git commit -m "ci: add standardized release pipeline"
git push
```

### 3. Create a release
Go to GitHub Actions → Release → Run workflow → Select version bump → Run

That's it. Templates auto-detect your project name and use sensible defaults.

## What You Get

Enhanced release notes with conventional commits:

```markdown
## 🚀 Features
* **api:** add authentication ([abc123](link))

## 🐛 Bug Fixes
* **client:** fix timeout handling ([def456](link))

## 📚 Documentation
* update README ([ghi789](link))
```

## Customization (Only If Needed)

Most projects work with defaults. Edit only if:

**`.goreleaser.yml`** - If your main path isn't `./cmd`:
```yaml
builds:
  - main: ./cmd/yourapp  # Change if different
```

**`.github/workflows/release.yml`** - If your Go version differs:
```yaml
env:
  GO_VERSION: "1.25"  # Change if needed
```

Remove Docker section (lines 62-116) if you don't need it.

## Conventional Commits

Use these commit prefixes:
- `feat:` → 🚀 Features
- `fix:` → 🐛 Bug Fixes
- `docs:` → 📚 Documentation
- `test:` → ✅ Tests
- `ci:` → 👷 CI/CD
- `chore:` → (excluded from changelog)

Example: `git commit -m "feat(api): add new endpoint"`
