# Bold Formatting Validation Examples

This document demonstrates the bold formatting issues detected by the validators and their fixes.

## Issue 1: Multiple Bold Sections Without Space

### Problem
When multiple bold sections appear on the same line in Chinese text, MDX may fail to parse the second bold section if there's no space before the opening `**`.

### Example

**❌ Incorrect (Missing Space):**
```markdown
这与**语法属性（Syntactic Properties）**形成对比
```

**Rendered Result:**
- The second bold section may render as literal `**语法属性（Syntactic Properties）**` instead of **bold text**

**✅ Correct (With Space):**
```markdown
这与 **语法属性（Syntactic Properties）** 形成对比
```

**Rendered Result:**
- Both sections render properly as bold text: 这与 **语法属性（Syntactic Properties）** 形成对比

### Why This Happens
MDX's parser can have issues with consecutive formatting markers when they're not properly separated. The space ensures the parser recognizes the second bold section as a distinct formatting element.

---

## Issue 2: Bold Text With Quotes

### Problem
When bold markers wrap text containing double quotes, the quotes can interfere with MDX parsing if they're directly adjacent to the `**` markers.

### Example

**❌ Incorrect (No Spacing):**
```markdown
**"所有程序行为"** 是一个语义属性
```

**Rendered Result:**
- May fail to render as bold, or render inconsistently
- Parser may misinterpret where the bold section ends

**✅ Correct (With Spacing):**
```markdown
** "所有程序行为" ** 是一个语义属性
```

**Rendered Result:**
- Renders reliably: ** "所有程序行为" ** 是一个语义属性

### Why This Happens
The quotes next to the `**` can confuse the MDX parser about the boundaries of the bold section. Adding spaces provides clear separation.

---

## Real-World Examples from the Codebase

### Example 1: Multiple Technical Terms

**Before:**
```markdown
LLM **幻觉（Hallucination）** 是自 ChatGPT 问世以来大家一直诟病的问题。而为了缓解幻觉问题，研究人员提出了多种方法，目前主流的方法是**检索增强生成（RAG）**、**微调（Fine Tuning）** 以及 **智能体（Agent）**。
```

**Issue:** Missing space before the second, third, and fourth bold sections.

**After:**
```markdown
LLM **幻觉（Hallucination）** 是自 ChatGPT 问世以来大家一直诟病的问题。而为了缓解幻觉问题，研究人员提出了多种方法，目前主流的方法是 **检索增强生成（RAG）**、 **微调（Fine Tuning）** 以及 **智能体（Agent）**。
```

### Example 2: Quoted Content in Bold

**Before:**
```markdown
系统一可以根据环境快速做出直觉判断。这暗示着，智能体应用设计中的**工具**需要尽可能**简单而明确**。
```

**After:**
```markdown
系统一可以根据环境快速做出直觉判断。这暗示着，智能体应用设计中的 **工具** 需要尽可能 **简单而明确**。
```

---

## Validation Tools

### Quick Check (Source-based)
```bash
# Check for issues
pnpm run validate:zh-bold-source

# Auto-fix issues
pnpm run validate:zh-bold-source:fix

# Check specific file
pnpm run validate:zh-bold-source:file 2025-10-04-fundamental-limits-in-computing.mdx
```

### Thorough Check (Rendered output)
```bash
# Check actual rendered HTML (requires Playwright)
pnpm run validate:zh-bold

# Skip build if already built
pnpm run validate:zh-bold:skip-build
```

---

## Best Practices

1. **Always add a space before the second bold section on the same line**
   - Use: `text1 **bold1** text2 **bold2**`
   - Not: `text1 **bold1** text2**bold2**`

2. **Add spaces inside bold markers when wrapping quoted text**
   - Use: `** "quoted text" **`
   - Not: `**"quoted text"**`

3. **Run validation before committing**
   ```bash
   pnpm run validate:zh-bold-source
   ```

4. **Use auto-fix for quick corrections**
   ```bash
   pnpm run validate:zh-bold-source:fix
   ```

5. **Check rendered output for final verification**
   - After auto-fix, visually inspect the rendered page
   - Use `pnpm dev:zh` to preview Chinese blog posts

---

## CI/CD Integration

The GitHub Actions workflow automatically validates formatting on:
- Pull requests affecting Chinese blog posts
- Pushes to main branch
- Manual workflow dispatch

Failed checks will post a comment on the PR with instructions to fix the issues.
