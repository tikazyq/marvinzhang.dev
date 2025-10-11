# Quick Start: The Economist Writing Style for marvinzhang.dev

## 📚 What's New?

We've added **The Economist-inspired writing style guidelines** to improve blog content quality through clarity, precision, and data-driven argumentation.

## 🎯 The Five Core Principles

### 1. ✨ Clarity
**Before**: "The implementation leverages sophisticated algorithmic approaches that utilize various optimization techniques."

**After**: "The system runs faster by caching frequent queries and processing them in batches."

**Rule**: Lead with your main point. One idea per sentence. No jargon without definition.

---

### 2. 🎯 Precision
**Before**: "This approach can significantly improve performance in many scenarios."

**After**: "Lazy loading reduced our Next.js 14 app's initial bundle size by 40%, cutting load time from 3.2s to 1.9s on 3G connections."

**Rule**: Use specific numbers, name technologies, cite sources, timestamp claims.

---

### 3. ⚡ Active Voice
**Before**: "The database query is executed by the ORM, and results are transformed into objects."

**After**: "The ORM executes the database query and transforms results into objects."

**Rule**: Subject acts on object. Makes writing vigorous and direct.

---

### 4. 🌟 Concrete Examples
**Before**: "Caching improves performance by storing frequently accessed data."

**After**: "Think of caching as a librarian keeping popular books on their desk. Our Redis cache keeps your most-requested API responses in fast memory, cutting response time from 200ms to 5ms."

**Rule**: Use real-world scenarios, familiar analogies, concrete numbers, and visual aids.

---

### 5. 📊 Data-Driven
**Before**: "Modern bundlers are much faster than older tools."

**After**: "Vite builds our production app in 12 seconds compared to Webpack's 47 seconds—a 4x speedup we measured across 50 CI runs. The [Vite 4.0 benchmark suite](https://vitejs.dev/guide/performance.html) shows similar improvements."

**Rule**: Back claims with measurements, cite research, link sources, show before/after.

---

## 📖 Where to Find Everything

### Core Documentation
- **Full Style Guide**: `.github/instructions/economist-style-principles.instructions.md` (16KB)
  - Complete principles with examples
  - Quality checklist
  - Sentence-level craft guidance

- **Sample Article**: `blog/2025-10-11-why-your-code-reviews-are-failing-and-how-to-fix-them.mdx`
  - Bilingual (EN + ZH)
  - Demonstrates all principles
  - ~3,500 words each

- **Usage Guide**: `docs/ECONOMIST_STYLE_GUIDE_README.md` (9KB)
  - How to apply guidelines
  - Integration with existing principles
  - FAQ and tips

- **Implementation Summary**: `docs/ECONOMIST_IMPLEMENTATION_SUMMARY.md` (7KB)
  - Overview of deliverables
  - Before/after comparisons
  - Validation results

### Quick Reference
```
.github/instructions/
├── economist-style-principles.instructions.md  ← Full guide
├── writing-guidelines.instructions.md          ← MDX formatting
└── writing-workflow.instructions.md            ← 4-stage process

blog/
└── 2025-10-11-why-your-code-reviews-are-failing-and-how-to-fix-them.mdx  ← Sample

docs/
├── ECONOMIST_STYLE_GUIDE_README.md         ← Usage guide
└── ECONOMIST_IMPLEMENTATION_SUMMARY.md     ← Overview
```

---

## 🚀 How to Use

### For Writing New Articles

**Step 1: Start with Clarity**
- What's your main point? State it in paragraph one
- Make it concrete: use numbers, names, examples

**Step 2: Add Precision**
- Replace "many" → specific count
- Replace "faster" → "3x faster" or "from 200ms to 50ms"
- Add citations for claims

**Step 3: Use Active Voice**
- "React renders" not "is rendered by React"
- "We built" not "was built"
- Aim for 80%+ active sentences

**Step 4: Ground with Examples**
- Every abstract concept needs a concrete example
- Use familiar analogies (librarian with books, parallel universes)
- Show real data, not hypotheticals

**Step 5: Support with Data**
- Link to research papers, official docs, benchmark suites
- Include before/after measurements
- Show real-world results from named companies

