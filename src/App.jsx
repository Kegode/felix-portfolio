import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const SKILLS = [
  { name: "Django", level: 90, category: "Backend" },
  { name: "React", level: 85, category: "Frontend" },
  { name: "Kotlin / Android", level: 88, category: "Mobile" },
  { name: "Firebase", level: 80, category: "Cloud" },
  { name: "MySQL", level: 85, category: "Database" },
  { name: "REST APIs", level: 88, category: "Backend" },
  { name: "Docker", level: 75, category: "DevOps" },
  { name: "CI/CD & DevOps", level: 70, category: "DevOps" },
];

const PROJECTS = [
  {
    title: "MPost (Posta Mkononi)",
    desc: "Contributed to backend API development for Kenya’s digital postal platform, enabling mobile-number-based addressing, parcel tracking, and real-time SMS notifications.",
    stack: ["Laravel", "PHP", "MySQL", "REST APIs", "SMS Integration"],
    number: "00",
  },
  {
  title: "Tendering System",
  desc: "Built a secure tender management system for handling procurement workflows, including bid submissions, evaluations, and role-based approvals.",
  stack: ["Django", "Django REST Framework", "MySQL", "Authentication", "Role-Based Access"],
  number: "01",
  },
  {
    title: "School Management System",
    desc: "A comprehensive platform for managing students, teachers, timetables, and academic reports.",
    stack: ["Django", "React", "MySQL"],
    number: "02",
  },
  {
    title: "Delivery App",
    desc: "Real-time parcel tracking Android app powered by Django Channels and WebSockets.",
    stack: ["Kotlin", "Django", "Firebase"],
    number: "03",
  },
  {
    title: "POS System",
    desc: "Bilingual point-of-sale system built with Laravel, featuring inventory management, sales tracking, and reporting tailored for small businesses.",
    stack: ["Laravel", "PHP", "MySQL"],
    number: "04",
  },
  {
  title: "Duty Free eCommerce Platform",
  desc: "Developed a duty-free eCommerce platform using WordPress, featuring product catalog management, shopping cart, secure checkout, and order processing.",
  stack: ["WordPress", "WooCommerce", "PHP", "MySQL"],
  number: "02",
}
];

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => { if (e.target.closest("button,a,input,textarea")) setHovered(true); };
    const out = () => setHovered(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
    };
  }, []);
  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
      animate={{
        x: pos.x - (hovered ? 20 : 4),
        y: pos.y - (hovered ? 20 : 4),
        width: hovered ? 40 : 8,
        height: hovered ? 40 : 8,
        backgroundColor: hovered ? "transparent" : "#38bdf8",
        border: hovered ? "1px solid #38bdf8" : "none",
      }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    />
  );
}

