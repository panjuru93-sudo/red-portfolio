import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

/**
 * SiteFooter 컴포넌트
 * 저작권 표기 + 맨 위로 이동 링크
 *
 * Props:
 * @param {string} name - 저작권 표기 이름 [Required]
 *
 * Example usage:
 * <SiteFooter name="YOUR NAME" />
 */
function SiteFooter({ name }) {
  return (
    <Box
      component="footer"
      sx={ {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        pt: { xs: 4, md: 5 },
        pb: 1,
        fontSize: '0.8rem',
        color: 'text.secondary',
      } }
    >
      <Box component="span" sx={ { display: 'flex', alignItems: 'center', gap: 1 } }>
        <Box sx={ { width: 10, height: 10, borderRadius: '50%', bgcolor: 'primary.dark' } } />
        © 2026 { name }
      </Box>
      <Link href="#top" underline="hover" sx={ { color: 'inherit', fontFamily: '"Anton", sans-serif', letterSpacing: '0.08em' } }>
        BACK TO TOP ↑
      </Link>
    </Box>
  );
}

export default SiteFooter;
