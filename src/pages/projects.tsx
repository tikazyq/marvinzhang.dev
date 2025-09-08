import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import styles from './projects.module.css';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  blogUrl?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: 'Crawlab',
    description: 'Distributed web scraping management platform supporting multiple programming languages and frameworks. A comprehensive solution for large-scale data collection with advanced scheduling, monitoring, and team collaboration features.',
    image: 'https://raw.githubusercontent.com/crawlab-team/crawlab/master/docs/img/logo.png',
    tags: ['Go', 'Vue.js', 'Docker', 'MongoDB', 'Web Scraping', 'DevOps'],
    githubUrl: 'https://github.com/crawlab-team/crawlab',
    liveUrl: 'https://www.crawlab.cn',
    blogUrl: '#',
    featured: true,
  },
  {
    title: 'SRead',
    description: 'AI-powered reading assistant that helps users extract key insights from articles and documents. Features intelligent summarization, Q&A capabilities, and seamless integration via Chrome extension.',
    image: 'https://sread.ai/logo.png',
    tags: ['AI', 'NLP', 'React', 'Chrome Extension', 'LangChain'],
    liveUrl: 'https://sread.ai',
    blogUrl: '#',
    featured: true,
  },
  {
    title: 'Crawlab AI',
    description: 'Next-generation intelligent web crawler powered by Large Language Models (LLM). Automatically extracts structured data from websites without manual rule configuration, revolutionizing data collection workflows.',
    image: 'https://raw.githubusercontent.com/crawlab-team/crawlab/master/docs/img/logo-ai.png',
    tags: ['AI', 'LLM', 'Python', 'OpenAI', 'Web Scraping', 'Automation'],
    blogUrl: '#',
    featured: true,
  },
  {
    title: 'Rath Data Explorer',
    description: 'Open-source automated data exploration and visualization tool. Provides intelligent insights and interactive analytics for complex datasets with drag-and-drop interface and advanced statistical analysis.',
    image: 'https://kanaries.net/images/rath-logo.png',
    tags: ['Data Analysis', 'Visualization', 'TypeScript', 'React', 'Statistics'],
    githubUrl: 'https://github.com/Kanaries/Rath',
    liveUrl: 'https://rath.kanaries.net',
    blogUrl: '#',
  },
  {
    title: 'LangChain Knowledge QA',
    description: 'Intelligent question-answering system built with LangChain framework. Implements RAG (Retrieval-Augmented Generation) patterns for document-based AI conversations and knowledge extraction.',
    image: 'https://python.langchain.com/img/brand/wordmark.png',
    tags: ['AI', 'LangChain', 'Python', 'OpenAI', 'RAG', 'NLP'],
    blogUrl: '/blog/langchain-knowledge-qa-system',
  },
  {
    title: 'OpenAI Function Calls',
    description: 'Advanced implementation of OpenAI function calling capabilities with LangChain integration. Demonstrates structured data extraction and API integration patterns for building robust AI applications.',
    image: 'https://openai.com/favicon.ico',
    tags: ['OpenAI', 'Function Calls', 'Python', 'API Integration', 'Structured Data'],
    blogUrl: '#',
  },
];

function ProjectCard({project}: {project: Project; key?: string}) {
  return (
    <div className={clsx('col col--6', styles.projectCard, {
      [styles.featured]: project.featured
    })}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <img src={project.image} alt={project.title} className={styles.projectImage} />
          <div className={styles.projectInfo}>
            <h3 className={styles.projectTitle}>{project.title}</h3>
            {project.featured && (
              <span className={styles.featuredBadge}>
                <Translate id="projects.featured">Featured</Translate>
              </span>
            )}
          </div>
        </div>
        <p className={styles.projectDescription}>{project.description}</p>
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
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

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
          
          {/* Featured Projects */}
          <section className="margin-bottom--xl">
            <div className="text--center margin-bottom--lg">
              <h2 className={styles.sectionTitle}>
                <Translate id="projects.featured.title">Featured Projects</Translate>
              </h2>
              <p className={styles.sectionDescription}>
                <Translate id="projects.featured.description">
                  Highlighting my most impactful and innovative projects
                </Translate>
              </p>
            </div>
            <div className="row">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </section>

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <section className="margin-bottom--xl">
              <div className="text--center margin-bottom--lg">
                <h2 className={styles.sectionTitle}>
                  <Translate id="projects.other.title">More Projects</Translate>
                </h2>
                <p className={styles.sectionDescription}>
                  <Translate id="projects.other.description">
                    Additional projects and technical explorations
                  </Translate>
                </p>
              </div>
              <div className="row">
                {otherProjects.map((project) => (
                  <ProjectCard key={project.title} project={project} />
                ))}
              </div>
            </section>
          )}

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