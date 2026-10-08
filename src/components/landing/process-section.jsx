import Box from '@mui/material/Box';
import MaskText from '../ui/mask-text.jsx';
import MagneticWord from '../ui/magnetic-word.jsx';

const STEPS = [
  { index: '01', word: 'Plan', label: '기획' },
  { index: '02', word: 'Design', label: '디자인' },
  { index: '03', word: 'Develop', label: '개발' },
  { index: '04', word: 'Launch', label: '배포' },
];

/**
 * ProcessSection 컴포넌트
 * 작업 과정을 대형 자석 텍스트 목록으로 보여주는 섹션
 *
 * Example usage:
 * <ProcessSection />
 */
function ProcessSection() {
  return (
    <Box component="section" sx={ { pt: { xs: 10, md: 16 } } }>
      <Box sx={ { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 2, mb: { xs: 3, md: 4 } } }>
        <MaskText
          lines={ ['How I work'] }
          sx={ {
            fontFamily: '"Abril Fatface", serif',
            fontWeight: 400,
            fontSize: { xs: '2rem', md: '3.2rem' },
            lineHeight: 1.2,
          } }
        />
        <Box sx={ { fontFamily: '"Anton", sans-serif', fontSize: { xs: '0.75rem', md: '0.85rem' }, letterSpacing: '0.08em', color: 'text.secondary' } }>
          HOVER ME
        </Box>
      </Box>
      <Box sx={ { borderTop: '1.5px solid', borderColor: 'text.primary' } }>
        { STEPS.map((step) => (
          <MagneticWord key={ step.word } { ...step } />
        )) }
      </Box>
    </Box>
  );
}

export default ProcessSection;