function MarqueeText() {
  const items = ["Django", "React", "Kotlin", "Firebase", "Docker", "REST APIs", "MySQL", "CI/CD"];
  return (
    <div className="overflow-hidden border-y border-sky-400/20 py-4">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="text-sky-400/40 text-xs tracking-[0.3em] uppercase font-mono">
            {item} <span className="text-sky-400/20 mx-4">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Portfolio() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const [activeProject, setActiveProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="bg-[#060810] text-white min-h-screen overflow-x-hidden" style={{ fontFamily: "'Space Grotesk', sans-serif", cursor: "none" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; cursor: none !important; }
        ::-webkit-scrollbar { width: 0; }
        .syne { font-family: 'Syne', sans-serif; }
        .clip-text {
          background: linear-gradient(135deg, #fff 0%, #38bdf8 50%, #fff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .glow { box-shadow: 0 0 40px rgba(56,189,248,0.15); }
        .border-glow { border: 1px solid rgba(56,189,248,0.15); }
        .project-card:hover .project-number { color: #38bdf8; }
      `}</style>

      <Cursor />

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-sky-400 z-50 origin-left"
        style={{ width: progressWidth }}
      />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-8 py-6"
        style={{ background: "linear-gradient(to bottom, rgba(6,8,16,0.95), transparent)" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="syne font-bold text-lg tracking-tight"
        >
          F<span className="text-sky-400">.</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex items-center gap-8"
        >
          {["About", "Skills", "Projects", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-xs tracking-widest uppercase text-slate-400 hover:text-sky-400 transition-colors duration-300"
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="px-5 py-2 border border-sky-400/40 text-sky-400 text-xs tracking-widest uppercase hover:bg-sky-400 hover:text-[#060810] transition-all duration-300"
          >
            Hire Me
          </button>
        </motion.div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 z-50">
          <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} className="w-6 h-px bg-white block" />
          <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="w-6 h-px bg-white block" />
          <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} className="w-6 h-px bg-white block" />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#060810] z-30 flex flex-col items-center justify-center gap-8"
          >
            {["About", "Skills", "Projects", "Contact"].map((item, i) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => scrollTo(item.toLowerCase())}
                className="syne text-4xl font-bold text-white hover:text-sky-400 transition-colors"
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 pt-24 overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.02] syne select-none pointer-events-none leading-none pr-4">
          DEV
        </div>
        <div className="absolute right-16 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-sky-400/10 hidden md:block" />
        <div className="absolute right-24 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-sky-400/5 hidden md:block" />
        <div className="absolute right-[140px] top-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-sky-400/5 hidden md:block" />

        <div className="relative z-10 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-8 h-px bg-sky-400" />
            <span className="text-sky-400 text-xs tracking-[0.4em] uppercase">Available for work</span>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2 h-2 rounded-full bg-sky-400"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="syne font-black leading-[0.9] mb-6"
            style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
          >
            <span className="block">HELLO,</span>
            <span className="block clip-text">I'M FELIX KEGODE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-400 text-lg max-w-lg mb-10 leading-relaxed"
          >
            Fullstack developer crafting powerful web & mobile experiences with React.js, Flutter, Django, APIs, and Cloud/DevOps technologies. Passionate about building scalable,
            secure, and user-friendly applications that solve real-world problems..
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => scrollTo("projects")}
              className="syne font-bold px-8 py-4 bg-sky-400 text-[#060810] text-sm tracking-wider uppercase hover:bg-white transition-colors duration-300 glow"
            >
              See My Work →
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="syne font-bold px-8 py-4 border-glow text-white text-sm tracking-wider uppercase hover:border-sky-400 hover:text-sky-400 transition-all duration-300"
            >
              Get In Touch
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative z-10 flex gap-12 mt-20 border-t border-white/5 pt-8"
        >
          {[["5+", "Years Exp."], ["20+", "Projects"], ["8+", "Technologies"], ["100%", "Committed"]].map(([num, label]) => (
            <div key={label}>
              <div className="syne font-bold text-2xl text-sky-400">{num}</div>
              <div className="text-xs text-slate-500 tracking-wider mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      <MarqueeText />

      {/* About */}
      <section id="about" className="py-32 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sky-400/40 font-mono text-sm">01.</span>
              <span className="text-sky-400 text-xs tracking-[0.4em] uppercase">About Me</span>
            </div>
            <div className="grid md:grid-cols-5 gap-16 items-start">
              <div className="md:col-span-3">
                <h2 className="syne font-black text-5xl md:text-6xl leading-tight mb-8">
                  Turning ideas<br />into <span className="text-sky-400">reality.</span>
                </h2>
                <p className="text-slate-400 leading-relaxed mb-6">
                  I'm a passionate software developer specializing in fullstack development, mobile apps, and scalable backend systems.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  With deep expertise in Django, React, Kotlin, and Firebase, I bring a full-stack perspective to every challenge — from elegant UIs to high-performance APIs.
                </p>
              </div>
             <div className="md:col-span-2 space-y-3">
  {[
    ["Backend", "Django · Django REST Framework · REST APIs · Python · Node.js · Express · Authentication (JWT) · Microservices"],
    
    ["Frontend", "React · Next.js · Tailwind CSS · Framer Motion · HTML5 · CSS3 · JavaScript · Responsive Design"],
    
    ["Mobile", "Kotlin · Android SDK · Jetpack Compose · Firebase · MVVM Architecture · REST Integration · SQLite · Play Store Deployment"],
    
    ["Database", "MySQL · PostgreSQL · Firebase Realtime DB · Firestore · SQLite · Database Design · ORM (Django ORM) · Query Optimization"],
    
    ["DevOps", "CI/CD · Docker · Linux · Git & GitHub · GitHub Actions · Nginx · Kubernetes "],
    
    ["Cloud & Tools", "Firebase · Cloudinary · AWS (Basics) · Postman · VS Code · Jira"],
    
    ["Soft Skills", "Problem Solving · Team Collaboration · Agile/Scrum · Technical Mentorship · Communication · Debugging"],
  ].map(([title, desc]) => (
    <div
      key={title}
      className="border-glow p-4 hover:border-sky-400/40 transition-colors duration-300"
    >
      <div className="text-xs text-sky-400 tracking-widest uppercase mb-1">
        {title}
      </div>
      <div className="text-sm text-slate-300">{desc}</div>
    </div>
  ))}
</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-32 px-8 md:px-16 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sky-400/40 font-mono text-sm">02.</span>
              <span className="text-sky-400 text-xs tracking-[0.4em] uppercase">Expertise</span>
            </div>
            <h2 className="syne font-black text-5xl md:text-6xl">Skills.</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {SKILLS.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sky-400/40 text-xs">{String(i + 1).padStart(2, "0")}</span>
                    <span className="syne font-semibold text-base">{skill.name}</span>
                    <span className="text-xs text-slate-600 border border-slate-800 px-2 py-0.5">{skill.category}</span>
                  </div>
                  <span className="syne font-bold text-sky-400">{skill.level}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-sky-600 to-sky-400"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-32 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sky-400/40 font-mono text-sm">03.</span>
              <span className="text-sky-400 text-xs tracking-[0.4em] uppercase">Portfolio</span>
            </div>
            <h2 className="syne font-black text-5xl md:text-6xl">Projects.</h2>
          </motion.div>

          <div className="space-y-6">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="project-card group relative border-glow p-8 md:p-10 hover:border-sky-400/40 transition-all duration-500 overflow-hidden"
                onMouseEnter={() => setActiveProject(i)}
                onMouseLeave={() => setActiveProject(null)}
              >
                <motion.div
                  className="absolute inset-0 bg-sky-400/5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeProject === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10 flex items-start justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-start gap-6 mb-4">
                      <span className="project-number syne font-black text-5xl text-white/10 leading-none transition-colors duration-300">
                        {project.number}
                      </span>
                      <div>
                        <h3 className="syne font-bold text-2xl mb-3 group-hover:text-sky-400 transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-lg">{project.desc}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap ml-[4.5rem]">
                      {project.stack.map((tech) => (
                        <span key={tech} className="font-mono text-xs text-sky-400 bg-sky-400/10 px-3 py-1.5">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <motion.div
                    animate={{ x: activeProject === i ? 0 : 10, opacity: activeProject === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="syne font-bold text-sky-400 text-2xl flex-shrink-0 mt-2"
                  >
                    ↗
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-8 md:px-16 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sky-400/40 font-mono text-sm">04.</span>
              <span className="text-sky-400 text-xs tracking-[0.4em] uppercase">Contact</span>
            </div>
            <h2 className="syne font-black text-5xl md:text-6xl">
              Let's build<br />something <span className="text-sky-400">great.</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-lg">Have a project in mind? Drop me a message and let's get started.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16">
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              action="https://formspree.io/f/YOUR_FORM_ID"
              method="POST"
              className="space-y-6"
            >
              {[
                { name: "name", placeholder: "Your Name", type: "text" },
                { name: "email", placeholder: "Your Email", type: "email" },
              ].map((field) => (
                <input
                  key={field.name}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  required
                  className="w-full bg-white/5 border border-white/10 focus:border-sky-400 outline-none px-5 py-4 text-sm text-white placeholder-slate-600 transition-colors duration-300"
                />
              ))}
              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows="5"
                className="w-full bg-white/5 border border-white/10 focus:border-sky-400 outline-none px-5 py-4 text-sm text-white placeholder-slate-600 transition-colors duration-300 resize-none"
              />
              <button
                type="submit"
                className="syne font-bold w-full py-4 bg-sky-400 text-[#060810] text-sm tracking-widest uppercase hover:bg-white transition-colors duration-300 glow"
              >
                Send Message →
              </button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {[
                { label: "Email", value: "felixkegode@gmail.com", href: "mailto:felixkegode@gmail.com" },
                { label: "GitHub", value: "github.com/kegode", href: "https://github.com/kegode" },
                { label: "CV", value: "Download Resume", href: "https://drive.google.com/file/d/1KBicY3oKbvKz7eomjYR0Y7BxxtBW9i6b/view?usp=drive_link" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.label === "GitHub" ? "_blank" : undefined}
                  rel="noreferrer"
                  download={item.label === "CV"}
                  className="group flex items-center justify-between border-glow p-6 hover:border-sky-400/50 hover:bg-sky-400/5 transition-all duration-300"
                >
                  <div>
                    <div className="text-xs text-sky-400 tracking-widest uppercase mb-1">{item.label}</div>
                    <div className="text-slate-300 text-sm">{item.value}</div>
                  </div>
                  <span className="text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xl">↗</span>
                </a>
              ))}
              <div className="border-glow p-6">
                <div className="text-xs text-sky-400 tracking-widest uppercase mb-3">Status</div>
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-2.5 h-2.5 rounded-full bg-sky-400"
                  />
                  <span className="text-slate-300 text-sm">Available for freelance & full-time roles</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-8 md:px-16">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="syne font-black text-xl">F<span className="text-sky-400">.</span></span>
          {/* <span className="text-slate-600 text-xs tracking-widest uppercase">Built with React + Framer Motion</span> */}
          <span className="text-slate-600 text-xs">© 2026. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}