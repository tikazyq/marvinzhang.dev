import React, { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import { SiGithub, SiX, SiLinkedin, SiWechat } from 'react-icons/si';
import { HiOutlineMail } from 'react-icons/hi';
import styles from './about.module.css';

function About() {
  const [isWechatActive, setIsWechatActive] = useState(false);
  const wechatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wechatRef.current && !wechatRef.current.contains(event.target as Node)) {
        setIsWechatActive(false);
      }
    }

    if (isWechatActive) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isWechatActive]);

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
                        <li><Translate id="about.skills.programming.typescript">TypeScript/JavaScript</Translate></li>
                        <li><Translate id="about.skills.programming.python">Python</Translate></li>
                        <li><Translate id="about.skills.programming.go">Go</Translate></li>
                        <li><Translate id="about.skills.programming.csharp">C#</Translate></li>
                        <li><Translate id="about.skills.programming.java">Java</Translate></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col col--6">
                    <div className={styles.skillSection}>
                      <h3>
                        <Translate id="about.skills.technologies.title">Full-Stack Technologies</Translate>
                      </h3>
                      <ul className={styles.skillList}>
                        <li><Translate id="about.skills.technologies.frontend">Frontend: Vue.js, React, TypeScript, HTML/CSS</Translate></li>
                        <li><Translate id="about.skills.technologies.backend">Backend: Node.js, C#, Java, Python, Go</Translate></li>
                        <li><Translate id="about.skills.technologies.cloud">Cloud: Azure, AWS</Translate></li>
                        <li><Translate id="about.skills.technologies.database">Database: MongoDB, MySQL, PG, SQL Server, Redis</Translate></li>
                        <li><Translate id="about.skills.technologies.devops">DevOps: Docker, Azure DevOps, GitHub Actions</Translate></li>
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
                        <li><Translate id="about.skills.aiml.coding">AI Coding & Code Generation</Translate></li>
                        <li><Translate id="about.skills.aiml.agents">AI Agents & LLM Applications</Translate></li>
                        <li><Translate id="about.skills.aiml.powerbi">Power BI & Data Analytics Platforms</Translate></li>
                        <li><Translate id="about.skills.aiml.etl">ETL Pipelines & Data Integration</Translate></li>
                        <li><Translate id="about.skills.aiml.scraping">Web Scraping & Automation</Translate></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col col--6">
                    <div className={styles.skillSection}>
                      <h3>
                        <Translate id="about.skills.architecture.title">Architecture & DevOps</Translate>
                      </h3>
                      <ul className={styles.skillList}>
                        <li><Translate id="about.skills.architecture.design">System Design & Implementation</Translate></li>
                        <li><Translate id="about.skills.architecture.aiagent">AI Agent System Development</Translate></li>
                        <li><Translate id="about.skills.architecture.microservices">Microservices Architecture</Translate></li>
                        <li><Translate id="about.skills.architecture.agile">Agile Framework (Scrum)</Translate></li>
                        <li><Translate id="about.skills.architecture.cicd">CI/CD & DevOps Pipelines</Translate></li>
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
                      Achieved 12k+ GitHub stars and 1M+ DockerHub downloads, adopted by major companies 
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
                      AI agents, and AI-powered development tools. Specialized in context engineering, 
                      prompt optimization, and spec-driven development methodologies. Actively researching 
                      and implementing cutting-edge AI solutions including RAG (Retrieval-Augmented Generation), 
                      multi-agent systems, function calling, and AI workflow orchestration. Developing 
                      AI coding assistants, automated testing frameworks, and productivity tools that 
                      enhance developer workflows. Contributing to the AI community through technical 
                      writing, open-source projects, and exploring advanced AI engineering practices 
                      including model fine-tuning and AI system architecture design.
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
                <div className={styles.contactButtons}>
                  <a 
                    href="mailto:tikazyq@163.com" 
                    className={clsx('button', styles.contactButton)}
                    title="Email Me"
                    aria-label="Email Me">
                    <HiOutlineMail className={styles.contactIcon} />
                  </a>
                  <a 
                    href="https://github.com/tikazyq" 
                    className={clsx('button', styles.contactButton)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                    aria-label="GitHub">
                    <SiGithub className={styles.contactIcon} />
                  </a>
                  <a 
                    href="https://x.com/marvinzhang89" 
                    className={clsx('button', styles.contactButton)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Follow on X"
                    aria-label="Follow on X">
                    <SiX className={styles.contactIcon} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/marvinzhang89/" 
                    className={clsx('button', styles.contactButton)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                    aria-label="LinkedIn">
                    <SiLinkedin className={styles.contactIcon} />
                  </a>
                  <div 
                    ref={wechatRef}
                    className={clsx(styles.wechatButton, {
                      [styles.wechatActive]: isWechatActive
                    })} 
                    title="WeChat - Hover or click to see QR code"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsWechatActive(!isWechatActive);
                    }}>
                    <SiWechat className={styles.wechatIcon} />
                    <div className={styles.wechatTooltip}>
                      <img 
                        src="/img/contacts/qr.jpg" 
                        alt="WeChat QR Code" 
                        className={styles.qrImage}
                      />
                      <p>
                        <Translate id="about.connect.wechat.description">
                          Scan to add me on WeChat
                        </Translate>
                      </p>
                      <p className={styles.wechatId}>
                        <Translate id="about.connect.wechat.id">
                          WeChat ID: tikazyq1
                        </Translate>
                      </p>
                    </div>
                  </div>
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