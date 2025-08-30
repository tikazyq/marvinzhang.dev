# 实战 CI/CD：微软加持的 GitHub Actions，怎么用才香？

## 引子

**[GitHub Actions](https://docs.github.com/cn/actions)** 是 GitHub 官方推出的 **CI/CD** 工作流（Workflow）服务，旨在减轻开源贡献者们运维负担，让云原生 **DevOps** 赋能开源社区。如果您不知道什么是 CI/CD、DevOps，请参考笔者之前在夜幕团队公众号写的文章[《用开源软件轻松打造企业级DevOps工作流》](https://mp.weixin.qq.com/s?src=11&timestamp=1665707721&ver=4103&signature=gLUg5OqfEcWYe3ocTknKlmcbTy04ysBk5Su*XrFFNPbA79eJPI4OfN8hwLZAv1jRoOolcJMg13UcWdw6tQBUyZi8gqH0zsl8t8-73Bf96uPkI3YNa0pbCnnFppxLcIYs&new=1)。笔者的开源项目，例如 [Crawlab](https://github.com/crawlab-team/crawlab)、[ArtiPub](https://github.com/crawlab-team/artipub)，都集成了 GitHub Actions。作为开发贡献者，我认为 GitHub Actions 不仅好用，而且是真香免费（这是最主要的）。希望很多不了解如何将 GitHub Actions 运用在自己的开源项目的开发者，可以从本文中得到灵感。

## 从官方文档开始

对于 GitHub Actions 不熟悉的朋友，我强烈推荐你先阅读 GitHub Actions [官方文档](https://docs.github.com/cn/actions)，这里有[视频介绍](https://youtu.be/cP0I9w2coGU)、[快速开始](https://docs.github.com/cn/actions/quickstart)、[例子](https://docs.github.com/cn/actions/examples)、概念、原理等等。如果把文档研究透了，再结合自己平时运用 CI/CD 的经验，应该可以很轻松的在 GitHub 上做 DevOps。本文所用到的相关代码，都可以在官方文档上找到对应的参考指南。

![GitHub Actions Docs](https://codao.crawlab.cn/images/2022-10-14-004252.png)

## 思路

先理清一下我们想要实现什么：用 GitHub Actions 来运行仓库中的爬虫获取每日 [GitHub Trending](https://github.com/trending)。

整个实现流程如下：

1. 上传爬虫代码到 GitHub 仓库
2. 创建 GitHub Actions 工作流，并提交
3. 触发 GitHub Actions 工作流运行爬虫
4. 查看爬虫运行状态

## 爬虫代码

现在开始实战了！

我们先把爬虫代码放到 GitHub 仓库。今天的主题是 GitHub Actions，因此爬虫实现部分不做多的解析。

核心代码如下：

```python
# main.py
import requests
from bs4 import BeautifulSoup


def main():
    res = requests.get('https://github.com/trending')
    sel = BeautifulSoup(res.content)
    rows = sel.select('article.Box-row')
    for row in rows:
        repo_name = '/'.join(map(lambda x: x.strip(), row.select('h1 a')[0].text.strip().split('/')))
        description = row.select('p')[0].text.strip()
        stars = row.select('a.Link--muted')[0].text.strip()
        print(f'{repo_name} ({stars} stars): {description}')


if __name__ == '__main__':
    main()
```

## 第一个工作流

首先，咱们在 GitHub 仓库主页中找到 **Actions** 标签，再点击它。

![GitHub Actions Repo Page](https://codao.crawlab.cn/images/2022-10-14-004737.png)

现在你会看到上述这个欢迎页面，表明你的仓库还没有加入任何 GitHub Actions 工作流。你也可以看到上面有不少官方的介绍以及一些流行的模版工作流，可以直接点击某一个工作流的 `Configure` 按钮来新建一个工作流。

搜索 `Python`，可以找到一个运行 Python 程序的工作流。就它了。

![Python Application Workflow](https://codao.crawlab.cn/images/2022-10-14-005218.png)

点击 `Configure` 按钮之后，你会进入如下编辑页面。

![Create Workflow](https://codao.crawlab.cn/images/2022-10-14-005350.png)

所谓 GitHub 工作流，其实是一个 **`YAML` 配置文件**，类似于现在很流行的 PaaS、IaaS、云原生应用之类的，都用代码来自动化配置。

可以看到其中已经有一些默认工作流代码，我们这里只需要稍微改动一下。

```yaml
name: GitHub Trending Crawler

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

permissions:
  contents: read

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    - name: Set up Python 3.10
      uses: actions/setup-python@v3
      with:
        python-version: "3.10"
    - name: Install dependencies
      run: |
        cd 2022-10/github-actions-python
        python -m pip install --upgrade pip
        if [ -f requirements.txt ]; then pip install -r requirements.txt; fi
    - name: Run
      run: |
        cd 2022-10/github-actions-python
        python main.py
```

在界面上点击提交（Commit），你应该就会看到在 `.github/workflows` 目录下生成了 `github-trending-crawler.yml` 这个工作流配置文件。

简单来说，上面的工作流做了几件事情：

1. 检出（Checkout）该仓库的代码
2. 设置 Python 运行环境
3. 安装依赖
4. 运行程序

## 查看运行情况

我们提交了这个工作流，它应该会**自动运行**，因为工作流中默认设置触发条件。

```yaml
on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]
```

这表示每当我们推送提交（Push Commits）或合并请求（Pull Request）时，该工作流会自动触发执行。

现在我们看看运行情况，如果你同样来到 `Actions` 页面，你会看到出现了工作流的执行列表。

![GitHub Actions Executions](https://codao.crawlab.cn/images/2022-10-14-013733.png)

点进最新的那个，再点击 `build`，你会看到相关日志，然后我们展开 `Run` 这个步骤的日志。

![GitHub Actions Logs](https://codao.crawlab.cn/images/2022-10-14-013913.png)

可以看到，GitHub Trending 的每日 Top 仓库，我们已经按照程序预期的一样，打印了出来。检查一下是否跟真实页面上的一致。

![GitHub Trending](https://codao.crawlab.cn/images/2022-10-14-014113.png)

太好了，输出结果跟实际的页面结果完全一致。大功告成！

## 定时任务

运行爬虫怎么能没有**定时任务**呢？而 GitHub Actions 恰巧支持！那么我们就欣然加上吧。

打开之前创建的工作流编辑页面，将在触发条件代码区域中，加上一段代码，编辑后内容如下。

```yaml
on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]
  schedule:
    - cron:  '0 * * * *'
```

其中，Cron 表达式 `0 * * * *` 表示每小时 0 分触发一次。对 Cron 表达式不熟悉的读者，可以参考 [Cron Guru](https://crontab.guru/)。

编辑好提交之后，我们应该能看到这个每小时执行的定时爬虫任务。

需要详细了解 GitHub Actions 的触发条件，请参考[相关官方文档](https://docs.github.com/cn/actions/using-workflows/events-that-trigger-workflows)。

## 总结

本篇文章介绍了如何利用 GitHub Actions 工作流，来部署一个简单的**爬虫定时任务**。用到了技术如下：

1. GitHub 代码仓库
2. GitHub Actions 工作流，包括定时任务触发
3. Python 爬虫开发，包括依赖库 [requests](https://pypi.org/project/requests/)、[bs4](https://pypi.org/project/bs4/)

整个代码示例仓库在 GitHub 上: https://github.com/tikazyq/codao-code

## 社区

如果您对笔者的文章感兴趣，可以加笔者微信 tikazyq1 并注明 "码之道"，笔者会将你拉入 "码之道" 交流群。

本篇文章英文版同步发布在 [dev.to](https://dev.to/tikazyq/cicd-in-action-how-to-use-microsofts-github-actions-in-a-right-way-4g89)，技术分享无国界，欢迎大佬们指点。
