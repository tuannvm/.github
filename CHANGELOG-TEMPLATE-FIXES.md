# Template Fixes Applied

Date: 2025-12-25

## Issues Fixed

### 1. ❌ Logical Contradiction in Changelog Filters

**Problem**: The template was excluding commits from the changelog that it was also trying to categorize into sections.

**Before**:
```yaml
changelog:
  groups:
    - title: 📚 Documentation
      regexp: '^.*?docs(\([[:word:]]+\))??!?:.+$'
    - title: ✅ Tests
      regexp: '^.*?test(\([[:word:]]+\))??!?:.+$'
    - title: 👷 CI/CD
      regexp: '^.*?ci(\([[:word:]]+\))??!?:.+$'

  filters:
    exclude:
      - '^docs:'   # ❌ This prevents docs from appearing
      - '^test:'   # ❌ This prevents tests from appearing
      - '^ci:'     # ❌ This prevents CI from appearing
```

**Result**: Documentation, Tests, and CI/CD sections would always be empty because those commits were excluded.

**After**:
```yaml
changelog:
  groups:
    - title: 📚 Documentation
      regexp: '^.*?docs(\([[:word:]]+\))??!?:.+$'
    - title: ✅ Tests
      regexp: '^.*?test(\([[:word:]]+\))??!?:.+$'
    - title: 👷 CI/CD
      regexp: '^.*?ci(\([[:word:]]+\))??!?:.+$'

  filters:
    exclude:
      - '^chore:'           # Only exclude noise
      - '^chore\('
      - 'merge conflict'
      - Merge pull request
      - Merge remote-tracking branch
      - Merge branch
      - go mod tidy
```

**Result**: ✅ Now docs, test, and ci commits will appear in their categorized sections.

### 2. 📦 GitHub Actions Version Update

**Problem**: Template used older action versions (v4, v5) while mcp-trino uses newer versions (v6).

**Before**:
```yaml
- uses: actions/checkout@v4
- uses: actions/setup-go@v5
```

**After**:
```yaml
- uses: actions/checkout@v6
- uses: actions/setup-go@v6
```

**Result**: ✅ Templates now use latest stable action versions.

## Expected Changelog Output

With these fixes, a release with various commit types will now show:

```markdown
## 🚀 Features
* **api:** add new authentication endpoint ([abc123](link))

## 🐛 Bug Fixes
* **client:** fix connection timeout handling ([def456](link))

## 📚 Documentation
* **readme:** update installation instructions ([ghi789](link))

## ✅ Tests
* **api:** add integration tests for auth flow ([jkl012](link))

## 👷 CI/CD
* **workflow:** optimize build caching ([mno345](link))
```

**Before the fix**, the Documentation, Tests, and CI/CD sections would be **empty** even if those commits existed.

## Files Modified

1. `~/Projects/cli/.github/templates/.goreleaser.yml`
   - Removed docs, test, ci from exclusions
   - Updated comment to clarify what's excluded

2. `~/Projects/cli/.github/templates/release-standalone.yml`
   - Updated actions/checkout from v4 to v6
   - Updated actions/setup-go from v5 to v6

## Commit This

```bash
cd ~/Projects/cli/.github
git add templates/
git commit -m "fix(templates): resolve changelog filtering contradiction

- Remove docs/test/ci from exclusions to allow categorization
- Update GitHub Actions to v6 (checkout, setup-go)
- Clarify exclusion comment (noise vs user-facing changes)

Before: docs/test/ci sections were always empty (excluded)
After: commits properly categorized in respective sections"
git push
```

## Next Steps

After pushing to .github repo:
1. Apply the same changelog fix to pm-agent-workflow
2. Apply the enhanced changelog to mcp-trino
3. Test with a release to verify sections appear correctly
