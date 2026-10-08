import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MarqueeBand from '../common/marquee-band.jsx';
import ScrollReveal from '../common/scroll-reveal.jsx';
import MaskText from '../ui/mask-text.jsx';
import ProjectItem from '../ui/project-item.jsx';
import WorksFilter from './works-filter.jsx';
import { FILTERS, PROJECTS } from './works-data.js';

const MARQUEE_ITEMS = ['REACT', 'MUI', 'SUPABASE', 'VITE', 'GITHUB PAGES', 'CLAUDE CODE', 'VIBE CODING'];

const PAD_X = { xs: 3, md: 7 };

/**
 * WorksCard 컴포넌트
 * 둥근 모서리의 대형 블랙 카드 안에 요약 수치, 흐르는 기술 띠, 필터, 프로젝트 목록을 표시
 *
 * Props:
 * @param {string} title - 카드 상단 제목 [Optional, 기본값: 'Selected Works']
 *
 * Example usage:
 * <WorksCard title="Selected Works" />
 */
function WorksCard({ title = 'Selected Works' }) {
  const [filter, setFilter] = useState('all');

  const counts = useMemo(() => {
    const result = { all: PROJECTS.length };
    PROJECTS.forEach((project) => {
      result[project.type] = (result[project.type] ?? 0) + 1;
    });
    return result;
  }, []);

  const visibleProjects = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter((project) => project.type === filter);

  const stats = [
    { value: String(PROJECTS.length).padStart(2, '0'), label: 'Projects' },
    { value: String(PROJECTS.filter((p) => p.tags.includes('Supabase')).length).padStart(2, '0'), label: 'DB 연동' },
    { value: '2026', label: 'Since' },
  ];

  return (
    <Box
      id="work"
      component="section"
      sx={ {
        bgcolor: 'common.black',
        color: 'common.white',
        borderRadius: { xs: 6, md: 10 },
        px: PAD_X,
        py: { xs: 5, md: 8 },
        minHeight: { md: '70vh' },
        scrollMarginTop: 24,
        overflow: 'hidden',
      } }
    >
      {/* 제목 + 요약 수치 */}
      <Grid container spacing={ { xs: 3, md: 4 } } sx={ { alignItems: 'flex-end', mb: { xs: 4, md: 6 } } }>
        <Grid size={ { xs: 12, md: 7 } }>
          <Box
            sx={ {
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 1.5,
              fontFamily: '"Anton", sans-serif',
              fontSize: { xs: '0.8rem', md: '0.9rem' },
              letterSpacing: '0.1em',
              color: 'primary.main',
            } }
          >
            <Box sx={ { width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' } } />
            ARCHIVE 2026
          </Box>
          <MaskText
            lines={ [title] }
            sx={ {
              fontFamily: '"Abril Fatface", serif',
              fontWeight: 400,
              fontSize: { xs: '2.6rem', md: '4.5rem' },
              lineHeight: 1.2,
            } }
          />
        </Grid>
        <Grid size={ { xs: 12, md: 5 } }>
          <Box sx={ { display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: { xs: 4, md: 5 } } }>
            { stats.map((stat) => (
              <Box key={ stat.label }>
                <Box sx={ { fontFamily: '"Abril Fatface", serif', fontSize: { xs: '2rem', md: '2.6rem' }, lineHeight: 1.2 } }>
                  { stat.value }
                </Box>
                <Box sx={ { fontSize: '0.75rem', color: 'grey.500', letterSpacing: '0.06em', textTransform: 'uppercase' } }>
                  { stat.label }
                </Box>
              </Box>
            )) }
          </Box>
        </Grid>
      </Grid>

      {/* 카드 가장자리까지 꽉 차는 기술 띠 */}
      <Box sx={ { mx: { xs: -3, md: -7 } } }>
        <MarqueeBand items={ MARQUEE_ITEMS } />
      </Box>

      {/* 필터 */}
      <Box sx={ { my: { xs: 4, md: 5 } } }>
        <WorksFilter filters={ FILTERS } value={ filter } counts={ counts } onChange={ setFilter } />
      </Box>

      {/* 프로젝트 목록 — 첫 번째는 와이드 대표 카드 */}
      <Grid container rowSpacing={ { xs: 5, md: 7 } } columnSpacing={ { xs: 4, md: 5 } }>
        { visibleProjects.map((project, i) => {
          const isFeatured = i === 0;

          return (
            <Grid key={ `${filter}-${project.index}` } size={ isFeatured ? 12 : { xs: 12, sm: 6 } }>
              <ScrollReveal delay={ isFeatured ? 0 : ((i - 1) % 2) * 150 }>
                <ProjectItem { ...project } isFeatured={ isFeatured } />
              </ScrollReveal>
            </Grid>
          );
        }) }
      </Grid>
    </Box>
  );
}

export default WorksCard;
