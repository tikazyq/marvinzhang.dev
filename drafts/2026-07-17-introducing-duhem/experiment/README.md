# 实测：VD vs Playwright 的体量与变更成本（文章数字来源）

对照对象：`crawlab-pro/.duhem/ui-next/duhem.yml`（真实 VD）vs 同等覆盖、
地道写法的 Playwright 测试（`pw/login.spec.ts` + `playwright.config.ts`）。
Token 用 tiktoken o200k_base；diff 用 `git diff --no-index`。

## 关键转折：实测暴露了 Duhem 自己的一个 DX 缺陷

首轮测量发现：VD 里每个断言步都要写 id + `outputs:{satisfied:satisfied}`
+ `assertions:` 引用三件套，占机械层近三成 token。这不是"声明式"的固有
代价，而是 v0.x 的样板税。据此在 onsager-ai/duhem 开了 spec #253 并实现
（PR #254）：断言类动作隐式判定 `satisfied == true`，三件套整体消失。

`vd/` = 修复前（含样板）；`vd-terse/` = 修复后（#253 隐式判定形式，已用
带 #253 的 duhem 二进制 `validate` 通过）。

## 体量（同等覆盖）

| | 完整 VD（含意图层描述） | 机械层（剥离描述） |
| --- | --- | --- |
| Playwright spec+config | 534 tok | 534 tok |
| VD 修复前（样板） | 1502 tok | 979 tok |
| VD 修复后（#253 terse） | 1221 tok | 698 tok |
| #253 带来的下降 | −281 tok（−18%） | −281 tok（−29%） |

结论：#253 把机械层从 979 砍到 698（−29%，正好是样板税）。但 VD 机械层
仍是 Playwright 的约 1.3 倍（698 vs 534，修复前是 1.8 倍）。剩下的差距来自
两处：① VD 随身带 `environment:`/`inputs:` 声明（约 138 tok，Playwright 侧
外部化到 CI/env）；② 每个断言步的 YAML 仍比一行 Playwright fluent 调用长几行。

意图层（描述，约 468 tok）是 VD 比测试程序多出来的那部分——也正是测试
程序不携带、agent 换几轮后最值钱的东西。

## 变更成本：加一条"错误密码必须被拒"

| | 行 diff | 变更 token |
| --- | --- | --- |
| Playwright | +8 | 135 |
| VD 修复前 | +42 | 317 |
| VD 修复后（terse） | +33 | 252 |

结论：#253 把新增一条验收从 +42 行降到 +33 行；仍多于 Playwright 的 +8，
因为每个断言步是几行 YAML 而非一行链式调用。

## 一边倒的账：运行时

VD 与传统 e2e 每次运行零模型调用；模型驱动的 AI 测试框架（Midscene 类）
每步都过模型，token 是真金白银，且放进每次构建的关卡里越滚越大。这一项
无论字数怎么算都是 Duhem/传统 e2e 占优。

## 局限

单场景、smoke 级；未测 Playwright 套件规模化后的 helper/fixture/page-object
积累；未测模型驱动框架的实际运行开销。
