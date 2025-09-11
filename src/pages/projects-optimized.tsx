import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useMultipleGitHubStars } from '../hooks/useGitHubStars';
import GitHubStarsBadge from '../components/GitHubStarsBadge';
import styles from './projects.module.css';

interface ProjectContent {
  title: string;
  description: string;
}

interface Project {
  id: string;
  content: {
    en: ProjectContent;
    zh: ProjectContent;
  };
  image: string;
  tags: string[];
  githubUrl?: string;
  githubStars?: number;
  liveUrl?: string;
  blogUrl?: string;
  category: 'opensource' | 'ai';
}

const projects: Project[] = [
  // Open Source Projects
  {
    id: 'crawlab',
    content: {
      en: {
        title: 'Crawlab',
        description: 'Distributed web scraping management platform supporting multiple programming languages and frameworks. A comprehensive solution for large-scale data collection with advanced scheduling, monitoring, and team collaboration features.',
      },
      zh: {
        title: 'Crawlab',
        description: '分布式网络爬虫管理平台，支持多种编程语言和框架。为大规模数据收集提供全面解决方案，具有高级调度、监控和团队协作功能。',
      },
    },
    image: '/img/projects/crawlab.svg',
    tags: ['Go', 'Vue.js', 'Docker', 'MongoDB', 'Web Scraping', 'DevOps'],
    githubUrl: 'https://github.com/crawlab-team/crawlab',
    githubStars: 11000,
    liveUrl: 'https://www.crawlab.cn',
    blogUrl: '/blog/crawlab',
    category: 'opensource',
  },
  {
    id: 'artipub',
    content: {
      en: {
        title: 'ArtiPub',
        description: 'Cross-platform article publishing and management tool. Supports simultaneous publishing to multiple platforms including WeChat, Zhihu, Juejin, SegmentFault, and more. Streamlines content distribution for technical writers.',
      },
      zh: {
        title: 'ArtiPub',
        description: '跨平台文章发布管理工具。支持同时发布到微信、知乎、掘金、SegmentFault等多个平台。为技术写作者简化内容分发流程。',
      },
    },
    image: '/img/projects/artipub.png',
    tags: ['Node.js', 'Vue.js', 'Electron', 'Content Management', 'Automation'],
    githubUrl: 'https://github.com/crawlab-team/artipub',
    githubStars: 3000,
    blogUrl: '/blog/artipub',
    category: 'opensource',
  },
  {
    id: 'devlog',
    content: {
      en: {
        title: 'DevLog',
        description: 'Developer activity tracking and analytics platform. Monitors coding patterns, productivity metrics, and provides insights into development workflows. Helps teams understand and optimize their development processes.',
      },
      zh: {
        title: 'DevLog',
        description: '开发者活动跟踪和分析平台。监控编码模式、生产力指标，并提供开发工作流程的洞察。帮助团队了解和优化开发流程。',
      },
    },
    image: '/img/projects/devlog.svg',
    tags: ['Go', 'React', 'Analytics', 'Developer Tools', 'Productivity'],
    githubUrl: 'https://github.com/tikazyq/devlog',
    githubStars: 500,
    category: 'opensource',
  },
  
  // AI Projects
  {
    id: 'crawlab-ai',
    content: {
      en: {
        title: 'Crawlab AI',
        description: 'Next-generation intelligent web crawler powered by Large Language Models (LLM). Automatically extracts structured data from websites without manual rule configuration, revolutionizing data collection workflows.',
      },
      zh: {
        title: 'Crawlab AI',
        description: '由大型语言模型（LLM）驱动的下一代智能网络爬虫。无需手动规则配置即可自动从网站提取结构化数据，革命性地改变数据收集工作流程。',
      },
    },
    image: '/img/projects/crawlab.svg',
    tags: ['AI', 'LLM', 'Python', 'OpenAI', 'Web Scraping', 'Automation'],
    blogUrl: '/blog/crawlab-ai',
    category: 'ai',
  },
  {
    id: 'sread',
    content: {
      en: {
        title: 'SRead',
        description: 'Intelligent reading assistant powered by AI. Provides smart summarization, Q&A capabilities, and mind mapping for articles and documents. Available as web app and Chrome extension for enhanced reading experience.',
      },
      zh: {
        title: 'SRead (思阅)',
        description: 'AI驱动的智能阅读助手。为文章和文档提供智能摘要、问答功能和思维导图。提供网页应用和Chrome扩展，增强阅读体验。',
      },
    },
    image: '/img/projects/sread.svg',
    tags: ['AI', 'NLP', 'Chrome Extension', 'Reading Assistant', 'Summarization'],
    liveUrl: 'https://sread.ai',
    blogUrl: '/blog/sread',
    category: 'ai',
  },
  {
    id: 'devlog-ai',
    content: {
      en: {
        title: 'DevLog AI',
        description: 'AI-enhanced version of DevLog with intelligent code analysis, automated documentation generation, and smart development insights. Uses machine learning to provide personalized productivity recommendations.',
      },
      zh: {
        title: 'DevLog AI',
        description: 'DevLog的AI增强版本，具有智能代码分析、自动文档生成和智能开发洞察。使用机器学习提供个性化生产力建议。',
      },
    },
    image: '/img/projects/devlog.svg',
    tags: ['AI', 'Machine Learning', 'Code Analysis', 'Documentation', 'Productivity'],
    category: 'ai',
  },
];

