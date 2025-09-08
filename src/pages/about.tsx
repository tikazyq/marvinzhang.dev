import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import styles from './about.module.css';

function About() {
  return (
    <Layout
      title="About Marvin Zhang"
      description="Learn more about Marvin Zhang's background, experience, and expertise in technology">
      <div className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">About Marvin Zhang</h1>
          <p className="hero__subtitle">
            Technology Leader • Full-Stack Developer • AI/ML Engineer
          </p>
        </div>
      </div>

      <main>
        <div className="container margin-vert--lg">
          <div className="row">
            <div className="col col--8 col--offset-2">
              
              {/* Professional Summary */}
              <section className="margin-bottom--xl">
                <h2>Professional Summary</h2>
                <p className="margin-bottom--md">
                  Passionate technology professional with extensive experience in full-stack development, 
                  artificial intelligence, and distributed systems. I specialize in building scalable 
                  solutions and leading technical teams to deliver innovative products.
                </p>
                <p>
                  Through my blog at marvinzhang.dev, I share insights on cutting-edge technologies, 
                  best practices in software engineering, and practical applications of AI/ML in 
                  real-world scenarios.
                </p>
              </section>

              {/* Core Expertise */}
              <section className="margin-bottom--xl">
                <h2>Core Expertise</h2>
                <div className="row margin-bottom--md">
                  <div className="col col--6">
                    <div className={styles.skillSection}>
                      <h3>Programming Languages</h3>
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
                      <h3>Technologies & Frameworks</h3>
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
                      <h3>AI/ML & Data</h3>
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
                      <h3>Architecture & DevOps</h3>
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
                <h2>Experience Highlights</h2>
                
                <div className={styles.experienceItem}>
                  <h3>Technical Leadership</h3>
                  <p>
                    Led cross-functional teams in delivering complex software solutions, 
                    from initial architecture design to production deployment. Experienced 
                    in scaling systems to handle millions of users and optimizing performance 
                    for high-traffic applications.
                  </p>
                </div>

                <div className={styles.experienceItem}>
                  <h3>AI/ML Innovation</h3>
                  <p>
                    Developed intelligent web crawlers, implemented natural language processing 
                    pipelines, and created AI-powered applications using cutting-edge LLM technologies. 
                    Published research and insights on practical AI applications.
                  </p>
                </div>

                <div className={styles.experienceItem}>
                  <h3>Open Source Contributions</h3>
                  <p>
                    Active contributor to the open-source community with projects in web scraping, 
                    data analytics, and developer tools. Created and maintained popular libraries 
                    used by thousands of developers worldwide.
                  </p>
                </div>
              </section>

              {/* Education & Certifications */}
              <section className="margin-bottom--xl">
                <h2>Education & Learning</h2>
                <p>
                  Committed to continuous learning and staying current with emerging technologies. 
                  Regular participant in tech conferences, contributor to technical publications, 
                  and maintainer of a technical blog covering advanced topics in software engineering, 
                  AI/ML, and system architecture.
                </p>
              </section>

              {/* Connect */}
              <section className="margin-bottom--xl">
                <h2>Let's Connect</h2>
                <p className="margin-bottom--lg">
                  I'm always interested in discussing new opportunities, technical challenges, 
                  and innovative projects. Feel free to reach out if you'd like to collaborate 
                  or learn more about my work.
                </p>
                <div className={styles.connectButtons}>
                  <a 
                    href="https://github.com/tikazyq" 
                    className="button button--primary button--lg margin-right--md"
                    target="_blank"
                    rel="noopener noreferrer">
                    GitHub Profile
                  </a>
                  <a 
                    href="mailto:contact@marvinzhang.dev" 
                    className="button button--secondary button--lg">
                    Email Me
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