import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import MaskText from '../ui/mask-text.jsx';
import TypingText from '../ui/typing-text.jsx';

/**
 * ContactSection 컴포넌트
 * 레드 카드 안에 대형 문구, 이메일(복사 버튼), 연락 채널 목록을 표시
 *
 * Props:
 * @param {string} email - 연락 이메일 [Required]
 * @param {string} githubUrl - GitHub 프로필 주소 [Required]
 *
 * Example usage:
 * <ContactSection email="me@example.com" githubUrl="https://github.com/me" />
 */
function ContactSection({ email, githubUrl }) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return undefined;
    const timer = window.setTimeout(() => setIsCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [isCopied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setIsCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const channels = [
    { label: 'EMAIL', value: email, href: `mailto:${email}`, icon: <MailOutlineIcon /> },
    { label: 'GITHUB', value: githubUrl.replace('https://', ''), href: githubUrl, icon: <GitHubIcon />, isExternal: true },
  ];

  return (
    <Box
      id="contact"
      component="section"
      sx={ {
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'primary.main',
        color: 'common.black',
        borderRadius: { xs: 6, md: 10 },
        px: { xs: 3, md: 7 },
        py: { xs: 6, md: 9 },
        scrollMarginTop: 24,
      } }
    >
      {/* 장식용 블랙 원 */}
      <Box
        aria-hidden
        sx={ {
          position: 'absolute',
          right: { xs: '-30%', md: '-8%' },
          top: { xs: '-12%', md: '-25%' },
          width: { xs: '70%', md: '38%' },
          aspectRatio: '1 / 1',
          borderRadius: '50%',
          bgcolor: 'common.black',
          opacity: 0.08,
        } }
      />

      <Box sx={ { position: 'relative' } }>
        <Box
          sx={ {
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontFamily: '"Anton", sans-serif',
            fontSize: { xs: '0.8rem', md: '0.9rem' },
            letterSpacing: '0.1em',
          } }
        >
          <Box sx={ { width: 8, height: 8, bgcolor: 'common.black', transform: 'rotate(45deg)' } } />
          CONTACT
        </Box>

        <MaskText
          lines={ ['Let’s make', 'something bold.'] }
          stagger={ 150 }
          sx={ {
            mt: 2,
            fontFamily: '"Abril Fatface", serif',
            fontWeight: 400,
            fontSize: { xs: '2.6rem', sm: '3.6rem', md: '5.5rem' },
            lineHeight: 1.2,
          } }
        />

        <Box sx={ { mt: 2, fontSize: { xs: '0.95rem', md: '1.05rem' }, lineHeight: 1.6, wordBreak: 'keep-all', maxWidth: 520 } }>
          <TypingText text="협업·프로젝트 문의는 이메일로 편하게 연락주세요." startDelay={ 600 } speed={ 45 } />
        </Box>

        {/* 이메일 + 복사 버튼 */}
        <Box sx={ { display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, mt: { xs: 4, md: 6 } } }>
          <Box
            component="a"
            href={ `mailto:${email}` }
            sx={ {
              position: 'relative',
              fontFamily: '"Abril Fatface", serif',
              fontSize: { xs: '1.4rem', sm: '2rem', md: '2.8rem' },
              lineHeight: 1.3,
              color: 'common.black',
              textDecoration: 'none',
              wordBreak: 'break-all',
              backgroundImage: 'linear-gradient(currentColor, currentColor)',
              backgroundSize: '0% 3px',
              backgroundPosition: '0 100%',
              backgroundRepeat: 'no-repeat',
              transition: 'background-size 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
              '&:hover': { backgroundSize: '100% 3px' },
            } }
          >
            { email }
          </Box>
          <ButtonBase
            onClick={ handleCopy }
            aria-label="이메일 주소 복사"
            sx={ {
              gap: 0.75,
              px: 2,
              py: 1,
              borderRadius: 999,
              bgcolor: 'common.black',
              color: 'common.white',
              fontFamily: '"Anton", sans-serif',
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.05)' },
            } }
          >
            { isCopied ? <CheckIcon sx={ { fontSize: '1rem' } } /> : <ContentCopyIcon sx={ { fontSize: '1rem' } } /> }
            { isCopied ? 'COPIED!' : 'COPY' }
          </ButtonBase>
        </Box>

        {/* 연락 채널 목록 */}
        <Box component="ul" sx={ { listStyle: 'none', p: 0, m: 0, mt: { xs: 5, md: 7 }, borderTop: '1.5px solid', borderColor: 'common.black' } }>
          { channels.map((channel) => (
            <Box component="li" key={ channel.label } sx={ { borderBottom: '1.5px solid', borderColor: 'common.black' } }>
              <Box
                component="a"
                href={ channel.href }
                target={ channel.isExternal ? '_blank' : undefined }
                rel={ channel.isExternal ? 'noopener noreferrer' : undefined }
                sx={ {
                  display: 'flex',
                  alignItems: 'center',
                  gap: { xs: 2, md: 3 },
                  py: { xs: 2, md: 2.5 },
                  px: { xs: 0, md: 1 },
                  color: 'common.black',
                  textDecoration: 'none',
                  transition: 'padding 0.3s, background-color 0.3s, color 0.3s',
                  '&:hover': {
                    bgcolor: 'common.black',
                    color: 'common.white',
                    px: { xs: 1.5, md: 3 },
                  },
                  '&:hover .contact-section__arrow': { transform: 'rotate(45deg)' },
                } }
              >
                <Box sx={ { display: 'flex', '& svg': { fontSize: { xs: '1.3rem', md: '1.5rem' } } } }>{ channel.icon }</Box>
                <Box sx={ { width: { xs: 64, md: 120 }, fontFamily: '"Anton", sans-serif', fontSize: { xs: '0.85rem', md: '1rem' }, letterSpacing: '0.08em' } }>
                  { channel.label }
                </Box>
                <Box sx={ { flex: 1, minWidth: 0, fontSize: { xs: '0.9rem', md: '1.1rem' }, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }>
                  { channel.value }
                </Box>
                <ArrowOutwardIcon className="contact-section__arrow" sx={ { transform: 'rotate(0deg)', transition: 'transform 0.3s' } } />
              </Box>
            </Box>
          )) }
        </Box>
      </Box>
    </Box>
  );
}

export default ContactSection;
