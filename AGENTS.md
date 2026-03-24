# AGENTS.md

This repository is a project scaffolding framework for AI agents to build features systematically.

## Project Structure

```
.specify/                 # Core scaffolding framework
  .specify/memory/        # Constitution, guidance, documentation
  .specify/scripts/       # PowerShell automation scripts
  .specify/templates/     # Markdown templates (specs, plans, etc.)
  .specify/init-options.json     # AI/opencode configuration
.opencode/command/        # Scaffolding commands
```

## Development Workflow

For new features, follow: `/speckit.specify` → `/speckit.clarify` → `/speckit.plan` → `/speckit.tasks` → `/speckit.checklist`

**Branch Naming**: `#[NUM]-feature-name` (e.g., `01-add-user-authentication`)

## Testing

### Commands

```bash
npm test                        # Run all tests
npm run test:watch              # Watch mode
npm test -- "*.spec.ts"        # Run single file
npm run lint                    # Linting check
```

### Requirements

- **Test-First (NON-NEGOTIABLE)**: Write tests → User approve → Tests fail → Implement
- **Red-Green-Refactor** cycle enforced
- Integration tests for: library contracts, inter-service communication, shared schemas

### Structure

```ntests/
  unit/
  integration/
  fixtures/     # Test data
```

## Code Style

### Imports

```
import thirdParty from 'pkg';        # Third-party first
import internal from './internal';   # Internal second
import relative from './relative';    # Relative last
```

### Formatting
- 2-space indentation
- Single line before import groups
- Max 100 chars per line
- Use Prettier/ESLint for auto-formatting

### Types/TypeScript
- Prefer `interface` for object shapes
- Use `const` for constants
- Explicit generic constraints
- Use `ReturnType<T>`, `Parameters<T>` utilities

### Naming

| Element      | Convention         | Example              |
|-----|-------------------|----------------------|
| Classes      | PascalCase        | `UserRepository`     |
| Functions    | camelCase/kebab   | `getUser()`, `get-user` |
| Variables    | camelCase         | `userId`             |
| Constants    | UPPER_SNAKE_CASE  | `API_TIMEOUT`        |
| Files        | sequential prefix  | `01-feature-name.ts` |

### Error Handling

```typescript
try {
  await operation();
} catch (err) {
  logger.error('Operation failed', { error: err, context });
  return handleFailure(err);
}
```

❌ Never: `try { operation(); } catch (e) { throw e; }`

### Constants & Paths

```typescript
const API_TIMEOUT = 5000;              // UPPER_SNAKE_CASE
const DEFAULT_PAGE_SIZE = 20;         // Numbers: camelCase/UPPER_SNAKE
const API_BASE_URL = '/api/v1';       // Forward slashes
```

### API Response

```typescript
if (data) {
  const item = data.items?.[0];
}
// Prefer explicit over type assertions
```

## Governance

1. **Library-First** → Every feature is standalone, testable, documented
2. **CLI Interface** → Every library exposes CLI; stdin/args → stdout, errors → stderr
3. **Test-First** → TDD mandatory; Red-Green-Refactor enforced
4. **Integration Testing** → Contract, communication, schema tests required
5. **Observability** → Text I/O debuggability; structured logging
6. **Simple by Default** → YAGNI principles

**Constitution**: Supersedes all practices. Amendments require documentation, approval, migration plan. All PRs must verify compliance.

**Versioning**: `MAJOR.MINOR.BUILD` - Breaking: MAJOR, otherwise MINOR

## Validation Checklist

Before commit:
- [ ] Code passes `npm run lint`
- [ ] Tests pass: `npm test`
- [ ] Naming conventions followed
- [ ] Error handling complete
- [ ] Type definitions added (if TS)
- [ ] Unit + integration tests present
- [ ] Documentation updated
- [ ] Constitution principles verified

## File Organization

| Pattern          | Example                      |
|-----|-------------------|----------------------|
| Features         | `features/` or `[NUM]-XXX/`    |
| Components       | `components/`, `modules/`      |
| Services         | `services/`, `handlers/`       |
| Utilities        | `utils/`, `lib/`, `helpers/`   |

### Template Structure

```
specs/[###-feature]/
├── research/
├── data-model/
├── contracts/
├── quickstart/
└── tasks/
```

## Environment

- `.env` → **Never commit** (use `.env.example`)
- Local `.env.local` → gitignored
- Sensitive values in code → invalid

### Build

```bash
npm run build          # Production build
npm run build:watch    # Watch mode
npm run deploy         # Deployment
```

## Security

1. Never commit secrets, keys, credentials
2. Validate all external input
3. Sanitize output for XSS prevention
4. Use secure password hashing
5. Implement rate limiting
6. Enable security headers
7. Audit third-party dependencies

## Contributing

1. Fork/clone repo
2. Create branch: `git checkout -b 01-add-feature-name`
3. Ensure tests pass: `npm test`
4. Run linting: `npm run lint`
5. Create spec via scaffold commands
6. Update documentation
7. Submit PR with changelog

## Guidelines for Agents

- **Cursor Rules**: Check `.cursor/rules/` or `.cursorrules`
- **Copilot**: See `.github/copilot-instructions.md`

## Tips for New Features

- Start simple; iterate with feedback
- Write specs first using framework templates
- Use Gherkin-style criteria (`Given/When/Then`)
- Document user stories with priorities (P1, P2, P3)
- Add tasks with `[P]` (parallel) and `[Story]` labels
- Include validation checklists before merging

---

**Version**: 1.0.0 | **Ratified**: Project initialization
