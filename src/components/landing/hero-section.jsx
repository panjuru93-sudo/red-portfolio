import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { keyframes } from '@mui/material/styles';
import useScrollProgress from '../../hooks/use-scroll-progress.js';
import TypingText from '../ui/typing-text.jsx';

const circleIn = keyframes`
  from { transform: translateX(-50%) scale(0); }
  to { transform: translateX(-50%) scale(1); }
`;

const riseIn = keyframes`
  from { opacity: 0; transform: translateY(40%); }
  to { opacity: 1; transform: translateY(0); }
`;

const diamondIn = keyframes`
  0% { opacity: 0; transform: translateX(-50%) translateY(-1.2em) rotate(-135deg); }
  70% { opacity: 1; transform: translateX(-50%) translateY(0.05em) rotate(45deg); }
  100% { opacity: 1; transform: translateX(-50%) translateY(0) rotate(45deg); }
`;

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

/**
 * HeroSection 컴포넌트
 * 레드 원 위에 겹쳐진 대형 세리프 'portfolio' 타이틀 (i 의 점은 다이아몬드)
 *
 * Props:
 * @param {string} subtitle - 타이틀 아래 소개 문구 [Optional, 기본값: 'Designer & Developer']
 *
 * Example usage:
 * <HeroSection subtitle="Designer & Developer" />
 */
function HeroSection({ subtitle = 'Designer & Developer' }) {
  /** 히어로가 화면 위로 빠져나가는 정도 (0 → 1) */
  const sectionRef = useScrollProgress({ start: 0, end: 0 });

  return (
    <Box
      ref={ sectionRef }
      id="top"
      component="section"
      sx={ {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowX: 'clip',
        pt: { xs: 6, md: 10 },
        pb: { xs: 8, md: 14 },
      } }
    >
      <Box sx={ { position: 'relative', display: 'inline-block' } }>
        {/* 레드 원 — 스크롤 시 아래로 내려가며 커짐 */}
        <Box
          aria-hidden
          sx={ {
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            transformOrigin: '50% 75%',
            transform: 'translate3d(0, calc(var(--scroll-progress, 0) * 35%), 0) scale(calc(1 + var(--scroll-progress, 0) * 0.7))',
          } }
        >
          <Box
            sx={ {
              position: 'absolute',
              left: '50%',
              bottom: '-4%',
              transform: 'translateX(-50%)',
              width: '42%',
              aspectRatio: '1 / 1',
              borderRadius: '50%',
              bgcolor: 'primary.main',
              animation: `${circleIn} 1.1s ${EASE} both`,
            } }
          />
        </Box>

        {/* 타이틀 — 스크롤 시 위로 올라가며 흐려짐 */}
        <Box
          sx={ {
            position: 'relative',
            zIndex: 1,
            transform: 'translate3d(0, calc(var(--scroll-progress, 0) * -30%), 0)',
            opacity: 'calc(1 - var(--scroll-progress, 0) * 0.9)',
          } }
        >
          <Typography
            variant="h1"
            sx={ {
              position: 'relative',
              zIndex: 1,
              m: 0,
              fontSize: { xs: '3.6rem', sm: '6.5rem', md: '9.5rem', lg: '12rem' },
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: 'text.primary',
              whiteSpace: 'nowrap',
              animation: `${riseIn} 1s ${EASE} 0.35s both`,
            } }
          >
            portfol
            <Box component="span" sx={ { position: 'relative', display: 'inline-block' } }>
              ı
              {/* 다이아몬드 점 */}
              <Box
                component="span"
                aria-hidden
                sx={ {
                  position: 'absolute',
                  left: '50%',
                  top: '0.12em',
                  width: '0.17em',
                  height: '0.17em',
                  bgcolor: 'text.primary',
                  transform: 'translateX(-50%) rotate(45deg)',
                  animation: `${diamondIn} 0.9s ${EASE} 1.1s both`,
                } }
              />
            </Box>
            o
          </Typography>
        </Box>
      </Box>

      <Box
        sx={ {
          mt: { xs: 3, md: 4 },
          fontFamily: '"Anton", sans-serif',
          fontSize: { xs: '0.9rem', md: '1.1rem' },
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'text.secondary',
          opacity: 'calc(1 - var(--scroll-progress, 0) * 2)',
        } }
      >
        <TypingText text={ subtitle } startDelay={ 1300 } speed={ 60 } />
      </Box>
    </Box>
  );
}

export default HeroSection;
