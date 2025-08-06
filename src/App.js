import ProfilePicture from './assets/profile-picture.jpeg'
import './App.css';

import React, { useState, useEffect } from 'react';

// Helper component for SVG icons
const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d={path} />
  </svg>
);

// SVG Paths for Icons
const ICONS = {
  GITHUB: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
  LINKEDIN: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  TWITTER: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.424.727-.666 1.581-.666 2.477 0 1.61.82 3.027 2.068 3.865-.764-.024-1.482-.232-2.11-.583v.062c0 2.248 1.605 4.125 3.737 4.568-.39.106-.803.163-1.227.163-.3 0-.593-.028-.877-.082.593 1.844 2.313 3.183 4.353 3.22-1.595 1.248-3.604 1.992-5.786 1.992-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.092 7.14 2.092 8.57 0 13.255-7.098 13.255-13.254 0-.202-.005-.403-.014-.602.91-.658 1.7-1.475 2.323-2.408z",
  MAP: "M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z",
  DOWNLOAD: "M19 9h-4v-7h-6v7h-4l7 7 7-7zm-14 9v2h14v-2h-14z",
  GAMEPAD: "M23.142 9.04l-3.164-3.164c-1.172-1.172-3.07-1.172-4.242 0l-1.738 1.738h-2v-2l1.738-1.738c-1.172-1.172 1.172-3.07 0-4.242l-3.164-3.164c-1.172-1.172-3.07-1.172-4.242 0l-3.164 3.164c-1.172 1.172-1.172 3.07 0 4.242l1.738 1.738v2h-2l-1.738-1.738c-1.172-1.172-3.07-1.172-4.242 0l-3.164 3.164c-1.172 1.172-1.172 3.07 0 4.242l3.164 3.164c1.172 1.172 3.07 1.172 4.242 0l1.738-1.738h2v2l-1.738 1.738c-1.172 1.172-1.172 3.07 0 4.242l3.164 3.164c1.172 1.172 3.07 1.172 4.242 0l3.164-3.164c1.172-1.172 1.172-3.07 0-4.242l-1.738-1.738v-2h2l1.738 1.738c1.172 1.172 3.07 1.172 4.242 0l3.164-3.164c1.172-1.172 1.172-3.07 0-4.242zm-13.142 9.96v-2h-2v-2h2v-2h2v2h2v2h-2v2h-2zm4-4h-2v-2h2v2z",
  EXTERNAL_LINK: "M14.0001 2.00005L22.0001 10V20.5612C22.0001 21.3543 21.3544 22.0001 20.5612 22.0001H3.43885C2.64573 22.0001 2 21.3543 2 20.5612V3.43885C2 2.64573 2.64573 2.00005 3.43885 2.00005H14.0001ZM13.0001 4.00005H4V20.0001H20.0001V10.6864L13.0001 4.00005ZM15.0001 4.00005V8.00005H19.0001L15.0001 4.00005Z",
  ARROW_RIGHT: "M13.293 6.293L18.586 11.586H3V13.586H18.586L13.293 18.879L14.707 20.293L22.414 12.586L14.707 4.879L13.293 6.293Z",
  CHECK: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z",
  MENU: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z",
  PHONE: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1v3.5c0 .35-.09.65-.26.93l-2.2 2.2z",
  SPARKLES: "M12 0l1.912 4.088L18 6l-4.088 1.912L12 12l-1.912-4.088L6 6l4.088-1.912L12 0zm-6 14l1.912 4.088L12 20l-4.088 1.912L6 26l-1.912-4.088L0 20l4.088-1.912L6 14z",
  CLOSE: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z",
};

