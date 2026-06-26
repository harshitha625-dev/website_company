import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Cube() {
  const cubeWrapRef = useRef(null);
  const cubeRef = useRef(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    const listener = () => setReduceMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    const cubeWrap = cubeWrapRef.current;
    const cube = cubeRef.current;
    if (!cubeWrap || !cube) return;

    cube.style.animation = 'none';

    let ry = 0, rx = -18;
    let dragging = false, lastX = 0, lastY = 0;
    let autoSpin = true;
    let isShuffling = false;
    let shuffleTween = null;

    const applyRotation = () => {
      cube.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    };

    let animationFrameId;
    const tick = () => {
      if (autoSpin && !dragging && !isShuffling && !reduceMotion) {
        ry += 0.25;
        applyRotation();
      }
      animationFrameId = requestAnimationFrame(tick);
    };
    animationFrameId = requestAnimationFrame(tick);

    const startDrag = (x, y) => {
      if (shuffleTween) {
        shuffleTween.kill();
        shuffleTween = null;
        isShuffling = false;
      }
      dragging = true;
      autoSpin = false;
      lastX = x;
      lastY = y;
      cubeWrap.classList.add('dragging');
    };

    const moveDrag = (x, y) => {
      if (!dragging) return;
      const dx = x - lastX;
      const dy = y - lastY;
      ry += dx * 0.4;
      rx = Math.max(-60, Math.min(20, rx - dy * 0.4));
      lastX = x;
      lastY = y;
      applyRotation();
    };

    const endDrag = () => {
      if (dragging) {
        dragging = false;
        autoSpin = true;
        cubeWrap.classList.remove('dragging');
      }
    };

    const handlePointerDown = (e) => startDrag(e.clientX, e.clientY);
    const handlePointerMove = (e) => moveDrag(e.clientX, e.clientY);

    cubeWrap.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);

    applyRotation();

    /* ---- Rubik's Cube Auto-Twist and Image Cycle ---- */
    const cycleRubikImage = () => {
      if (dragging || reduceMotion) return;
      const frontTiles = cube.querySelectorAll('.face.front .tile');
      const backTiles = cube.querySelectorAll('.face.back .tile');
      const leftTiles = cube.querySelectorAll('.face.left .tile');
      const rightTiles = cube.querySelectorAll('.face.right .tile');
      const topTiles = cube.querySelectorAll('.face.top .tile');
      const bottomTiles = cube.querySelectorAll('.face.bottom .tile');

      if (!frontTiles.length) return;

      const applyRowTwist = (tiles) => {
        tiles.forEach((tile, idx) => {
          if (idx < 3) tile.classList.add('animate-twist-row-right');
          else if (idx < 6) tile.classList.add('animate-twist-row-left');
          else tile.classList.add('animate-twist-row-right');
        });
      };

      const applyColTwist = (tiles) => {
        tiles.forEach((tile, idx) => {
          if (idx % 3 === 0) tile.classList.add('animate-twist-col-down');
          else if (idx % 3 === 1) tile.classList.add('animate-twist-col-up');
          else tile.classList.add('animate-twist-col-down');
        });
      };

      applyRowTwist(frontTiles);
      applyRowTwist(backTiles);
      applyRowTwist(topTiles);
      applyColTwist(leftTiles);
      applyColTwist(rightTiles);
      applyColTwist(bottomTiles);

      if (!dragging) {
        isShuffling = true;
        const rotationTarget = { ry, rx };
        shuffleTween = gsap.to(rotationTarget, {
          ry: ry + 360,
          rx: rx + 360,
          duration: 1.2,
          ease: "power2.inOut",
          onUpdate: () => {
            ry = rotationTarget.ry;
            rx = rotationTarget.rx;
            applyRotation();
          },
          onComplete: () => {
            isShuffling = false;
            shuffleTween = null;
          }
        });
      }

      setTimeout(() => {
        const photos = ['photo-elena', 'photo-sarah', 'photo-david', 'photo-smartcut', 'photo-landscape', 'photo-pipeline'];
        const getNextClass = (tile) => {
          let currentClass = 'photo-elena';
          photos.forEach((c) => {
            if (tile.classList.contains(c)) currentClass = c;
          });
          const nextIdx = (photos.indexOf(currentClass) + 1) % photos.length;
          return { old: currentClass, next: photos[nextIdx] };
        };

        [frontTiles, backTiles, leftTiles, rightTiles, topTiles, bottomTiles].forEach((faceTiles) => {
          faceTiles.forEach((tile) => {
            const res = getNextClass(tile);
            tile.classList.remove(res.old);
            tile.classList.add(res.next);
          });
        });
      }, 600);

      setTimeout(() => {
        const removeRowTwist = (tiles) => tiles.forEach(t => t.classList.remove('animate-twist-row-right', 'animate-twist-row-left'));
        const removeColTwist = (tiles) => tiles.forEach(t => t.classList.remove('animate-twist-col-up', 'animate-twist-col-down'));

        removeRowTwist(frontTiles);
        removeRowTwist(backTiles);
        removeRowTwist(topTiles);
        removeColTwist(leftTiles);
        removeColTwist(rightTiles);
        removeColTwist(bottomTiles);
      }, 1200);
    };

    const twistTimer = setInterval(cycleRubikImage, 3000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(twistTimer);
      cubeWrap.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', endDrag);
      window.removeEventListener('pointercancel', endDrag);
      if (shuffleTween) shuffleTween.kill();
    };
  }, [reduceMotion]);

  // Generate 9 tiles per face
  const tiles = Array.from({ length: 9 }).map((_, i) => {
    const x = (i % 3) * 50;
    const y = Math.floor(i / 3) * 50;
    return { bgPos: `${x}% ${y}%` };
  });

  return (
    <div className="cube-wrap" id="cube-wrap" ref={cubeWrapRef}>
      <div className="cube" id="cube" ref={cubeRef}>
        <div className="face front">
          {tiles.map((t, i) => <div key={`front-${i}`} className="tile photo-elena" style={{ backgroundPosition: t.bgPos }}></div>)}
        </div>
        <div className="face back">
          {tiles.map((t, i) => <div key={`back-${i}`} className="tile photo-david" style={{ backgroundPosition: t.bgPos }}></div>)}
        </div>
        <div className="face right">
          {tiles.map((t, i) => <div key={`right-${i}`} className="tile photo-smartcut" style={{ backgroundPosition: t.bgPos }}></div>)}
        </div>
        <div className="face left">
          {tiles.map((t, i) => <div key={`left-${i}`} className="tile photo-sarah" style={{ backgroundPosition: t.bgPos }}></div>)}
        </div>
        <div className="face top">
          {tiles.map((t, i) => <div key={`top-${i}`} className="tile photo-landscape" style={{ backgroundPosition: t.bgPos }}></div>)}
        </div>
        <div className="face bottom">
          {tiles.map((t, i) => <div key={`bottom-${i}`} className="tile photo-pipeline" style={{ backgroundPosition: t.bgPos }}></div>)}
        </div>
      </div>
      <div className="cube-shadow"></div>
      <p className="cube-hint" style={{ textTransform: 'uppercase', fontFamily: 'var(--mono)', letterSpacing: '0.15em', fontSize: '10px' }}>DRAG TO ROTATE</p>
    </div>
  );
}
