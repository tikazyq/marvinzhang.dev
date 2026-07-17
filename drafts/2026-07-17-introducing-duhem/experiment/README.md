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

## 一致口径的补充测量（应作者要求）

| 口径 | Duhem VD | Playwright |
| ---- | -------- | ---------- |
| A. 机械层 vs 机械层（`vd-mech/`，VD 去掉 description） | 150 行 / 979 token | 42 行 / 534 token |
| A. R1 需求变更 diff（`r1-vd-mech/`） | +35 行 / ~243 token | +8 行 / ~135 token |
| B. 带意图 vs 带意图（`pw-intent/`，PW 加同等验收注释） | 188 行 / 1502 token | 59 行 / 837 token |

### VD 机械层 979 token 的构成

- `environment:`+`inputs:` 声明 ≈ 138 token（口径差：PW 侧外部化到 CI/env）
- 判定管道样板 ≈ 281 token（step id + `outputs: satisfied` 映射 +
  `assertions` 引用——同一语义写三遍；v0.x schema 的 DX 债，可通过
  assert 步隐式判定压掉）
- 其余 ≈ 560 token：步骤/locator 本体，与 PW（534）同量级

单条"按钮可见"断言：VD 62 token vs PW 29 token；差值几乎全是管道样板。

结论修正：笔墨上 VD 不占优（去掉样板税后约打平）；优势在结构
（意图绑定、no-mock 结构性排除、独立判定与证据、环境定义随身带）。
