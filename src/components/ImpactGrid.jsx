import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function ImpactGrid() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const impactCards = gsap.utils.toArray('.impact-card');
    
    impactCards.forEach((card, idx) => {
      let activeBorderColor = 'rgba(255, 255, 255, 0.4)';
      if (idx === 0) activeBorderColor = 'rgba(124, 110, 242, 0.4)';
      else if (idx === 1) activeBorderColor = 'rgba(31, 182, 255, 0.4)';
      else if (idx === 2) activeBorderColor = 'rgba(34, 211, 161, 0.4)';

      gsap.fromTo(card,
        {
          opacity: 0.35,
          scale: 0.95,
          borderColor: 'rgba(255, 255, 255, 0.14)',
          borderRadius: '16px 16px 16px 16px',
          y: 20
        },
        {
          opacity: 1,
          scale: 1.02,
          borderColor: activeBorderColor,
          borderRadius: '28px 18px 34px 20px',
          y: 0,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true
          }
        }
      );
    });
  }, { scope: containerRef });

  const handlePointerMove = (e, idx) => {
    const card = e.currentTarget;
    const glow = card.querySelector('.impact-glow');
    if (!glow) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glow.style.left = x + 'px';
    glow.style.top = y + 'px';
  };

  return (
    <div className="impact-grid" ref={containerRef}>
      <div className="impact-card" onPointerMove={(e) => handlePointerMove(e, 0)}>
        <div className="impact-glow"></div>
        <div className="n">01</div>
        <h3>Innovation</h3>
        <div className="impact-row">
          <div className="k">Vision</div>
          <p>The future belongs to intelligent products that simplify complexity.</p>
        </div>
        <div className="impact-row">
          <div className="k">Action</div>
          <p>We develop AI-powered applications and digital platforms that solve meaningful problems.</p>
        </div>
        <div className="impact-row">
          <div className="k">Impact</div>
          <p>Technology that empowers people and businesses to achieve more.</p>
        </div>
      </div>

      <div className="impact-card" onPointerMove={(e) => handlePointerMove(e, 1)}>
        <div className="impact-glow"></div>
        <div className="n">02</div>
        <h3>Efficiency</h3>
        <div className="impact-row">
          <div className="k">Vision</div>
          <p>Organizations should spend less time on repetitive work and more time creating value.</p>
        </div>
        <div className="impact-row">
          <div className="k">Action</div>
          <p>We build intelligent systems that automate workflows and improve decision-making.</p>
        </div>
        <div className="impact-row">
          <div className="k">Impact</div>
          <p>Greater productivity, faster execution, and scalable growth.</p>
        </div>
      </div>

      <div className="impact-card" onPointerMove={(e) => handlePointerMove(e, 2)}>
        <div className="impact-glow"></div>
        <div className="n">03</div>
        <h3>Future</h3>
        <div className="impact-row">
          <div className="k">Vision</div>
          <p>AI should be practical, accessible, and beneficial for everyone.</p>
        </div>
        <div className="impact-row">
          <div className="k">Action</div>
          <p>We continuously explore new ideas, products, and technologies that shape tomorrow.</p>
        </div>
        <div className="impact-row">
          <div className="k">Impact</div>
          <p>A growing ecosystem of solutions that drives innovation across industries.</p>
        </div>
      </div>
    </div>
  );
}
