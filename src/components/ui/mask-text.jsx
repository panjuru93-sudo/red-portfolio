import Box from '@mui/material/Box';
import useInView from '../../hooks/use-in-view.js';

/** 살짝 튕기며 멈추는 back ease */
const BACK_EASE = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

/**
 * MaskText 컴포넌트
 * 줄마다 마스크(overflow: hidden) 아래에서 위로 튀어 올라오는 텍스트 등장 효과
 *
 * Props:
 * @param {string[]} lines - 줄 단위 텍스트 목록 [Required]
 * @param {string} component - 렌더링할 태그 [Optional, 기본값: 'h2']
 * @param {number} stagger - 줄 사이 지연(ms) [Optional, 기본값: 120]
 * @param {object} sx - 바깥 요소 스타일 [Optional, 기본값: {}]
 *
 * Example usage:
 * <MaskText lines={ ['Let’s make', 'something bold.'] } sx={ { fontSize: '4rem' } } />
 */
function MaskText({ lines, component = 'h2', stagger = 120, sx = {} }) {
  const [ref, isInView] = useInView(0.3);

  return (
    <Box ref={ ref } component={ component } aria-label={ lines.join(' ') } sx={ { m: 0, ...sx } }>
      { lines.map((line, i) => (
        <Box
          key={ line }
          component="span"
          aria-hidden
          sx={ { display: 'block', overflow: 'hidden', pb: '0.06em', mb: '-0.06em' } }
        >
          <Box
            component="span"
            sx={ {
              display: 'inline-block',
              transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 110%, 0)',
              transition: `transform 1.2s ${BACK_EASE} ${i * stagger}ms`,
              '@media (prefers-reduced-motion: reduce)': { transform: 'none', transition: 'none' },
            } }
          >
            { line }
          </Box>
        </Box>
      )) }
    </Box>
  );
}

export default MaskText;
