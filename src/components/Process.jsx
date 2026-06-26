import { useState, useEffect, useRef } from 'react';

const stages = [
  {
    n: '01',
    t: 'Discover',
    tag: '01 — DISCOVER',
    title: 'Understanding the Vision',
    desc: 'We begin by understanding the problem, defining goals, and identifying opportunities where AI and technology can create meaningful impact.'
  },
  {
    n: '02',
    t: 'Design',
    tag: '02 — DESIGN',
    title: 'Crafting the Experience',
    desc: 'We design intuitive user experiences, system architectures, and product strategies that align with business objectives and user needs.'
  },
  {
    n: '03',
    t: 'Develop',
    tag: '03 — DEVELOP',
    title: 'Building Intelligent Solutions',
    desc: 'Our team develops AI-powered applications, modern web platforms, and scalable digital products using cutting-edge technologies and best practices.'
  },
  {
    n: '04',
    t: 'Launch & Scale',
    tag: '04 — LAUNCH & SCALE',
    title: 'Growing for the Future',
    desc: 'We deploy, optimize, and continuously improve products to ensure performance, scalability, and long-term success as businesses evolve.'
  }
];

export default function Process() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reduceMotion = mediaQuery.matches;

    if (reduceMotion || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % stages.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <section className="section-pad" id="process">
      <div className="wrap">
        <div className="section-label">HOW VEYTRIX WORKS</div>
        <h2 className="reveal" style={{ fontSize: 'clamp(26px,3.4vw,38px)', maxWidth: '560px' }}>
          Four stages, turning ideas into intelligent products.
        </h2>

        <div className="stage-shell reveal">
          <div className="stage-tabs" id="stage-tabs">
            {stages.map((stage, idx) => (
              <div
                key={idx}
                className={`stage-tab ${activeTab === idx ? 'active' : ''}`}
                onClick={() => handleTabClick(idx)}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                style={{ cursor: 'pointer' }}
              >
                <div className="n">{stage.n}</div>
                <div className="t">{stage.t}</div>
                <div className="bar"></div>
              </div>
            ))}
          </div>
          {stages.map((stage, idx) => (
            <div
              key={idx}
              className={`stage-panel ${activeTab === idx ? 'active' : ''}`}
            >
              <span className="tag">{stage.tag}</span>
              <h3
                style={{
                  margin: '0 0 14px',
                  fontSize: '1.45rem',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg,#fff 40%,var(--accent,#7c6ef2))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {stage.title}
              </h3>
              <p>{stage.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
