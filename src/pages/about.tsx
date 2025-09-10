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
              Technology Leader • Full-Stack Developer • AI/ML Engineer
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
                    Passionate technology professional with extensive experience in full-stack development, 
                    artificial intelligence, and distributed systems. I specialize in building scalable 
                    solutions and leading technical teams to deliver innovative products.
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
                        <Translate id="about.skills.technologies.title">Technologies & Frameworks</Translate>
                      </h3>
                      <ul className={styles.skillList}>
                        <li>React, Vue.js, Next.js</li>
                        <li>Node.js, Express, FastAPI</li>
                        <li>Docker, Kubernetes</li>
                        <li>AWS, Azure, GCP</li>
                        <li>PostgreSQL, MongoDB, Redis</li>
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
                        <li>TensorFlow, PyTorch</li>
                        <li>LangChain, OpenAI APIs</li>
                        <li>Data Analytics & Visualization</li>
                        <li>Web Scraping & Automation</li>
                        <li>Natural Language Processing</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col col--6">
                    <div className={styles.skillSection}>
                      <h3>
                        <Translate id="about.skills.architecture.title">Architecture & DevOps</Translate>
                      </h3>
                      <ul className={styles.skillList}>
                        <li>Microservices Architecture</li>
                        <li>CI/CD with GitHub Actions</li>
                        <li>System Design & Scalability</li>
                        <li>Performance Optimization</li>
                        <li>Agile Project Management</li>
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
                    <Translate id="about.experience.leadership.title">Technical Leadership</Translate>
                  </h3>
                  <p>
                    <Translate id="about.experience.leadership.description">
                      Led cross-functional teams in delivering complex software solutions, 
                      from initial architecture design to production deployment. Experienced 
                      in scaling systems to handle millions of users and optimizing performance 
                      for high-traffic applications.
                    </Translate>
                  </p>
                </div>

                <div className={styles.experienceItem}>
                  <h3>
                    <Translate id="about.experience.ai.title">AI/ML Innovation</Translate>
                  </h3>
                  <p>
                    <Translate id="about.experience.ai.description">
                      Developed intelligent web crawlers, implemented natural language processing 
                      pipelines, and created AI-powered applications using cutting-edge LLM technologies. 
                      Published research and insights on practical AI applications.
                    </Translate>
                  </p>
                </div>

                <div className={styles.experienceItem}>
                  <h3>
                    <Translate id="about.experience.opensource.title">Open Source Contributions</Translate>
                  </h3>
                  <p>
                    <Translate id="about.experience.opensource.description">
                      Active contributor to the open-source community with projects in web scraping, 
                      data analytics, and developer tools. Created and maintained popular libraries 
                      used by thousands of developers worldwide.
                    </Translate>
                  </p>
                </div>
              </section>

              {/* Education & Certifications */}
              <section className="margin-bottom--xl">
                <h2>
                  <Translate id="about.section.education.title">Education & Learning</Translate>
                </h2>
                <p>
                  <Translate id="about.section.education.description">
                    Committed to continuous learning and staying current with emerging technologies. 
                    Regular participant in tech conferences, contributor to technical publications, 
                    and maintainer of a technical blog covering advanced topics in software engineering, 
                    AI/ML, and system architecture.
                  </Translate>
                </p>
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