# Contributing

## Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Make your changes
4. Run tests: `make test` or `go test ./...`
5. Commit using conventional commits
6. Push and open a PR

## Conventional Commits

Use the format: `type(scope): description`

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `refactor` | Code refactoring |
| `test` | Adding tests |
| `chore` | Maintenance |

Examples:
```
feat(api): add authentication endpoint
fix(client): handle timeout errors
docs: update README
```

## Pull Requests

- Keep PRs focused and small
- Update documentation if needed
- Ensure tests pass
- Request review from maintainers
