import React, { useState, useEffect } from "react";
import { ChevronDown, Mail, Phone, MapPin, ExternalLink, Github, Linkedin, Menu, X } from "lucide-react";
import { mockData } from "./mock.js";
import ContactForm from "./ContactForm.js";

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "experience", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="portfolio">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">Himanshu Srivastava</span>
          </div>
          
          <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
            {["About", "Skills", "Experience", "Projects", "Contact"].map((item) => (
              <button
                key={item}
                className={`nav-link ${activeSection === item.toLowerCase() ? "active" : ""}`}
                onClick={() => scrollToSection(item.toLowerCase())}
              >
                {item}
              </button>
            ))}
          </div>

          <button 
            className="nav-toggle" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>17+ Years of Technical Excellence</span>
            </div>
            <h1 className="hero-title">
              <span className="title-main">HIMANSHU SRIVASTAVA</span>
              <span className="title-subtitle">Software Technical Expert</span>
            </h1>
            <p className="hero-description">
              Dynamic Java Technical Expert with extensive experience in designing and developing 
              high-quality software solutions. Specialized in microservices architecture, team leadership, 
              and delivering enterprise-scale solutions across global markets.
            </p>
            <div className="hero-buttons">
              <button 
                className="btn-primary"
                onClick={() => scrollToSection("contact")}
              >
                Get In Touch
              </button>
              <button 
                className="btn-secondary"
                onClick={() => scrollToSection("experience")}
              >
                View Experience
              </button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="tech-stack-visual">
                {mockData.skills.map((skill, index) => (
                <div key={index} className="tech-badge">
                    {skill}
                </div>
                ))}
            </div>
          </div>
        </div>
        
        <button 
          className="scroll-indicator"
          onClick={() => scrollToSection("about")}
        >
          <ChevronDown size={24} />
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">About Me</span>
            <h2 className="section-title">Building Solutions, Leading Teams</h2>
          </div>
          
          <div className="about-grid">
            <div className="about-content">
              <p className="about-text">
                With over 17 years in the software industry, I've evolved from a Software Engineer 
                to a Technical Expert, leading teams and architecting enterprise solutions for global 
                telecommunications companies including Vodafone, Telus, Comcast, and Telkomsel.
              </p>
              <p className="about-text">
                My expertise spans the entire software development lifecycle, with deep knowledge in 
                Java technologies, microservices architecture, and modern DevOps practices. I'm 
                passionate about leveraging cutting-edge technology to solve complex business challenges 
                and mentor the next generation of developers.
              </p>
              
              <div className="about-highlights">
                {mockData.highlights.map((highlight, index) => (
                  <div key={index} className="highlight-item">
                    <div className="highlight-number">{highlight.number}</div>
                    <div className="highlight-text">{highlight.text}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="about-stats">
              <div className="stat-card">
                <div className="stat-number">17+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">50+</div>
                <div className="stat-label">Projects Delivered</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">10+</div>
                <div className="stat-label">Countries Served</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">100+</div>
                <div className="stat-label">Team Members Led</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Technical Skills</span>
            <h2 className="section-title">Core Competencies</h2>
          </div>
          
          <div className="skills-grid">
            {mockData.skillCategories.map((category, index) => (
              <div key={index} className="skill-category">
                <h3 className="category-title">{category.category}</h3>
                <div className="skills-list">
                  {category.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Career Journey</span>
            <h2 className="section-title">Professional Experience</h2>
          </div>
          
          <div className="timeline">
            {mockData.experience.map((job, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="job-header">
                    <div className="job-title-company">
                      <h3 className="job-title">{job.title}</h3>
                      <span className="job-company">{job.company}</span>
                    </div>
                    <div className="job-period">{job.period}</div>
                  </div>
                  <div className="job-location">{job.location}</div>
                  <ul className="job-responsibilities">
                    {job.responsibilities.map((resp, respIndex) => (
                      <li key={respIndex}>{resp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Portfolio</span>
            <h2 className="section-title">Key Projects</h2>
          </div>
          
          <div className="projects-grid">
            {mockData.projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-links">
                    <ExternalLink size={20} className="project-link-icon" />
                  </div>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-impact">
                  <strong>Impact:</strong> {project.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Get In Touch</span>
            <h2 className="section-title">Let's Work Together</h2>
          </div>
          
          <div className="contact-grid">
            <div className="contact-info">
              <h3 className="contact-info-title">Ready to discuss your next project?</h3>
              <p className="contact-info-text">
                I'm always interested in new opportunities and challenging projects. 
                Let's connect and explore how my expertise can help drive your technical initiatives.
              </p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <Mail size={20} />
                  <span>himanshu.java@gmail.com</span>
                </div>
                <div className="contact-item">
                  <Phone size={20} />
                  <span>+357.99261981</span>
                </div>
                <div className="contact-item">
                  <MapPin size={20} />
                  <span>Limassol, Cyprus</span>
                </div>
                <div className="contact-item">
                  <Linkedin size={20} />
                  <span>linkedin.com/in/himanshu-srivastava-6602221b</span>
                </div>
              </div>
            </div>
            
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>&copy; 2025 Himanshu Srivastava. All rights reserved.</p>
            <p>Built with passion for clean code and elegant solutions.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;