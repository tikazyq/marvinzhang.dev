import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
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
  image?: string;
  tags: string[];
  githubUrl?: string;
  githubStars?: number;
  liveUrl?: string;
  blogUrl?: string;
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
    tags: ['Open Source', 'Go', 'Web Scraping'],
    githubUrl: 'https://github.com/crawlab-team/crawlab',
    liveUrl: 'https://www.crawlab.cn',
    blogUrl: '/blog/crawlab',
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
    tags: ['Open Source', 'Node.js', 'Content Management'],
    githubUrl: 'https://github.com/crawlab-team/artipub',
    blogUrl: '/blog/artipub',
  },
  {
    id: 'devlog',
    content: {
      en: {
        title: 'Devlog',
        description: 'Persistent memory system for AI-assisted development. Solves the critical problem of AI memory loss during extended development sessions by maintaining structured, searchable logs of tasks, decisions, and progress across conversations.',
      },
      zh: {
        title: 'Devlog',
        description: '面向AI辅助开发的持久化内存系统。通过维护任务、决策和进度的结构化可搜索日志，解决AI在长期开发会话中的内存丢失关键问题。',
      },
    },
    image: '/img/projects/devlog.svg',
    tags: ['Open Source', 'AI', 'MCP', 'TypeScript'],
    githubUrl: 'https://github.com/codervisor/devlog',
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
    tags: ['AI', 'Python', 'Web Scraping'],
    blogUrl: '/blog/crawlab-ai',
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
    tags: ['AI', 'JavaScript', 'Reading Assistant'],
    blogUrl: '/blog/sread',
  },
  {
    id: 'webspot',
    content: {
      en: {
        title: 'WebSpot',
        description: 'Intelligent web service to automatically detect web content and extract information from HTML pages. Uses advanced algorithms to identify meaningful elements, tables, and structured data for automated web scraping and content analysis.',
      },
      zh: {
        title: 'WebSpot',
        description: '智能网络服务，自动检测网页内容并从HTML页面提取信息。使用先进算法识别有意义的元素、表格和结构化数据，用于自动化网页抓取和内容分析。',
      },
    },
    tags: ['Open Source', 'Python', 'Web Content Detection'],
    githubUrl: 'https://github.com/crawlab-team/webspot',
  },
];

// Generate alphabet avatar URL
function generateAlphabetAvatar(title: string): string {
  const firstLetter = title.charAt(0).toUpperCase();
  const colors = [
    '3498db', // blue
    'e74c3c', // red
    '2ecc71', // green
    'f39c12', // orange
    '9b59b6', // purple
    '1abc9c', // turquoise
    'e67e22', // carrot
    '34495e', // wet asphalt
  ];
  const colorIndex = title.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];
  
  return `https://ui-avatars.com/api/?name=${firstLetter}&background=${bgColor}&color=ffffff&size=128&format=svg&bold=true`;
}

function ProjectCard({project}: {project: Project; key?: string}) {
  const {i18n} = useDocusaurusContext();
  const currentLocale = i18n.currentLocale as 'en' | 'zh';
  const content = project.content[currentLocale];
  const imageUrl = project.image || generateAlphabetAvatar(content.title);

  return (
    <div className={clsx('col col--6', styles.projectCard)}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <img src={imageUrl} alt={content.title} className={styles.projectImage} />
          <div className={styles.projectInfo}>
            {(project.liveUrl || project.blogUrl || project.githubUrl) ? (
              <Link
                to={project.liveUrl || project.blogUrl || project.githubUrl}
                className={styles.projectTitleLink}
                target={project.liveUrl || project.githubUrl ? "_blank" : undefined}
                rel={project.liveUrl || project.githubUrl ? "noopener noreferrer" : undefined}
              >
                <h3 className={styles.projectTitle}>{content.title}</h3>
              </Link>
            ) : (
              <h3 className={styles.projectTitle}>{content.title}</h3>
            )}
            {project.githubUrl && (
              <GitHubStarsBadge 
                githubUrl={project.githubUrl}
              />
            )}
          </div>
        </div>
        <p className={styles.projectDescription}>{content.description}</p>
        <div className={styles.projectTags}>
          {project.tags.map((tag) => (
            <span 
              key={tag} 
              className={styles.tag}
              data-category={tag === 'Open Source' || tag === 'AI' ? tag : undefined}
            >
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
          
          {/* All Projects */}
          <section className="margin-bottom--xl">
            <div className="text--center margin-bottom--lg">
              <h2 className={styles.sectionTitle}>
                <Translate id="projects.all.title">Featured Projects</Translate>
              </h2>
              <p className={styles.sectionDescription}>
                <Translate id="projects.all.description">
                  A collection of my work spanning open-source development, AI applications, and technical innovations
                </Translate>
              </p>
            </div>
            <div className={clsx('row', styles.projectsRow)}>
              {projects.map((project) => (
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