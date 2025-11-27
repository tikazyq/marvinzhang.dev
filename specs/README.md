# LeanSpec Configuration

This project uses [LeanSpec](https://github.com/leanspec/leanspec) for managing specifications and blog articles.

## Configuration

Specs are stored in `specs/` with auto-generated sequence numbers.

## Templates

### Default Template
Used for technical specs and feature planning.

### Article Templates ⭐

Style-specific templates for blog articles:

| Template | Command | Use Case |
|----------|---------|----------|
| `announcement` | `lean-spec create "topic" --template=announcement` | Project releases, updates |
| `tutorial` | `lean-spec create "topic" --template=tutorial` | Step-by-step guides |
| `analytical` | `lean-spec create "topic" --template=analytical` | Technical deep-dives |
| `experiential` | `lean-spec create "topic" --template=experiential` | Lessons learned |

Each template includes:
- **Focused questionnaire** for that style only
- **Progress tracking** with relevant writing stages
- **Outline structure** tailored to the style
- **Prompt references** for AI assistants

## Article Workflow

```
1. Create spec with style-specific template
2. Fill out the Questionnaire section
3. Tell AI "questionnaire complete"
4. AI generates outline → author approves
5. AI writes section by section → author reviews each
6. Update Progress table as stages complete
7. lean-spec update <spec> --status complete
```

### Article Spec Structure

| Section | Purpose | Who Fills |
|---------|---------|-----------|
| Overview | Topic + audience | Author (brief) |
| Questionnaire | Style-specific input | Author (detailed) |
| Research | Sources and findings | AI (analytical only) |
| Outline | Article structure | AI (author approves) |
| Progress | Stage tracking | Both |
| Prompts Reference | Which prompts to load | Reference only |

### Status Flow

```
planned → in-progress → complete → archived
```

- **planned**: Topic identified, not yet started
- **in-progress**: Actively researching/writing
- **complete**: Published and live
- **archived**: Deprecated or superseded

## Prompt Integration

When working on an article, reference the appropriate prompts:

```
prompts/
├── common/           # Always include
│   ├── formatting.md
│   ├── localization.md
│   └── quality-standards.md
└── styles/           # Choose one
    ├── analytical.md
    ├── tutorial.md
    ├── experiential.md
    └── announcement.md
```

See `prompts/README.md` for detailed usage instructions.