### For Reviewing Articles

Use this checklist:

```markdown
Clarity
- [ ] Main point in first paragraph?
- [ ] One idea per sentence?
- [ ] Technical terms defined at first use?

Precision
- [ ] Specific numbers instead of "many", "significant"?
- [ ] Technologies named with versions?
- [ ] Claims time-stamped?
- [ ] Sources cited?

Active Voice
- [ ] 80%+ active construction?
- [ ] Strong verbs carrying meaning?

Examples
- [ ] Abstract concepts grounded with concrete examples?
- [ ] Metaphors clarify rather than confuse?

Data
- [ ] Major claims backed by evidence?
- [ ] Measurements shown for performance assertions?
- [ ] Sources linked?
```

---

## 💡 Quick Wins

### 5-Minute Improvements
1. **Front-load value**: Move your conclusion to paragraph one
2. **Add one number**: Find your vaguest claim, make it specific
3. **Fix passive voice**: Search for "is", "was", "were" + past participle
4. **Add one citation**: Link your biggest claim to a source
5. **Concrete example**: Take your most abstract paragraph, add a real-world scenario

### Before Publishing
Run through the quality checklist in `.github/instructions/economist-style-principles.instructions.md`:
- [ ] Clarity: Main point clear immediately
- [ ] Precision: Numbers, names, timestamps present
- [ ] Active Voice: Dominates the prose
- [ ] Examples: Concrete and helpful
- [ ] Evidence: Claims supported

---

## 🌍 Works for Both Languages

The principles apply to **both English and Chinese** content:
- EN: Apply principles directly
- ZH: Apply while maintaining 形不同而意同 (same meaning, different form)

Example (from sample article):
- **EN**: "Your team reviews 47 pull requests per week..."
- **ZH**: "你的团队每周评审 47 个拉取请求（Pull Request）..."

Both versions: specific number (47), named concept (pull requests), active voice (team reviews).

---

## 🎓 Learn by Example

The sample article `blog/2025-10-11-why-your-code-reviews-are-failing-and-how-to-fix-them.mdx` demonstrates:

| Principle | Example from Article |
|-----------|---------------------|
| **Clarity** | "$100,000 Rubber Stamp" - immediately clear problem |
| **Precision** | "SmartBear study of 2,500 reviews", "35% defect increase" |
| **Active Voice** | "Teams review" not "are reviewed", "We implemented" not "was implemented" |
| **Examples** | "Think of reviews as theater—performed for compliance" |
| **Data** | Table showing defect detection rates drop from 85% to 35% by PR size |

Read it to see how principles work together in real content.

---

## 🤔 FAQ

**Q: Can I still use technical terminology?**
A: Yes! Precision requires accurate terms. Just define them clearly at first use.

**Q: Does every article need data?**
A: Not data-heavy, but evidence-backed. For concepts, evidence might be logical reasoning. For performance, show measurements.

**Q: Will this change my voice?**
A: No. These are principles, not templates. They provide clarity and precision; your personality provides the unique voice.

**Q: What about code examples?**
A: Still use them, but sparingly. Economist style prefers diagrams, tables, and conceptual explanations. Code when the syntax itself is the learning point (≤10 lines).

---

## 📈 Expected Impact

Teams that adopt clear, precise, data-driven writing see:
- ✅ **Higher engagement**: Readers understand on first reading
- ✅ **More trust**: Evidence and citations build credibility
- ✅ **Better retention**: Concrete examples make concepts memorable
- ✅ **Actionable content**: Specific guidance readers can implement

The Economist's 175+ year success proves these principles work. Now they work for technical content too.

---

## 🎯 Next Steps

1. **Read the full style guide**: `.github/instructions/economist-style-principles.instructions.md`
2. **Study the sample article**: See principles in action
3. **Try one principle**: Pick active voice or specific numbers
4. **Request feedback**: Use the quality checklist
5. **Iterate**: Gradually incorporate more principles

Start small. Improve consistently. Your writing (and readers) will thank you.

---

**Remember**: Clarity is kindness. Make complex ideas simple, abstract concepts concrete, and dry topics engaging. That's the Economist way—now it's the marvinzhang.dev way too.