function ProjectCard({project}: {project: Project; key?: string}) {
  const {i18n} = useDocusaurusContext();
  const currentLocale = i18n.currentLocale as 'en' | 'zh';
  const content = project.content[currentLocale];

  return (
    <div className={clsx('col col--6', styles.projectCard)}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <img src={project.image} alt={content.title} className={styles.projectImage} />
          <div className={styles.projectInfo}>
            <h3 className={styles.projectTitle}>{content.title}</h3>
            {project.githubUrl && (
              <GitHubStarsBadge 
                githubUrl={project.githubUrl} 
                fallbackStars={project.githubStars}
                compact={true}
              />
            )}
          </div>
        </div>
        <p className={styles.projectDescription}>{content.description}</p>
        <div className={styles.projectTags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.projectLinks}>
          {project.githubUrl && (
            <Link
              to={project.githubUrl}
              className={clsx('button button--sm button--outline button--primary', styles.projectLink)}
              target="_blank"
              rel="noopener noreferrer">
              <Translate id="projects.github">GitHub</Translate>
            </Link>
          )}
          {project.liveUrl && (
            <Link
              to={project.liveUrl}
              className={clsx('button button--sm button--primary', styles.projectLink)}
              target="_blank"
              rel="noopener noreferrer">
              <Translate id="projects.live">Live Demo</Translate>
            </Link>
          )}
          {project.blogUrl && (
            <Link
              to={project.blogUrl}
              className={clsx('button button--sm button--secondary', styles.projectLink)}>
              <Translate id="projects.blog">Read More</Translate>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const openSourceProjects = projects.filter(project => project.category === 'opensource');
  const aiProjects = projects.filter(project => project.category === 'ai');

  // Pre-fetch all GitHub URLs for better performance
  const allGitHubUrls = projects
    .map(project => project.githubUrl)
    .filter(Boolean) as string[];
  
  // This will batch fetch all repositories at once
  useMultipleGitHubStars(allGitHubUrls);

  return (
    <Layout
      title={translate({
        id: 'projects.title',
        message: 'Projects',
        description: 'The title of the projects page'
      })}
      description={translate({
        id: 'projects.description',
        message: 'Explore Marvin Zhang\'s portfolio of open-source projects, AI applications, and technical innovations in web scraping, data analysis, and machine learning.',
        description: 'The description of the projects page'
      })}>
      
      <div className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">
            <Translate id="projects.hero.title">My Projects</Translate>
          </h1>
          <p className="hero__subtitle">
            <Translate id="projects.hero.subtitle">
              Open-source projects, AI applications, and technical innovations
            </Translate>
          </p>
        </div>
      </div>

      <main>
        <div className="container margin-vert--lg">
          
          {/* Open Source Projects */}
          <section className="margin-bottom--xl">
            <div className="text--center margin-bottom--lg">
              <h2 className={styles.sectionTitle}>
                <Translate id="projects.opensource.title">Open Source Projects</Translate>
              </h2>
              <p className={styles.sectionDescription}>
                <Translate id="projects.opensource.description">
                  Community-driven projects with open source code and collaborative development
                </Translate>
              </p>
            </div>
            <div className="row">
              {openSourceProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>

          {/* AI Projects */}
          <section className="margin-bottom--xl">
            <div className="text--center margin-bottom--lg">
              <h2 className={styles.sectionTitle}>
                <Translate id="projects.ai.title">AI Projects</Translate>
              </h2>
              <p className={styles.sectionDescription}>
                <Translate id="projects.ai.description">
                  Intelligent applications powered by artificial intelligence and machine learning
                </Translate>
              </p>
            </div>
            <div className="row">
              {aiProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className={styles.ctaSection}>
            <div className="text--center">
              <h2>
                <Translate id="projects.cta.title">Interested in Collaboration?</Translate>
              </h2>
              <p className={styles.ctaDescription}>
                <Translate id="projects.cta.description">
                  I'm always open to discussing new projects, opportunities, and innovative ideas.
                </Translate>
              </p>
              <div className={styles.ctaButtons}>
                <Link
                  to="https://github.com/tikazyq"
                  className="button button--primary button--lg margin-right--md"
                  target="_blank"
                  rel="noopener noreferrer">
                  <Translate id="projects.cta.github">View All Repositories</Translate>
                </Link>
                <Link
                  to="/about"
                  className="button button--secondary button--lg">
                  <Translate id="projects.cta.contact">Get in Touch</Translate>
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </Layout>
  );
}

export default Projects;