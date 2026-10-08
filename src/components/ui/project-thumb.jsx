import Box from '@mui/material/Box';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import useScrollProgress from '../../hooks/use-scroll-progress.js';

const TONES = {
  red: { bg: 'primary.main', shape: 'common.black', text: 'common.black' },
  dark: { bg: '#1C1C1C', shape: 'common.white', text: 'common.white' },
  light: { bg: '#F2F0EB', shape: 'primary.main', text: 'common.black' },
};

const SHAPES = {
  circle: { width: '30%', aspectRatio: '1 / 1', borderRadius: '50%' },
  diamond: { width: '22%', aspectRatio: '1 / 1', transform: 'rotate(45deg)' },
  half: { width: '36%', aspectRatio: '2 / 1', borderRadius: '999px 999px 0 0' },
  ring: { width: '30%', aspectRatio: '1 / 1', borderRadius: '50%', bgcolor: 'transparent !important', border: { xs: '14px solid', md: '20px solid' } },
  pill: { width: '44%', aspectRatio: '2.2 / 1', borderRadius: 999 },
  quarter: { width: '28%', aspectRatio: '1 / 1', borderRadius: '100% 0 0 0' },
};

/**
 * ProjectThumb 컴포넌트
 * 프로젝트마다 다른 색/도형 조합의 썸네일. 스크롤 패럴랙스 + 호버 시 'VIEW SITE' 배지 표시.
 * 부모 요소의 `&:hover .project-thumb__*` 셀렉터로 호버 효과가 동작한다.
 *
 * Props:
 * @param {string} index - 프로젝트 번호 [Required]
 * @param {string} tone - 색 조합 ('red' | 'dark' | 'light') [Optional, 기본값: 'dark']
 * @param {string} shape - 도형 ('circle' | 'diamond' | 'half' | 'ring' | 'pill' | 'quarter') [Optional, 기본값: 'circle']
 * @param {boolean} isFeatured - 대표 프로젝트(와이드 비율) 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <ProjectThumb index="01" tone="red" shape="circle" isFeatured />
 */
function ProjectThumb({ index, tone = 'dark', shape = 'circle', isFeatured = false }) {
  const thumbRef = useScrollProgress({ reducedValue: 0.5 });

  /** 마우스 위치를 CSS 변수로 기록 — 스포트라이트 위치에 사용 */
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--spot-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    e.currentTarget.style.setProperty('--spot-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };
  const colors = TONES[tone] ?? TONES.dark;
  const shapeSx = SHAPES[shape] ?? SHAPES.circle;

  return (
    <Box
      ref={ thumbRef }
      onMouseMove={ handleMouseMove }
      sx={ {
        position: 'relative',
        aspectRatio: isFeatured ? { xs: '4 / 3', md: '21 / 9' } : '4 / 3',
        borderRadius: { xs: 4, md: 5 },
        bgcolor: colors.bg,
        color: colors.text,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      } }
    >
      {/* 마우스를 따라다니는 스포트라이트 */}
      <Box
        className="project-thumb__spot"
        aria-hidden
        sx={ {
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.4s',
          background: 'radial-gradient(circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255, 255, 255, 0.35) 0, rgba(255, 255, 255, 0) 38%)',
          mixBlendMode: 'soft-light',
        } }
      />

      {/* 배경 대형 번호 */}
      <Box
        aria-hidden
        sx={ {
          position: 'absolute',
          right: '-2%',
          bottom: '-18%',
          fontFamily: '"Abril Fatface", serif',
          fontSize: isFeatured ? { xs: '9rem', md: '16rem' } : { xs: '9rem', md: '11rem' },
          lineHeight: 1,
          opacity: 0.12,
          transform: 'translate3d(0, calc((var(--scroll-progress, 0.5) - 0.5) * 30%), 0)',
          userSelect: 'none',
        } }
      >
        { index }
      </Box>

      {/* 도형 — 스크롤 패럴랙스 */}
      <Box
        sx={ {
          display: 'flex',
          justifyContent: 'center',
          width: isFeatured ? { xs: '100%', md: '50%' } : '100%',
          transform: 'translate3d(0, calc((var(--scroll-progress, 0.5) - 0.5) * -70%), 0)',
        } }
      >
        <Box
          className="project-thumb__shape"
          sx={ {
            bgcolor: colors.shape,
            borderColor: colors.shape,
            transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
            ...shapeSx,
          } }
        />
      </Box>

      {/* 좌상단 번호 */}
      <Box
        sx={ {
          position: 'absolute',
          top: 16,
          left: 20,
          fontFamily: '"Anton", sans-serif',
          fontSize: '0.9rem',
          letterSpacing: '0.08em',
        } }
      >
        { index }
      </Box>

      {/* 호버 시 나타나는 배지 */}
      <Box
        className="project-thumb__badge"
        sx={ {
          position: 'absolute',
          right: 16,
          top: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          px: 1.75,
          py: 0.75,
          borderRadius: 999,
          bgcolor: 'common.white',
          color: 'common.black',
          fontFamily: '"Anton", sans-serif',
          fontSize: '0.75rem',
          letterSpacing: '0.08em',
          opacity: 0,
          transform: 'translateY(-8px)',
          transition: 'opacity 0.3s, transform 0.3s',
        } }
      >
        VIEW SITE
        <ArrowOutwardIcon sx={ { fontSize: '0.9rem' } } />
      </Box>
    </Box>
  );
}

export default ProjectThumb;
