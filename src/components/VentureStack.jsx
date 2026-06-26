import { useState, useRef, useEffect } from 'react';

export default function VentureStack() {
  const stackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = 2;

  const updatePagination = () => {
    if (!stackRef.current) return;
    const cards = stackRef.current.querySelectorAll('.v-card');
    if (cards.length === 0) return;
    
    const stackRect = stackRef.current.getBoundingClientRect();
    const center = stackRect.left + stackRect.width / 2;
    let index = 0;
    let minDiff = Infinity;
    
    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const diff = Math.abs(cardCenter - center);
      if (diff < minDiff) {
        minDiff = diff;
        index = i;
      }
    });
    setCurrentIndex(index);
  };

  useEffect(() => {
    const stack = stackRef.current;
    if (stack) {
      stack.addEventListener('scroll', updatePagination, { passive: true });
      window.addEventListener('resize', updatePagination, { passive: true });
      return () => {
        stack.removeEventListener('scroll', updatePagination);
        window.removeEventListener('resize', updatePagination);
      };
    }
  }, []);

  const handlePrev = () => {
    if (stackRef.current) {
      const cardWidth = stackRef.current.querySelector('.v-card').offsetWidth;
      stackRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (stackRef.current) {
      const cardWidth = stackRef.current.querySelector('.v-card').offsetWidth;
      stackRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="venture-stack" id="venture-stack" ref={stackRef}>
        <div className="v-card v-card-1">
          <div className="v-glow"></div>
          <div className="v-card-header">
            <span className="v-num">01 / FLAGSHIP</span>
            <span className="v-badge live"><span className="dp"></span>Live Product</span>
          </div>
          <div className="v-title">Veytrix.ai</div>
          <p className="v-desc">An AI-powered video intelligence platform that analyzes raw footage the way a
            professional editor would &mdash; understanding pacing, scene rhythm, and story structure to
            deliver finished cuts in seconds.</p>
          <div className="v-footer">
            <a href="https://veytrix.ai" target="_blank" rel="noreferrer" className="btn btn-primary"
               style={{ fontSize: '13px', padding: '10px 20px', borderRadius: '8px' }}>Try Veytrix.ai</a>
            <div className="v-tags">
              <span className="v-tag">Computer Vision</span>
              <span className="v-tag">Auto-Cut AI</span>
              <span className="v-tag">Scene Intelligence</span>
            </div>
          </div>
        </div>

        <div className="v-card v-card-2"
             style={{ justifyContent: 'center', alignItems: 'center', minHeight: '340px' }}>
          <div className="v-glow"></div>
          <span className="v-num" style={{ marginBottom: '12px' }}>02 / PIPELINE</span>
          <div className="v-title"
               style={{ margin: 0, background: 'linear-gradient(135deg, #ffffff 40%, #22d3a1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Coming Soon</div>
        </div>
      </div>
      
      <p className="venture-scroll-hint">&#8595; Hover to expand ventures</p>
      <div className="venture-controls">
        <button id="venture-prev" aria-label="Previous" onClick={handlePrev}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <span className="venture-pagination" id="venture-pag">0{currentIndex + 1} / 0{totalCards}</span>
        <button id="venture-next" aria-label="Next" onClick={handleNext}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    </>
  );
}
