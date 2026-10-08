import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';

const slide = keyframes`
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
`;

/**
 * MarqueeBand 컴포넌트
 * 좌측으로 끝없이 흐르는 텍스트 띠
 *
 * Props:
 * @param {string[]} items - 흐를 텍스트 목록 [Required]
 * @param {number} duration - 한 바퀴 시간(초) [Optional, 기본값: 30]
 *
 * Example usage:
 * <MarqueeBand items={ ['REACT', 'MUI'] } duration={ 25 } />
 */
function MarqueeBand({ items, duration = 30 }) {
  /** 끊김 없이 이어지도록 같은 목록을 두 번 렌더링 */
  const loop = [...items, ...items];

  return (
    <Box
      aria-hidden
      sx={ {
        overflow: 'hidden',
        borderTop: '1px solid',
        borderBottom: '1px solid',
        borderColor: 'grey.800',
        py: { xs: 1.25, md: 1.75 },
      } }
    >
      <Box
        sx={ {
          display: 'flex',
          width: 'max-content',
          animation: `${slide} ${duration}s linear infinite`,
        } }
      >
        { loop.map((item, i) => (
          <Box
            key={ `${item}-${i}` }
            sx={ {
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 2, md: 3 },
              pr: { xs: 2, md: 3 },
              fontFamily: '"Anton", sans-serif',
              fontSize: { xs: '1rem', md: '1.3rem' },
              letterSpacing: '0.08em',
              whiteSpace: 'nowrap',
              color: i % 2 ? 'grey.600' : 'common.white',
            } }
          >
            { item }
            <Box component="span" sx={ { width: 10, height: 10, bgcolor: 'primary.main', transform: 'rotate(45deg)' } } />
          </Box>
        )) }
      </Box>
    </Box>
  );
}

export default MarqueeBand;
