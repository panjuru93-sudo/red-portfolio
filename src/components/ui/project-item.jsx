import Box from '@mui/material/Box';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import ProjectThumb from './project-thumb.jsx';

/**
 * ProjectItem 컴포넌트
 * 블랙 카드 안에 들어가는 프로젝트 썸네일 + 정보
 *
 * Props:
 * @param {string} index - 프로젝트 번호 (예: '01') [Required]
 * @param {string} title - 프로젝트 제목 [Required]
 * @param {string[]} tags - 사용 기술 태그 목록 [Optional, 기본값: []]
 * @param {string} year - 진행 시기 [Optional, 기본값: '']
 * @param {string} href - 이동 링크 [Optional, 기본값: '#']
 * @param {string} description - 프로젝트 한 줄 설명 [Optional, 기본값: '']
 * @param {string} tone - 썸네일 색 조합 [Optional, 기본값: 'dark']
 * @param {string} shape - 썸네일 도형 [Optional, 기본값: 'circle']
 * @param {boolean} isFeatured - 대표 프로젝트(와이드) 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <ProjectItem index="01" title="Brand Identity" tags={ ['React'] } year="2026" />
 */
function ProjectItem({
  index,
  title,
  tags = [],
  year = '',
  href = '#',
  description = '',
  tone = 'dark',
  shape = 'circle',
  isFeatured = false,
}) {
  const isExternal = href.startsWith('http');

  return (
    <Box
      component="a"
      href={ href }
      data-cursor="view"
      target={ isExternal ? '_blank' : undefined }
      rel={ isExternal ? 'noopener noreferrer' : undefined }
      sx={ {
        display: 'block',
        color: 'common.white',
        textDecoration: 'none',
        '&:hover .project-thumb__shape, &:focus-visible .project-thumb__shape': {
          transform: shape === 'diamond' ? 'rotate(135deg) scale(1.15)' : 'rotate(-12deg) scale(1.15)',
        },
        '&:hover .project-thumb__badge, &:focus-visible .project-thumb__badge': {
          opacity: 1,
          transform: 'translateY(0)',
        },
        '&:hover .project-item__arrow, &:focus-visible .project-item__arrow': {
          bgcolor: 'primary.main',
          borderColor: 'primary.main',
          transform: 'rotate(45deg)',
        },
        '&:hover .project-thumb__spot': {
          opacity: 1,
        },
        '&:hover .project-item__title': {
          color: 'primary.main',
        },
      } }
    >
      <ProjectThumb index={ index } tone={ tone } shape={ shape } isFeatured={ isFeatured } />

      <Box sx={ { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mt: 2.5, gap: 2 } }>
        <Box sx={ { minWidth: 0 } }>
          <Box sx={ { display: 'flex', alignItems: 'baseline', gap: 1.5, flexWrap: 'wrap' } }>
            <Box
              className="project-item__title"
              sx={ {
                fontFamily: '"Abril Fatface", serif',
                fontSize: isFeatured ? { xs: '1.6rem', md: '2.4rem' } : { xs: '1.4rem', md: '1.7rem' },
                lineHeight: 1.2,
                transition: 'color 0.2s',
              } }
            >
              { title }
            </Box>
            <Box sx={ { fontSize: '0.8rem', color: 'grey.500', letterSpacing: '0.04em' } }>{ year }</Box>
          </Box>
          { description && (
            <Box
              sx={ {
                mt: 1,
                fontSize: { xs: '0.9rem', md: isFeatured ? '1rem' : '0.9rem' },
                lineHeight: 1.6,
                color: 'grey.400',
                wordBreak: 'keep-all',
                maxWidth: isFeatured ? 640 : 'none',
              } }
            >
              { description }
            </Box>
          ) }
          <Box component="ul" sx={ { display: 'flex', flexWrap: 'wrap', gap: 0.75, listStyle: 'none', p: 0, m: 0, mt: 1.5 } }>
            { tags.map((tag) => (
              <Box
                component="li"
                key={ tag }
                sx={ {
                  px: 1.25,
                  py: 0.25,
                  borderRadius: 999,
                  border: '1px solid',
                  borderColor: 'grey.800',
                  fontSize: '0.75rem',
                  color: 'grey.400',
                } }
              >
                { tag }
              </Box>
            )) }
          </Box>
        </Box>

        <Box
          className="project-item__arrow"
          aria-hidden
          sx={ {
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: { xs: 40, md: 48 },
            height: { xs: 40, md: 48 },
            borderRadius: '50%',
            border: '1px solid',
            borderColor: 'grey.700',
            transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
          } }
        >
          <ArrowOutwardIcon sx={ { fontSize: { xs: '1.1rem', md: '1.3rem' }, transform: 'rotate(-45deg)' } } />
        </Box>
      </Box>
    </Box>
  );
}

export default ProjectItem;
