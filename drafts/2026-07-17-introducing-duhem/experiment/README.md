# 实测：VD vs Playwright 的变更成本（文章引用的数字来源）

对照对象：`crawlab-pro/.duhem/ui-next/duhem.yml`（真实 VD，剥离叙事注释、
保留 description 意图层 → `vd/duhem.yml`）vs 同等覆盖、地道写法的
Playwright 测试（`pw/login.spec.ts` + `playwright.config.ts`）。

Token 用 tiktoken o200k_base 计。diff 用 `git diff --no-index`。

| 测量 | Duhem VD | Playwright |
| ---- | -------- | ---------- |
| 基线体量 | 188 行 / 1502 token（意图层 description ≈ 468 token） | 42 行 / 534 token |
| R1 需求变更：加"错误密码必须被拒"（`r1-*`） | +42 行 / ~317 token | +8 行 / ~135 token |
| R2 实现变更：按钮文案 Sign In→Log in（`r2-*`） | ±7 行 / ~200 token | ±4 行 / ~218 token |

结论（写进文章的表述）：声明式并不天生省笔墨；VD 多出的重量几乎全是
意图层。一边倒的是运行时账单：VD/传统 e2e 每次运行零模型调用，
模型驱动测试每步都烧 token。

局限：单场景、smoke 级套件；未测 Playwright 套件规模化后的
helper/fixture/page-object 积累，也未测模型驱动框架的实际运行开销。
