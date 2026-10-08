import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useScrollProgress from '../../hooks/use-scroll-progress.js';

const SKILLS = ['Figma', 'Photoshop', 'Illustrator', 'React', 'MUI', 'Claude Code'];

/**
 * AboutSection 컴포넌트
 * 자기소개 문구와 스킬 목록
 *
 * Props:
 * @param {string} intro - 자기소개 문구 [Optional, 기본값: 소개 예시 문구]
 *
 * Example usage:
 * <AboutSection intro="안녕하세요, 디자이너입니다." />
 */
function AboutSection({
  intro = '안녕하세요. 선명한 색과 대담한 타이포그래피로 기억에 남는 경험을 만드는 디자이너입니다. 브랜드부터 웹까지, 아이디어를 형태로 옮기는 일을 합니다.',
}) {
  /** 소개 문구가 위에서부터 검정으로 채워지는 정도 */
  const introRef = useScrollProgress({ start: 0.85, end: 0.55, reducedValue: 1 });

  return (
    <Box
      id="about"
      component="section"
      sx={ { py: { xs: 8, md: 14 }, scrollMarginTop: 24 } }
    >
      <Grid container spacing={ { xs: 4, md: 6 } }>
        <Grid size={ { xs: 12, md: 4 } }>
          <Box sx={ { display: 'flex', alignItems: 'center', gap: 1.5 } }>
            <Box sx={ { width: 14, height: 14, borderRadius: '50%', bgcolor: 'primary.main' } } />
            <Box
              component="h2"
              sx={ {
                m: 0,
                fontFamily: '"Anton", sans-serif',
                fontWeight: 400,
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                letterSpacing: '0.08em',
              } }
            >
              ABOUT
            </Box>
          </Box>
        </Grid>
        <Grid size={ { xs: 12, md: 8 } }>
          <Typography
            ref={ introRef }
            sx={ {
              fontFamily: '"Abril Fatface", serif',
              fontSize: { xs: '1.5rem', md: '2.2rem' },
              lineHeight: 1.4,
              wordBreak: 'keep-all',
              color: 'transparent',
              backgroundImage: 'linear-gradient(180deg, #000 0, #000 calc(var(--scroll-progress, 0) * 100%), #D4D4D4 calc(var(--scroll-progress, 0) * 100%), #D4D4D4 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
            } }
          >
            { intro }
          </Typography>
          <Box
            component="ul"
            sx={ { display: 'flex', flexWrap: 'wrap', gap: 1.5, listStyle: 'none', p: 0, mt: 5, mb: 0 } }
          >
            { SKILLS.map((skill) => (
              <Box
                component="li"
                key={ skill }
                sx={ {
                  px: 2.5,
                  py: 1,
                  borderRadius: 999,
                  border: '1.5px solid',
                  borderColor: 'text.primary',
                  fontSize: { xs: '0.85rem', md: '0.95rem' },
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  '&:hover': { bgcolor: 'text.primary', color: 'common.white' },
                } }
              >
                { skill }
              </Box>
            )) }
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AboutSection;
