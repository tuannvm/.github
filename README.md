# .github

Organization-wide GitHub configuration and templates for Go projects.

## 📁 Contents

### Templates (`templates/`)

- **`.goreleaser.yml`** - Enhanced GoReleaser configuration with conventional commits support
- **`release-standalone.yml`** - Standalone release workflow template with Docker support
- **`release.yml`** - GitHub release form configuration
- **`commitlint.config.js`** - Commitlint configuration for enforcing conventional commits

### Workflows (`workflows/`)

- **`release-go.yml`** - Reusable release workflow (optional, use standalone template instead)

### Documentation (`docs/`)

- **`RELEASE-PIPELINE.md`** - Complete guide to the standardized release pipeline
- **`MIGRATION-GUIDE.md`** - Migration guide for existing repositories

## 🚀 Quick Start

### Setting Up Releases for a Go Project

1. **Copy GoReleaser config:**
   ```bash
   cp ~/.github/templates/.goreleaser.yml ./.goreleaser.yml
   ```

2. **Customize** `.goreleaser.yml`:
   ```yaml
   builds:
     - binary: 'your-app-name'      # Change this
       main: ./cmd/your-app         # Change this
   ```

3. **Copy release workflow:**
   ```bash
   mkdir -p .github/workflows
   cp ~/.github/templates/release-standalone.yml .github/workflows/release.yml
   ```

4. **Customize** `.github/workflows/release.yml`:
   ```yaml
   env:
     GO_VERSION: "1.25"  # Your Go version
   ```

5. **Optional: Copy release form config:**
   ```bash
   cp ~/.github/templates/release.yml .github/release.yml
   ```

6. **Commit and push:**
   ```bash
   git add .goreleaser.yml .github/
   git commit -m "ci: add enhanced release pipeline"
   git push
   ```

## 📦 What You Get

✅ **Rich Release Notes** (like [Anthropic SDK](https://github.com/anthropics/anthropic-sdk-go/releases))
- Automatic categorization by commit type (Features, Bug Fixes, Documentation, etc.)
- Emoji-enhanced sections for better readability
- Scope prefixes showing which component changed
- Commit hash links for traceability

✅ **Simple, Proven Convention**
- Based on actual pm-agent-workflow and mcp-trino setups
- Standalone workflows (not reusable dependencies)
- Docker builds integrated inline
- Multi-architecture support (Linux, macOS, ARM64)

✅ **Conventional Commits Support**
- Structured changelog generation
- Automatic semantic versioning
- Filters out noise (chore, test commits)

## 🤝 Contributing

To improve the shared workflows or templates:

1. Create a feature branch
2. Make your changes
3. Test with a sample repository
4. Submit a pull request

## 📝 License

MIT