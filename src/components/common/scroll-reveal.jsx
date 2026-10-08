import Box from '@mui/material/Box';
import useInView from '../../hooks/use-in-view.js';

const VARIANTS = {
  up: 'translate3d(0, 60px, 0)',
  left: 'translate3d(-60px, 0, 0)',
  right: 'translate3d(60px, 0, 0)',
  scale: 'scale(0.92)',
};

/**
 * ScrollReveal 컴포넌트
 * 스크롤로 화면에 들어올 때 자식 요소를 페이드 + 이동/확대 애니메이션으로 등장시킨다.
 *
 * Props:
 * @param {node} children - 애니메이션을 적용할 내용 [Required]
 * @param {string} variant - 등장 방향 ('up' | 'left' | 'right' | 'scale') [Optional, 기본값: 'up']
 * @param {number} delay - 시작 지연 시간(ms) [Optional, 기본값: 0]
 * @param {number} duration - 애니메이션 시간(ms) [Optional, 기본값: 900]
 *
 * Example usage:
 * <ScrollReveal variant="scale" delay={ 100 }><WorksCard /></ScrollReveal>
 */
function ScrollReveal({ children, variant = 'up', delay = 0, duration = 900 }) {
  const [ref, isInView] = useInView();

  return (
    <Box
      ref={ ref }
      sx={ {
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'none' : VARIANTS[variant],
        transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: 'opacity, transform',
        '@media (prefers-reduced-motion: reduce)': {
          opacity: 1,
          transform: 'none',
          transition: 'none',
        },
      } }
    >
      { children }
    </Box>
  );
}

export default ScrollReveal;