const experiences = [
    {
        company: "Project44",
        role: "Software Development Engineer",
        duration: "Sept 2024 - Present",
        description: [
            "Spearheaded critical optimizations for Mapbox usage, resulting in a stunning 73% reduction in operational costs and significantly boosting system efficiency.",
            "Developed a robust Exception Service, providing near real-time exception visibility by dynamically associating them with relevant shipments, and enhancing critical Root Cause Analysis capabilities.",
            "Built backend services to implement and process saved views, successfully delivering an upsell component that generated over $300K in revenue growth.",
            "Designed seamless MO-AI integration with P44 MO Insights, providing real-time weather impact tracking for a significant portion of shipments and slashing customer support inquiries by 30%.",
            "Drove the development of AI-Sentinel, an intelligent shipment exception tracker that automated Zendesk workflows and triggered carrier notifications (calls/SMS) upon exception detection, leading to a 25% decrease in customer inquiries and a 15% boost in customer satisfaction.",
            "Spearheaded the codebase migration from Node.js 14 to Node.js 20, guaranteeing 100% feature compatibility and enhanced performance, while establishing long-term support and reducing tech debt by 15%."
        ],
        techStack: ["Nest.js", "Java", "Spring boot", "React.js", "MongoDB", "Kafka", "Snowflake", "Elastic search", "Redis"]
    },
    {
        company: "Restroworks",
        role: "Software Development Engineer",
        duration: "Oct 2022 - Aug 2024",
        description: [
            "Point of sale: Built a multi-tenant POS system integrating AWS (SQS, MSK, Lambda) and microservices, optimizing bulk data processing (20% faster).",
            "Logging System: Architected a centralized logging system leveraging Kafka, Fluentd, and Elasticsearch to process SysLogs/Nginx logs, improving data analysis efficiency by 40% and slashing manual effort by 80%.",
            "Analytics and Reporting: Optimized report generation using MongoDB aggregations, achieving a 3x improvement in delivery speed. Implemented Redis caching for efficient rate limiting.",
            "Internal Ticket App: Constructed a queue microservice and auto-ticket assignment, managing 200 tickets/day with 100% event capture."
        ],
        techStack: ["React.js", "Node.js", "MongoDB", "Kafka", "SQS", "AWS Lambda", "EC2", "S3", "Docker", "Java", "Fluentd"]
    },
    {
        company: "Attentioun",
        role: "Software Development Engineer Intern",
        duration: "Jun 2022 - Oct 2022",
        description: [
            "End-to-End Feature Development & UI/UX Excellence: Drove the creation and optimization of over 10 dynamic web pages and two core application components (Story, Profile) by integrating multiple APIs and implementing five major features with ReactJS and Redux Saga, translating complex requirements into intuitive, high-engagement user interfaces.",
            "Streamlined Collaborative Development: Boosted development velocity and code quality for a 15-person team by implementing robust version control workflows using AWS CodeCommit, enhancing collaboration and efficiency."
        ],
        techStack: ["React.js", "Redux.js", "MongoDB", "NodeJS", "Redux saga", "AWS", "TailwindCSS"]
    }
];

