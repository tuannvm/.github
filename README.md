# .github

Organization-wide defaults and CI/CD for Go projects.

## Structure

```
.github/
├── CODE_OF_CONDUCT.md      # Auto-inherited
├── CONTRIBUTING.md         # Auto-inherited
├── SECURITY.md             # Auto-inherited
├── SUPPORT.md              # Auto-inherited
├── FUNDING.yml             # Auto-inherited
├── PULL_REQUEST_TEMPLATE.md
├── ISSUE_TEMPLATE/
│   ├── bug_report.md
│   └── feature_request.md
├── templates/              # Copy to your repos
│   ├── .goreleaser.yml
│   └── release.workflow.yml
└── workflows/
    └── release-go.yml      # Reusable workflow
```

## Release Pipeline Setup

**Copy 2 files to your repo:**

```bash
# GoReleaser config (to repo root)
cp templates/.goreleaser.yml ./

# Workflow (to .github/workflows/)
cp templates/release.workflow.yml .github/workflows/release.yml
```

**Customization (if needed):**

| Change | File | Line |
|--------|------|------|
| Main not in `./cmd` | `.goreleaser.yml` | 12 |
| Different Go version | `release.yml` | 24 |
| Disable Docker | `release.yml` | 28 |

## Conventional Commits

- `feat:` → 🚀 Features
- `fix:` → 🐛 Bug Fixes
- `docs:` → 📚 Documentation
- `refactor:` → ♻️ Refactoring
- `test:` → ✅ Tests
- `chore:` → excluded from changelog
