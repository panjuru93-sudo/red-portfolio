import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';

/**
 * WorksFilter 컴포넌트
 * 프로젝트 분류 필터 탭 (개수 표시 포함)
 *
 * Props:
 * @param {object[]} filters - { value, label } 목록 [Required]
 * @param {string} value - 현재 선택된 필터 값 [Required]
 * @param {object} counts - 필터 값별 프로젝트 개수 [Required]
 * @param {function} onChange - 필터 변경 시 호출 (value) => void [Required]
 *
 * Example usage:
 * <WorksFilter filters={ FILTERS } value="all" counts={ { all: 8 } } onChange={ setFilter } />
 */
function WorksFilter({ filters, value, counts, onChange }) {
  return (
    <Box role="tablist" sx={ { display: 'flex', flexWrap: 'wrap', gap: 1 } }>
      { filters.map((filter) => {
        const isActive = filter.value === value;

        return (
          <ButtonBase
            key={ filter.value }
            role="tab"
            aria-selected={ isActive }
            onClick={ () => onChange(filter.value) }
            sx={ {
              gap: 0.75,
              px: { xs: 1.75, md: 2.25 },
              py: 1,
              borderRadius: 999,
              border: '1px solid',
              borderColor: isActive ? 'common.white' : 'grey.800',
              bgcolor: isActive ? 'common.white' : 'transparent',
              color: isActive ? 'common.black' : 'grey.400',
              fontFamily: '"Anton", sans-serif',
              fontSize: { xs: '0.75rem', md: '0.85rem' },
              letterSpacing: '0.08em',
              transition: 'all 0.25s',
              '&:hover': { borderColor: 'common.white', color: isActive ? 'common.black' : 'common.white' },
            } }
          >
            { filter.label }
            <Box component="span" sx={ { fontFamily: '"Inter", sans-serif', fontSize: '0.7rem', color: isActive ? 'primary.main' : 'grey.600' } }>
              { counts[filter.value] ?? 0 }
            </Box>
          </ButtonBase>
        );
      }) }
    </Box>
  );
}

export default WorksFilter;
