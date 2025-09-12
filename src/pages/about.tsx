import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import styles from './about.module.css';

function About() {
  return (
    <Layout
      title={translate({
        id: 'about.title',
        message: 'About Marvin Zhang',
        description: 'The title of the about page'
      })}
      description={translate({
        id: 'about.description', 
        message: 'Learn more about Marvin Zhang\'s background, experience, and expertise in technology',
        description: 'The description of the about page'
      })}>
      <div className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">
            <Translate id="about.hero.title">About Marvin Zhang</Translate>
          </h1>
          <p className="hero__subtitle">
            <Translate id="about.hero.subtitle">
              Technology Leader • Full-Stack Developer • Open Source Author
            </Translate>
          </p>
        </div>
      </div>

      <main>
        <div className="container margin-vert--lg">
          <div className="row">
            <div className="col col--8 col--offset-2">
              
              {/* Professional Summary */}
              <section className="margin-bottom--xl">
                <h2>
                  <Translate id="about.section.professional.title">Professional Summary</Translate>
                </h2>
                <p className="margin-bottom--md">
                  <Translate id="about.section.professional.description1">
                    10+ years work experience in full-stack software development, data analytics and project management, 
                    and author of open-source projects including Crawlab. Specialized in building 
                    end-to-end solutions from frontend interfaces to backend architectures, with extensive expertise 
                    in leading development teams and scalable platform development. 
                    I am currently focused on AI technologies including LLM, agents, AI coding, etc.
                  </Translate>
                </p>
                <p>
                  <Translate id="about.section.professional.description2">
                    Through my blog at marvinzhang.dev, I share insights on cutting-edge technologies, 
                    best practices in software engineering, and practical applications of AI/ML in 
                    real-world scenarios.
                  </Translate>
                </p>
              </section>

              {/* Core Expertise */}
              <section className="margin-bottom--xl">
                <h2>
                  <Translate id="about.section.expertise.title">Core Expertise</Translate>
                </h2>
                <div className="row margin-bottom--md">
                  <div className="col col--6">
                    <div className={styles.skillSection}>
                      <h3>
                        <Translate id="about.skills.programming.title">Programming Languages</Translate>
                      </h3>
                      <ul className={styles.skillList}>
                        <li>TypeScript/JavaScript</li>
                        <li>Python</li>
                        <li>Go</li>
                        <li>C#</li>
                        <li>Java</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col col--6">
                    <div className={styles.skillSection}>
                      <h3>
                        <Translate id="about.skills.technologies.title">Full-Stack Technologies</Translate>
                      </h3>
                      <ul className={styles.skillList}>
                        <li>Frontend: Vue.js, React, TypeScript, HTML/CSS</li>
                        <li>Backend: Node.js, C#, Java, Python, Go</li>
                        <li>Cloud: Azure, AWS</li>
                        <li>Database: MongoDB, MySQL, PG, SQL Server, Redis</li>
                        <li>DevOps: Docker, Azure DevOps, GitHub Actions</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col col--6">
                    <div className={styles.skillSection}>
                      <h3>
                        <Translate id="about.skills.aiml.title">AI/ML & Data</Translate>
                      </h3>
                      <ul className={styles.skillList}>
                        <li>AI Coding & Code Generation</li>
                        <li>AI Agents & LLM Applications</li>
                        <li>Power BI & Data Analytics Platforms</li>
                        <li>ETL Pipelines & Data Integration</li>
                        <li>Web Scraping & Automation</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col col--6">
                    <div className={styles.skillSection}>
                      <h3>
                        <Translate id="about.skills.architecture.title">Architecture & DevOps</Translate>
                      </h3>
                      <ul className={styles.skillList}>
                        <li>System Design & Implementation</li>
                        <li>AI Agent System Development</li>
                        <li>Microservices Architecture</li>
                        <li>Agile Framework (Scrum)</li>
                        <li>CI/CD & DevOps Pipelines</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Experience Highlights */}
              <section className="margin-bottom--xl">
                <h2>
                  <Translate id="about.section.experience.title">Experience Highlights</Translate>
                </h2>
                
                <div className={styles.experienceItem}>
                  <h3>
                    <Translate id="about.experience.leadership.title">Technical Team Lead</Translate>
                  </h3>
                  <p>
                    <Translate id="about.experience.leadership.description">
                      Currently leading a development team practicing agile framework (Scrum) 
                      for software development. Spearheading data governance initiatives with Power BI-based 
                      analytics platforms and implementing ETL data integration architectures. Researching 
                      and developing low-code solutions using Microsoft PowerApps/PowerAutomate. Leading AI 
                      initiatives including LLM integration, AI-powered automation tools, and exploring 
                      AI agent systems for enterprise workflows. Actively researching and implementing 
                      AI coding solutions to enhance development team productivity and code quality.
                    </Translate>
                  </p>
                </div>

                <div className={styles.experienceItem}>
                  <h3>
                    <Translate id="about.experience.crawlab.title">Crawlab Open Source Project</Translate>
                  </h3>
                  <p>
                    <Translate id="about.experience.crawlab.description">
                      Author and maintainer of Crawlab, a distributed web crawler management platform 
                      supporting multiple programming languages including Python, Node.js, Go, and Java. 
                      Achieved 12k+ GitHub stars and 500k+ DockerHub downloads, adopted by major companies 
                      including Xiaomi, Siemens, and Garmin. Features include distributed task scheduling, 
                      real-time monitoring, data visualization, and comprehensive spider management 
                      with support for both code-based and visual crawler development.
                    </Translate>
                  </p>
                </div>

                <div className={styles.experienceItem}>
                  <h3>
                    <Translate id="about.experience.ai.title">AI Research & Development</Translate>
                  </h3>
                  <p>
                    <Translate id="about.experience.ai.description">
                      Deep expertise in AI/ML technologies with focus on Large Language Models (LLMs), 
                      AI agents, and AI-powered development tools. Actively researching and implementing 
                      cutting-edge AI solutions including prompt engineering, RAG (Retrieval-Augmented Generation), 
                      and multi-agent systems. Developing AI coding assistants and automation tools that 
                      enhance developer productivity. Contributing to the AI community through technical 
                      writing, open-source projects, and exploring the intersection of AI with traditional 
                      software engineering practices.
                    </Translate>
                  </p>
                </div>
              </section>

              {/* Connect */}
              <section className="margin-bottom--xl">
                <h2>
                  <Translate id="about.section.connect.title">Let's Connect</Translate>
                </h2>
                <p className="margin-bottom--lg">
                  <Translate id="about.section.connect.description">
                    I'm always interested in discussing new opportunities, technical challenges, 
                    and innovative projects. Feel free to reach out if you'd like to collaborate 
                    or learn more about my work.
                  </Translate>
                </p>
                <div className={styles.connectButtons}>
                  <a 
                    href="https://github.com/tikazyq" 
                    className="button button--primary button--lg margin-right--md"
                    target="_blank"
                    rel="noopener noreferrer">
                    <Translate id="about.connect.github">GitHub Profile</Translate>
                  </a>
                  <a 
                    href="mailto:contact@marvinzhang.dev" 
                    className="button button--secondary button--lg">
                    <Translate id="about.connect.email">Email Me</Translate>
                  </a>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default About;