import { useRef, useState } from 'react';
import Box from '@mui/material/Box';

/** 마우스가 나갈 때 통통 튀며 제자리로 돌아오는 ease */
const BOUNCE_EASE = 'cubic-bezier(0.34, 1.9, 0.64, 1)';

/**
 * MagneticWord 컴포넌트
 * 마우스를 따라 끌려오는 자석 텍스트 + 글자 뒤에서 마우스를 따라다니는 레드 공
 *
 * Props:
 * @param {string} word - 큰 영문 단어 [Required]
 * @param {string} label - 오른쪽 작은 설명 [Optional, 기본값: '']
 * @param {string} index - 왼쪽 번호 [Optional, 기본값: '']
 *
 * Example usage:
 * <MagneticWord word="Design" label="디자인" index="02" />
 */
function MagneticWord({ word, label = '', index = '' }) {
  const rowRef = useRef(null);
  const textRef = useRef(null);
  const ballRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const getRelative = (e) => {
    const rect = rowRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      fromCenterX: e.clientX - rect.left - rect.width / 2,
      fromCenterY: e.clientY - rect.top - rect.height / 2,
    };
  };

  const moveBall = (x, y) => {
    if (ballRef.current) ballRef.current.style.left = `${x}px`;
    if (ballRef.current) ballRef.current.style.top = `${y}px`;
  };

  const handleEnter = (e) => {
    const pos = getRelative(e);
    moveBall(pos.x, pos.y);
    setIsActive(true);
  };

  const handleMove = (e) => {
    const pos = getRelative(e);
    moveBall(pos.x, pos.y);
    if (textRef.current) {
      textRef.current.style.transition = 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
      textRef.current.style.transform = `translate3d(${pos.fromCenterX * 0.08}px, ${pos.fromCenterY * 0.3}px, 0)`;
    }
  };

  const handleLeave = () => {
    setIsActive(false);
    if (textRef.current) {
      textRef.current.style.transition = `transform 0.7s ${BOUNCE_EASE}`;
      textRef.current.style.transform = 'translate3d(0, 0, 0)';
    }
  };

  return (
    <Box
      ref={ rowRef }
      onMouseEnter={ handleEnter }
      onMouseMove={ handleMove }
      onMouseLeave={ handleLeave }
      sx={ {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 2, md: 4 },
        py: { xs: 1, md: 1.5 },
        borderBottom: '1.5px solid',
        borderColor: 'text.primary',
        overflow: 'hidden',
        isolation: 'isolate',
      } }
    >
      {/* 마우스를 따라다니는 공 */}
      <Box
        ref={ ballRef }
        aria-hidden
        sx={ {
          position: 'absolute',
          left: '50%',
          top: '50%',
          zIndex: -1,
          width: { xs: 90, md: 180 },
          height: { xs: 90, md: 180 },
          borderRadius: '50%',
          bgcolor: 'primary.main',
          pointerEvents: 'none',
          transform: `translate(-50%, -50%) scale(${isActive ? 1 : 0})`,
          transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), left 0.15s linear, top 0.15s linear',
        } }
      />

      <Box sx={ { width: { xs: 28, md: 48 }, fontFamily: '"Anton", sans-serif', fontSize: { xs: '0.8rem', md: '0.95rem' }, letterSpacing: '0.08em' } }>
        { index }
      </Box>
      <Box
        ref={ textRef }
        sx={ {
          flex: 1,
          fontFamily: '"Abril Fatface", serif',
          fontSize: { xs: '3.2rem', sm: '5rem', md: '7.5rem' },
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
          willChange: 'transform',
        } }
      >
        { word }
      </Box>
      <Box
        sx={ {
          fontSize: { xs: '0.85rem', md: '1rem' },
          fontWeight: 600,
          color: isActive ? 'text.primary' : 'text.secondary',
          transition: 'color 0.3s',
        } }
      >
        { label }
      </Box>
    </Box>
  );
}

export default MagneticWord;
