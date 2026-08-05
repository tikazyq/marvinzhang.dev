# 封面 prompt — 怎么才能不给 agent 当保姆？

产出：`static/img/blog/2026-08-10-stop-babysitting-your-agent/cover.png`
（1915×821，2.333:1，未裁切）

外部文生图模型，一次出图，直接采用。

```
A warm, flat editorial illustration in a friendly modern style with soft
muted colors — dusty blue, warm cream, muted terracotta, sage green —
clean linework, subtle paper grain, no gradients.

Scene: a long conveyor track runs across the frame from left to right.
Small identical parts travel along it at even spacing. Standing on the
track are three sturdy fixed gateposts, like simple archways, and every
part must pass through them; one defective part is being nudged off into
a side bin by a gate. At the left end a friendly boxy machine with a
single articulated arm works steadily, unattended. In the right
foreground, a person in a green shirt sits leaned back in an office
chair holding a coffee mug, relaxed, looking off out of frame rather
than at the machine — clearly free to walk away.

The loop runs itself; the gates do the checking; the human is not
supervising.

CRITICAL: absolutely no text, no letters, no numbers, no signage, no
labels anywhere in the image. Compose to fill the entire frame edge to
edge — do NOT leave empty space for a title.

--ar 21:9
```

## 为什么是这些词

| prompt 里的元素 | 对应文章的哪一句 |
| --- | --- |
| 三道固定门柱，每个零件都得穿过 | 真关卡由动作的事实触发，它同不同意都得停 |
| 次品被门拨进旁边的盒子 | 验收由外部条件做，不由干活的一方说了算 |
| 机器在左端自己干，无人看管 | agent 已经能自己接着干 |
| 人靠在椅子上，眼睛看向画外 | 「不当保姆」= 该看还是要看，但不用守在旁边 |

**绿衬衫**是硬要求：四张正文插图里的主角都穿绿衬衫，封面跟着穿，整组图才是一套。这条已写进 `wechat-publish` skill。

**禁止文字**同样是硬要求，中日韩文字在文生图模型里基本必然渲染成乱码；不写死，模型会自己往厂房里加招牌。

## 尺寸

21:9 = 2.333:1，公众号封面标称 2.35:1（900×383）。差 0.7%，在 900px 宽上约 3 像素。**不要裁切**，直接用模型输出。