const Experience = () => (
    <section id="experience" className="py-24">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Work Experience</h2>
            <p className="text-slate-600 mt-2">My professional journey so far.</p>
        </div>
        <div className="max-w-3xl mx-auto">
            <div className="relative border-l-2 border-blue-200">
                                {experiences.map((exp, index) => (
                    <div key={index} className="mb-10 ml-6">
                        <span className={`absolute flex items-center justify-center w-6 h-6 ${theme.bg} rounded-full -left-3 ring-8 ring-white`}>
                            <Icon path={ICONS.BRIEFCASE} className="w-3 h-3 text-white" />
                        </span>
                        <h3 className="flex items-center mb-1 text-lg font-semibold text-slate-900">
                            {exp.company}
                        </h3>
                        <time className="block mb-2 text-sm font-normal leading-none text-slate-500">{exp.duration} &bull; {exp.role}</time>
                        <div className="text-base font-normal text-slate-600">
                            {Array.isArray(exp.description) ? (
                                <ul className="list-disc list-inside space-y-2 mt-2">
                                    {exp.description.map((point, i) => <li key={i}>{point}</li>)}
                                </ul>
                            ) : (
                                <p>{exp.description}</p>
                            )}
                            {exp.techStack && (
                                <div className="mt-4">
                                    <p className="font-semibold text-sm text-slate-800 mb-2">Tech Stack:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.techStack.map(tech => (
                                            <span key={tech} className={`${theme.tagBg} ${theme.tagText} text-xs font-medium px-2 py-1 rounded-full`}>{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const PersonalDetails = () => (
    <section id="details" className="py-24">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Connect With Me</h2>
            <p className="text-slate-600 mt-2">Find me on social media or download my resume.</p>
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Social Links */}
                <div className="flex space-x-6 text-3xl text-slate-500">
                    <a href="https://github.com/amogh-nagar" target="_blank" rel="noopener noreferrer" className={theme.hover}><Icon path={ICONS.GITHUB} /></a>
                    <a href="https://www.linkedin.com/in/amoghnagar/" target="_blank" rel="noopener noreferrer" className={theme.hover}><Icon path={ICONS.LINKEDIN} /></a>
                    <a href="https://twitter.com/amogh_nagar" target="_blank" rel="noopener noreferrer" className={theme.hover}><Icon path={ICONS.TWITTER} /></a>
                </div>
                {/* Contact and Resume */}
                <div className="flex flex-col sm:flex-row items-center gap-6">
                     <div className="flex items-center">
                        <Icon path={ICONS.PHONE} className={`w-6 h-6 ${theme.text} mr-2`} />
                        <span className="text-slate-700 text-lg">8383920621</span>
                    </div>
                    <a href="https://drive.google.com/file/d/1nggwKa5ZBvUCLB1V0RG9URJinnYMn-3N/view?usp=sharing" className={`${theme.bg} text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-sm flex items-center`}>
                        <Icon path={ICONS.DOWNLOAD} className="w-5 h-5 mr-2" />
                        Download Resume
                    </a>
                </div>
            </div>
        </div>
    </section>
);


// Project data
const projects = [
  {
    icon: ICONS.MAP,
    title: "Connectify",
    description: "A modern social networking platform built with Spring Boot microservices architecture. Connectify allows users to create profiles, post content, like posts, and manage connections with other users.",
    tags: ["Java", "Springboot", "Eureka", "Neo4j", "MySQL", "Docker"],
    githubUrl: "https://github.com/amogh-nagar/connectify",
    liveUrl: "#",
  },
  {
    icon: ICONS.DOWNLOAD,
    title: "Foodie",
    description: "A multitenant POS system designed for restaurants, enabling efficient order management and customer interaction. Built with a focus on scalability and user experience.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Docker", "Redis", "Kubernetes", "AWS SQS"],
    githubUrl: "https://github.com/amogh-nagar/Foodiee-POS",
    liveUrl: "#",
  },
  {
    icon: ICONS.GAMEPAD,
    title: "Wordle Clone",
    description: "A fun, recognizable clone of the popular word-guessing game, showcasing frontend logic and UI skills.",
    tags: ["Dart", "Flutter"],
    githubUrl: "https://github.com/amogh-nagar/wordle",
    liveUrl: "#",
  },
];

// Reusable CSS classes for the Blue theme
const theme = {
  text: 'text-blue-600',
  bg: 'bg-blue-600',
  border: 'border-blue-500',
  shadow: 'shadow-blue-600/30',
  shadowLg: 'shadow-blue-600/40',
  hover: 'hover:text-blue-600',
  tagBg: 'bg-blue-100',
  tagText: 'text-blue-800',
  contactText: 'text-blue-300',
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 transition-opacity duration-300" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 relative transform transition-all duration-300 scale-95" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h3 className="text-xl font-bold text-slate-800">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-800 transition-colors">
            <Icon path={ICONS.CLOSE} />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};


// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b border-slate-200">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-xl font-bold text-slate-900">Amogh Nagar</a>
        <div className="hidden md:flex space-x-8 items-center">
          <a href="#about" className={`text-slate-600 ${theme.hover} transition-colors`}>About</a>
           <a href="#experience" className={`text-slate-600 ${theme.hover} transition-colors`}>Experience</a>
          <a href="#projects" className={`text-slate-600 ${theme.hover} transition-colors`}>Projects</a>
          <a href="#contact" className={`text-slate-600 ${theme.hover} transition-colors`}>Contact</a>
        </div>
        <a href="https://github.com/amogh-nagar" target="_blank" rel="noopener noreferrer" className={`hidden md:inline-block ${theme.bg} text-white font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-sm`}>
          GitHub <Icon path={ICONS.GITHUB} className="w-4 h-4 inline-block ml-1" />
        </a>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl text-slate-800">
          <Icon path={ICONS.MENU} />
        </button>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3">
          <a href="#about" className={`block text-slate-700 ${theme.hover} transition-colors`} onClick={() => setIsMenuOpen(false)}>About</a>
          <a href="#projects" className={`block text-slate-700 ${theme.hover} transition-colors`} onClick={() => setIsMenuOpen(false)}>Projects</a>
          <a href="#contact" className={`block text-slate-700 ${theme.hover} transition-colors`} onClick={() => setIsMenuOpen(false)}>Contact</a>
          <a href="https://github.com/amogh-nagar" target="_blank" rel="noopener noreferrer" className={`block text-slate-700 ${theme.hover} transition-colors`} onClick={() => setIsMenuOpen(false)}>GitHub</a>
        </div>
      )}
    </header>
  );
};

// Hero Section Component
const Hero = () => (
  <section id="hero" className="min-h-[85vh] flex items-center py-20">
    <div className="max-w-4xl">
      <h1 className={`text-lg font-semibold ${theme.text} mb-3`}>Hi, my name is</h1>
      <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900">Amogh Nagar.</h2>
      <h3 className="text-4xl md:text-6xl font-extrabold text-slate-500 mt-2">I build things for the web.</h3>
      <p className="mt-6 max-w-2xl text-lg">
        I'm a Software Development Engineer specializing in building (and occasionally designing) exceptional digital experiences. Currently, I’m focused on building accessible, human-centered products.
      </p>
      <div className="mt-10">
        <a href="mailto:amoghnagar12@gmail.com" className={`${theme.bg} text-white font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg ${theme.shadow} inline-flex items-center`}>
          Get In Touch <Icon path={ICONS.ARROW_RIGHT} className="w-5 h-5 ml-2" />
        </a>
      </div>
    </div>
  </section>
);

// About Section Component
const About = () => (
  <section id="about" className="py-24 bg-white rounded-2xl -mx-6 px-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="order-2 lg:order-1">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">About Me</h2>
        <div className="space-y-4 text-slate-600">
          <p>Hello! I'm Amogh, a software engineer based in Ghaziabad. My journey into tech started with a curiosity for how things work, which quickly turned into a passion for building software. I thrive on turning complex problems into simple, beautiful, and intuitive solutions.</p>
          <p>My main focus these days is building accessible, human-centered products. I love the challenge of working across the stack, from crafting responsive frontends to designing robust backend systems.</p>
          <p>Here are a few technologies I've been working with recently:</p>
        </div>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2 mt-6 text-slate-600">
          {["JavaScript (ES6+)", "React & Node.js", "TypeScript", "Dart & Flutter", "C++", "Python"].map(skill => (
            <li key={skill} className="flex items-center">
              <Icon path={ICONS.CHECK} className={`w-5 h-5 ${theme.text} mr-3`} /> {skill}
            </li>
          ))}
        </ul>
      </div>
      <div className="order-1 lg:order-2 flex justify-center">
        <div className="w-80 h-80 rounded-full bg-slate-200 relative group">
          <img src={ProfilePicture} alt="Amogh Nagar" className="rounded-full w-full h-full object-cover p-2 transition-transform duration-500 group-hover:scale-105" />
          <div className={`absolute inset-0 border-4 ${theme.border} rounded-full transition-transform duration-500 group-hover:rotate-6`}></div>
        </div>
      </div>
    </div>
  </section>
);

// Project Card Component with Gemini Feature
const ProjectCard = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateDescription = async () => {
    setIsModalOpen(true);
    setIsLoading(true);
    setError('');
    setModalContent('');

    const prompt = `You are a tech talent recruiter writing a project summary for a developer's portfolio.
    Based on the project title "${project.title}", the short description "${project.description}", and the technologies used [${project.tags.join(', ')}], write a professional and engaging summary of 2-3 sentences.
    Highlight the key skills demonstrated and the potential impact of the project. Do not use markdown.`;

    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      });

      if (!response.ok) throw new Error(`API error: ${response.statusText}`);
      const data = await response.json();
      
      if (data.candidates && data.candidates.length > 0) {
        const text = data.candidates[0].content.parts[0].text;
        setModalContent(text.trim());
      } else {
        throw new Error("No content generated.");
      }
    } catch (e) {
      console.error("Gemini API call failed:", e);
      setError("Failed to generate details. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col justify-between transition-transform duration-300 ease-in-out hover:-translate-y-2 shadow-sm hover:shadow-xl">
        <div>
          <div className="flex justify-between items-center mb-4">
            <Icon path={project.icon} className={`w-10 h-10 ${theme.text}`} />
            <div className="flex space-x-4 text-2xl text-slate-400">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={theme.hover}><Icon path={ICONS.GITHUB} /></a>
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">{project.title}</h3>
          <p className="text-sm text-slate-600 min-h-[60px]">{project.description}</p>
        </div>
        <div className="mt-6">
          <div className="flex flex-wrap gap-2 text-xs font-medium mb-6">
            {project.tags.map(tag => (
              <span key={tag} className={`${theme.tagBg} ${theme.tagText} px-3 py-1 rounded-full`}>{tag}</span>
            ))}
          </div>
          <button
            onClick={handleGenerateDescription}
            className={`w-full ${theme.bg} text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center`}
          >
            <Icon path={ICONS.SPARKLES} className="w-5 h-5 mr-2" />
            Get AI Insights
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`AI Insights for ${project.title}`}>
        {isLoading && (
          <div className="flex flex-col items-center justify-center min-h-[150px]">
            <svg className={`animate-spin h-8 w-8 ${theme.text}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-slate-600">Generating project summary...</p>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
        {!isLoading && !error && (
          <p className="text-slate-600">{modalContent}</p>
        )}
      </Modal>
    </>
  );
};

// Projects Section Component
const Projects = () => (
  <section id="projects" className="py-24">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-slate-900">Some Things I've Built</h2>
      <p className="text-slate-600 mt-2">A selection of my favorite projects.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map(p => <ProjectCard key={p.title} project={p} />)}
    </div>
  </section>
);

// Contact Section Component
const Contact = () => (
  <section id="contact" className="py-24">
    <div className="bg-slate-800 rounded-2xl text-center p-12 max-w-4xl mx-auto">
      <h2 className={`text-sm font-bold uppercase ${theme.contactText} tracking-widest`}>What's Next?</h2>
      <h3 className="text-4xl font-extrabold text-white mt-4">Get In Touch</h3>
      <p className="text-slate-300 mt-4 max-w-xl mx-auto">
        I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision. Feel free to reach out if you want to chat!
      </p>
      <a href="mailto:amoghnagar12@gmail.com" className={`mt-8 inline-block ${theme.bg} text-white font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg ${theme.shadowLg}`}>
        Say Hello
      </a>
    </div>
  </section>
);

// Footer Component
const Footer = () => (
  <footer className="py-10 border-t border-slate-200">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
      <p className="text-sm text-slate-500 mb-4 md:mb-0">
        Designed & Built by Amogh Nagar
      </p>
      <div className="flex space-x-6 text-2xl text-slate-400">
        <a href="https://github.com/amogh-nagar" target="_blank" rel="noopener noreferrer" className={theme.hover}><Icon path={ICONS.GITHUB} /></a>
        <a href="https://www.linkedin.com/in/amogh-nagar-944983190/" target="_blank" rel="noopener noreferrer" className={theme.hover}><Icon path={ICONS.LINKEDIN} /></a>
        <a href="https://twitter.com/amogh_nagar" target="_blank" rel="noopener noreferrer" className={theme.hover}><Icon path={ICONS.TWITTER} /></a>
      </div>
    </div>
  </footer>
);

// Main App Component
export default function App() {
  return (
    <div className="antialiased bg-slate-50 text-slate-700">
      <Header />
      <main className="container mx-auto px-6">
        <Hero />
        <About />
        <Experience />
        <PersonalDetails />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}