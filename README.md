# .github

Organization-wide GitHub configuration, reusable workflows, and templates.

## 📁 Contents

### Workflows (`workflows/`)

- **`release-go.yml`** - Reusable release workflow for Go projects with enhanced changelog generation

### Templates (`templates/`)

- **`.goreleaser.yml`** - Enhanced GoReleaser configuration with conventional commits support
- **`release-workflow-example.yml`** - Example workflow for repositories to reference the reusable workflow
- **`release.yml`** - GitHub release form configuration
- **`commitlint.config.js`** - Commitlint configuration for enforcing conventional commits

### Documentation (`docs/`)

- **`RELEASE-PIPELINE.md`** - Complete guide to the standardized release pipeline

## 🚀 Quick Start

### Setting Up Releases for a Go Project

1. Copy the GoReleaser config:
   ```bash
   cp ~/.github/templates/.goreleaser.yml ./.goreleaser.yml
   ```

2. Copy the workflow:
   ```bash
   mkdir -p .github/workflows
   cp ~/.github/templates/release-workflow-example.yml .github/workflows/release.yml
   ```

3. Customize both files for your project

4. See [RELEASE-PIPELINE.md](docs/RELEASE-PIPELINE.md) for detailed instructions

## 📖 Documentation

- [Release Pipeline Guide](docs/RELEASE-PIPELINE.md) - Comprehensive guide for standardized Go releases

## 🔗 Usage in Repositories

Repositories can reference the reusable workflow:

```yaml
jobs:
  release:
    uses: YOUR_ORG/.github/.github/workflows/release-go.yml@main
    with:
      binary_name: 'your-app'
      main_path: './cmd/your-app'
      bump_type: ${{ github.event.inputs.bump_type }}
```

## 📦 What You Get

✅ **Rich Release Notes** (similar to [Anthropic SDK](https://github.com/anthropics/anthropic-sdk-go/releases))
- Automatic categorization by commit type
- Emoji-enhanced sections
- Scope prefixes
- Commit hash links

✅ **Multi-Architecture Builds**
- Linux, macOS, Windows
- ARM and x86 support

✅ **Docker Support** (optional)
- Multi-platform images
- Automatic GHCR publishing

✅ **Conventional Commits**
- Structured changelog
- Semantic versioning

## 🤝 Contributing

To improve the shared workflows or templates:

1. Create a feature branch
2. Make your changes
3. Test with a sample repository
4. Submit a pull request

## 📝 License

MIT