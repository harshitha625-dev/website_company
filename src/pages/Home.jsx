import { useEffect, useRef } from 'react';
import Cube from '../components/Cube';
import VentureStack from '../components/VentureStack';
import ImpactGrid from '../components/ImpactGrid';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import Process from '../components/Process';

export default function Home() {
  const topRef = useRef(null);
  const visionRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const topEl = topRef.current;
      const visionEl = visionRef.current;
      const cubeStage = document.getElementById('cube-stage');
      const cubeWrap = document.getElementById('cube-wrap');
      const placeholder = document.getElementById('cube-stage-placeholder');

      if (!topEl || !visionEl || !cubeStage || !cubeWrap || !placeholder) return;

      const sections = [topEl, visionEl];
      const sectionCenters = sections.map(sec => {
        const rect = sec.getBoundingClientRect();
        return rect.top + window.scrollY + rect.height / 2;
      });

      const w = window.innerWidth;
      const h = window.innerHeight;
      const scrollY = window.scrollY;
      const viewportCenterY = scrollY + h / 2;

      let idx = 0;
      for (let i = 0; i < sectionCenters.length - 1; i++) {
        if (viewportCenterY >= sectionCenters[i]) {
          idx = i;
        }
      }

      const c1 = sectionCenters[idx];
      const c2 = sectionCenters[idx + 1];
      let pct = 0;
      if (c2 && c2 > c1) {
        pct = (viewportCenterY - c1) / (c2 - c1);
        pct = Math.max(0, Math.min(1, pct));
      }
      const ease = pct * pct * (3 - 2 * pct);

      const targetPageY = c1 + (c2 ? (c2 - c1) * ease : 0);
      const targetViewportY = targetPageY - scrollY;

      const isDesktop = w > 880;
      const amplitude = isDesktop ? Math.min(280, w * 0.22) : 0;
      const screenCenterX = w / 2;

      let startX = screenCenterX;
      let currentX = screenCenterX;
      let currentY = h / 2;
      
      const pRect = placeholder.getBoundingClientRect();
      startX = pRect.left + pRect.width / 2;
      currentX = startX;
      currentY = pRect.top + pRect.height / 2;

      const xTargets = [startX, screenCenterX - amplitude];
      const x1 = xTargets[idx] !== undefined ? xTargets[idx] : startX;
      const x2 = xTargets[idx + 1] !== undefined ? xTargets[idx + 1] : (screenCenterX - amplitude);
      const targetViewportX = x1 + (x2 - x1) * ease;

      const translateX = targetViewportX - currentX;
      const translateY = targetViewportY - currentY;

      if (isDesktop) {
        cubeWrap.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
      } else {
        cubeWrap.style.transform = `translate3d(0, 0, 0)`;
      }

      const docH = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPct = docH > 0 ? scrollY / docH : 0;
      let opacity = 1;
      if (scrollPct > 0.85) {
        opacity = 1 - (scrollPct - 0.85) / 0.15;
      }
      if (isDesktop) {
        cubeWrap.style.opacity = Math.max(0, Math.min(1, opacity));
      } else {
        cubeWrap.style.opacity = 1;
      }

      const hint = cubeStage.querySelector('.cube-hint');
      if (hint) {
        const heroCenter = sectionCenters[0];
        const vCenter = sectionCenters[1];
        let hintOpacity = 1;
        if (viewportCenterY > heroCenter && vCenter) {
          hintOpacity = 1 - (viewportCenterY - heroCenter) / (vCenter - heroCenter);
          hintOpacity = Math.max(0, Math.min(1, hintOpacity));
        }
        hint.style.opacity = hintOpacity;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <main>
      <section className="hero" id="top" ref={topRef}>
        <div className="hero-blobs">
          <span className="blob blob-a"></span>
          <span className="blob blob-b"></span>
          <span className="blob blob-c"></span>
        </div>
        <svg className="hero-lines" viewBox="0 0 400 400" fill="none">
          <path d="M0 320 Q100 280 200 320 T400 300" stroke="#ffffff" strokeWidth="1" />
          <path d="M0 350 Q100 300 200 350 T400 330" stroke="#999999" strokeWidth="1" />
          <path d="M0 380 Q100 330 200 380 T400 360" stroke="#ffffff" strokeWidth="1" />
          <circle cx="340" cy="120" r="2" fill="#ffffff" />
          <circle cx="300" cy="200" r="2" fill="#999999" />
          <circle cx="370" cy="240" r="2" fill="#ffffff" />
        </svg>

        <div className="hud-frame">
          <span className="hud-corner tl"></span>
          <span className="hud-corner tr"></span>
          <span className="hud-corner bl"></span>
          <span className="hud-corner br"></span>
          <span className="hud-label top-right">REC ● 4K / 60</span>
        </div>

        <div className="wrap hero-inner">
          <div className="hero-grid-layout">
            <div className="hero-copy">
              <div className="eyebrow" style={{ textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'var(--mono)', fontSize: '13px', marginBottom: '20px' }}>
                <span className="dot"></span>AI PRODUCTS & FREELANCE WEBSITE'S _
              </div>
              <h1 style={{ lineHeight: '1.15', marginBottom: '32px', fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 700 }}>
                One Vision,<br /><span className="accent">Endless Possibilities.</span>
              </h1>
              <p className="hero-sub" style={{ maxWidth: '520px', color: 'var(--muted)', fontSize: '18px', lineHeight: '1.6' }}>
                MAVROS is an AI innovation company focused on building intelligent applications, freelance website's, and digital products that solve real-world problems. We combine cutting-edge artificial intelligence with modern software development to create scalable solutions that help businesses and people work smarter, faster, and more efficiently.
              </p>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginTop: '45px', maxWidth: '520px' }}></div>
            </div>

            <div className="cube-stage-placeholder" id="cube-stage-placeholder">
              <div className="cube-stage" id="cube-stage">
                <Cube />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" id="vision" ref={visionRef}>
        <div className="wrap">
          <div className="vision-grid">
            <div className="vision-spacer"></div>
            <div className="reveal">
              <div className="section-label">VISION</div>
              <h2>We build products that make technology smarter and more accessible.</h2>
              <p className="lead">
                MAVROS creates intelligent software, AI-driven applications,Freelance website's and digital
                experiences that empower businesses to work smarter and grow faster. We focus on building
                practical, scalable solutions that bridge the gap between innovation and everyday use.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Process />

      <section className="section-pad" id="product">
        <div className="wrap">
          <div className="section-label venture-sticky-label">VENTURE STUDIO</div>
          <h2 className="reveal" style={{ fontSize: 'clamp(26px,3.4vw,42px)', maxWidth: '700px', marginBottom: '60px' }}>
            Products we build.<br />
            <span style={{ background: 'linear-gradient(135deg,#fff 30%,#9b8aff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Ventures that scale.</span>
          </h2>
          <VentureStack />
        </div>
      </section>

      <section className="section-pad" id="impact">
        <div className="wrap">
          <div className="section-label">IMPACT</div>
          <h2 className="reveal" style={{ fontSize: 'clamp(26px,3.4vw,38px)', maxWidth: '600px' }}>Building technology that creates lasting value.</h2>
          <ImpactGrid />
        </div>
      </section>


      <section className="section-pad" id="contact">
        <div className="wrap">
          <div className="contact-box reveal">
            <span className="c-corner tl"></span>
            <span className="c-corner br"></span>
            <div className="eyebrow" style={{ justifyContent: 'center' }}>LET'S BUILD SOMETHING</div>
            <h2>Got footage that needs a story?</h2>
            <p>Tell us what you're shooting and how much of it there is. We'll show you what MAVROS does with it.</p>
            <a href="mailto:hello@mavros.ai?subject=MAVROS%20enquiry&body=Hi%20MAVROS%20team%2C%0A%0AI%27d%20like%20to%20discuss..." className="btn btn-primary">Email MAVROS</a>
          </div>
        </div>
      </section>
    </main>
  );
}
