import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';
import useInView from '../../hooks/use-in-view.js';

const blink = keyframes`
  0%, 50% { opacity: 1; }
  50.01%, 100% { opacity: 0; }
`;

/**
 * TypingText 컴포넌트
 * 화면에 들어오면 한 글자씩 타이핑되는 텍스트. 전체 텍스트 자리를 미리 잡아 레이아웃이 흔들리지 않는다.
 *
 * Props:
 * @param {string} text - 타이핑할 텍스트 [Required]
 * @param {number} speed - 글자당 시간(ms) [Optional, 기본값: 55]
 * @param {number} startDelay - 시작 지연(ms) [Optional, 기본값: 0]
 * @param {string} component - 렌더링할 태그 [Optional, 기본값: 'span']
 * @param {object} sx - 스타일 [Optional, 기본값: {}]
 *
 * Example usage:
 * <TypingText text="Designer & Developer" startDelay={ 800 } />
 */
function TypingText({ text, speed = 55, startDelay = 0, component = 'span', sx = {} }) {
  const [ref, isInView] = useInView(0.5);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(text.length);
      return undefined;
    }

    let intervalId = 0;
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setCount((prev) => {
          if (prev >= text.length) {
            window.clearInterval(intervalId);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [isInView, text, speed, startDelay]);

  const isDone = count >= text.length;

  return (
    <Box ref={ ref } component={ component } aria-label={ text } sx={ { position: 'relative', display: 'inline-block', ...sx } }>
      {/* 자리 확보용 (보이지 않음) */}
      <Box component="span" aria-hidden sx={ { visibility: 'hidden' } }>{ text }</Box>
      <Box component="span" aria-hidden sx={ { position: 'absolute', inset: 0, whiteSpace: 'inherit' } }>
        { text.slice(0, count) }
        <Box
          component="span"
          sx={ {
            display: 'inline-block',
            width: '0.08em',
            height: '1em',
            ml: '0.08em',
            verticalAlign: '-0.12em',
            bgcolor: 'primary.main',
            animation: isDone ? `${blink} 0.9s infinite` : 'none',
          } }
        />
      </Box>
    </Box>
  );
}

export default TypingText;
