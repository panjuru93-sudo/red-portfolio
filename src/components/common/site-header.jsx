import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const NAV_ITEMS = [
  { label: 'WORK', href: '#work' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' },
];

/**
 * SiteHeader 컴포넌트
 * 좌측 레드 원형 로고 + 이름, 우측 회색 바 형태의 내비게이션
 *
 * Props:
 * @param {string} name - 로고 옆에 표시할 이름 [Required]
 *
 * Example usage:
 * <SiteHeader name="YOUR NAME" />
 */
function SiteHeader({ name }) {
  return (
    <Box
      component="header"
      sx={ {
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        minHeight: { xs: 48, md: 56 },
      } }
    >
      <Box
        component="a"
        href="#top"
        sx={ {
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          color: 'text.primary',
          textDecoration: 'none',
        } }
      >
        <Box
          sx={ {
            width: { xs: 22, md: 28 },
            height: { xs: 22, md: 28 },
            borderRadius: '50%',
            bgcolor: 'primary.dark',
            flexShrink: 0,
          } }
        />
        <Box
          component="span"
          sx={ {
            fontFamily: '"Anton", sans-serif',
            fontSize: { xs: '0.8rem', md: '0.95rem' },
            letterSpacing: '0.06em',
          } }
        >
          { name }
        </Box>
      </Box>

      <Box
        component="nav"
        sx={ {
          display: 'flex',
          alignItems: 'center',
          justifyContent: { xs: 'flex-start', md: 'space-around' },
          gap: { xs: 2, md: 4 },
          width: { xs: 'auto', md: '42%' },
          px: { xs: 2, md: 4 },
          bgcolor: 'background.paper',
        } }
      >
        { NAV_ITEMS.map((item) => (
          <Link
            key={ item.label }
            href={ item.href }
            underline="none"
            sx={ {
              fontFamily: '"Anton", sans-serif',
              fontSize: { xs: '0.75rem', md: '0.85rem' },
              letterSpacing: '0.06em',
              color: 'text.primary',
              transition: 'color 0.2s',
              '&:hover': { color: 'primary.main' },
            } }
          >
            { item.label }
          </Link>
        )) }
      </Box>
    </Box>
  );
}

export default SiteHeader;
