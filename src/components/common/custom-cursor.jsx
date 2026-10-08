import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

/**
 * CustomCursor 컴포넌트
 * 마우스를 부드럽게 따라오는 커서. 마우스(정밀 포인터) 환경에서만 표시된다.
 * - `data-cursor="view"` 요소 위: 큰 블랙 원 + 'VIEW' 라벨
 * - 링크/버튼 위: 링으로 커짐
 *
 * Example usage:
 * <CustomCursor />
 */
function CustomCursor() {
  const cursorRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [mode, setMode] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    const sync = () => setIsEnabled(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!isEnabled) return undefined;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let frameId = 0;

    const render = () => {
      current.x += (target.x - current.x) * 0.2;
      current.y += (target.y - current.y) * 0.2;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      }
      frameId = window.requestAnimationFrame(render);
    };

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setIsVisible(true);
    };

    const onOver = (e) => {
      const el = e.target instanceof Element ? e.target : null;
      if (el?.closest('[data-cursor="view"]')) setMode('view');
      else if (el?.closest('a, button, [role="tab"]')) setMode('link');
      else setMode('default');
    };

    const onLeave = () => setIsVisible(false);

    frameId = window.requestAnimationFrame(render);
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  const SIZES = { default: 12, link: 44, view: 96 };
  const size = SIZES[mode];

  return (
    <Box
      ref={ cursorRef }
      aria-hidden
      sx={ {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1400,
        pointerEvents: 'none',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s',
      } }
    >
      <Box
        sx={ {
          width: size,
          height: size,
          ml: `${-size / 2}px`,
          mt: `${-size / 2}px`,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0.25,
          bgcolor: mode === 'view' ? 'common.black' : mode === 'link' ? 'transparent' : 'primary.main',
          border: mode === 'link' ? '1.5px solid' : 'none',
          borderColor: 'primary.main',
          color: 'common.white',
          fontFamily: '"Anton", sans-serif',
          fontSize: '0.85rem',
          letterSpacing: '0.08em',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        } }
      >
        { mode === 'view' && (
          <>
            VIEW
            <ArrowOutwardIcon sx={ { fontSize: '0.95rem' } } />
          </>
        ) }
      </Box>
    </Box>
  );
}

export default CustomCursor;
