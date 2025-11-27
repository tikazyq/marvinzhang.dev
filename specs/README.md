# LeanSpec Configuration

This project uses [LeanSpec](https://github.com/leanspec/leanspec) for managing specifications and blog articles.

## Configuration

Specs are stored in `specs/` with auto-generated sequence numbers.

## Templates

### Default Template
Used for technical specs and feature planning.

### Article Template
Used for blog articles. Create with:
```bash
lean-spec create "article-topic" --tags article,style:analytical,lang:bilingual
```

## Article Workflow Integration

Blog articles are tracked as specs with special tags:

| Tag Pattern | Description | Values |
|-------------|-------------|--------|
| `article` | Marks as blog article | Required |
| `style:*` | Writing style | `analytical`, `tutorial`, `experiential`, `announcement` |
| `lang:*` | Language target | `en`, `zh`, `bilingual` |

### Creating an Article Spec

```bash
# Analytical deep-dive
lean-spec create "rice-theorem-testing" --tags article,style:analytical,lang:bilingual

# Tutorial
lean-spec create "react-hook-tutorial" --tags article,style:tutorial,lang:bilingual

# Personal insight
lean-spec create "five-years-opensource" --tags article,style:experiential,lang:bilingual

# Project announcement
lean-spec create "crawlab-2-release" --tags article,style:announcement,lang:bilingual
```

### Article Spec Structure

Article specs contain:
- **Overview**: Topic summary and target audience
- **Research**: Sources and key findings (for analytical/tutorial)
- **Outline**: Section structure and visual planning
- **Progress**: Writing status by section

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
