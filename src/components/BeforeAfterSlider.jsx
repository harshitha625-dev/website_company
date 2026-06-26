import { useState, useRef, useEffect } from 'react';

export default function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeFilter, setActiveFilter] = useState('filter-cinematic');
  const sliderRef = useRef(null);

  const handlePointerMove = (e) => {
    if (!sliderRef.current || e.buttons !== 1) return;
    const rect = sliderRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let pct = (x / rect.width) * 100;
    pct = Math.max(0, Math.min(100, pct));
    setSliderPos(pct);
  };

  const setFilter = (filterName) => {
    setActiveFilter(filterName);
  };

  return (
    <div className="ba-wrap">
      <div className="ba-label-row">
        <span>RAW FOOTAGE</span>
        <span>AI EDITED</span>
      </div>
      <div
        className="ba-slider"
        ref={sliderRef}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerMove}
      >
        <div className="ba-raw"></div>
        <div
          className={`ba-edited ${activeFilter}`}
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <div className="grain"></div>
        </div>
        <div className="ba-handle" style={{ left: `${sliderPos}%` }}></div>
        <div className="ba-tag raw">LOG</div>
        <div className="ba-tag edit">LUT + GRADE</div>
      </div>
      <div className="ba-filter-controls">
        <span className="filter-label">Try Filters:</span>
        <button
          className={`filter-btn ${activeFilter === 'filter-cinematic' ? 'active' : ''}`}
          onClick={() => setFilter('filter-cinematic')}
        >
          Cinematic
        </button>
        <button
          className={`filter-btn ${activeFilter === 'filter-teal-orange' ? 'active' : ''}`}
          onClick={() => setFilter('filter-teal-orange')}
        >
          Teal & Orange
        </button>
        <button
          className={`filter-btn ${activeFilter === 'filter-retro' ? 'active' : ''}`}
          onClick={() => setFilter('filter-retro')}
        >
          Retro Film
        </button>
        <button
          className={`filter-btn ${activeFilter === 'filter-cyberpunk' ? 'active' : ''}`}
          onClick={() => setFilter('filter-cyberpunk')}
        >
          Cyberpunk
        </button>
        <button
          className={`filter-btn ${activeFilter === 'filter-noir' ? 'active' : ''}`}
          onClick={() => setFilter('filter-noir')}
        >
          Noir
        </button>
      </div>
    </div>
  );
}
