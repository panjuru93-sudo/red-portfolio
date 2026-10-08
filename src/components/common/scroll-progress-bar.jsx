import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';

/**
 * ScrollProgressBar 컴포넌트
 * 화면 최상단에 고정되어 페이지 전체 스크롤 진행률을 레드 바로 표시한다.
 *
 * Props:
 * @param {number} height - 바 두께(px) [Optional, 기본값: 4]
 *
 * Example usage:
 * <ScrollProgressBar height={ 4 } />
 */
function ScrollProgressBar({ height = 4 }) {
  const barRef = useRef(null);

  useEffect(() => {
    let frameId = 0;

    const update = () => {
      frameId = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (!frameId) frameId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <Box
      ref={ barRef }
      aria-hidden
      sx={ {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height,
        bgcolor: 'primary.main',
        transform: 'scaleX(0)',
        transformOrigin: '0 50%',
        zIndex: 1300,
      } }
    />
  );
}

export default ScrollProgressBar;
