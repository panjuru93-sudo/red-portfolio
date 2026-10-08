import { useEffect, useRef } from 'react';

/**
 * useScrollProgress 훅
 * 요소가 화면을 지나가는 정도(0~1)를 계산해 요소의 CSS 변수 `--scroll-progress` 에 기록한다.
 * React state 를 쓰지 않고 style 을 직접 갱신하므로 스크롤 중 리렌더가 발생하지 않는다.
 *
 * - 요소 top 이 화면 높이의 `start` 지점에 닿을 때 0
 * - 요소 bottom 이 화면 높이의 `end` 지점에 닿을 때 1
 *
 * @param {object} options
 * @param {number} options.start - 시작 지점 (화면 높이 비율) [Optional, 기본값: 1]
 * @param {number} options.end - 종료 지점 (화면 높이 비율) [Optional, 기본값: 0]
 * @param {number} options.reducedValue - 모션 줄이기 사용자에게 고정할 값 [Optional, 기본값: 0]
 * @returns {object} 대상 요소에 연결할 ref
 *
 * Example usage:
 * const ref = useScrollProgress({ start: 0, end: 0 });
 * <Box ref={ ref } sx={ { opacity: 'calc(1 - var(--scroll-progress))' } } />
 */
function useScrollProgress({ start = 1, end = 0, reducedValue = 0 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const setProgress = (value) => {
      node.style.setProperty('--scroll-progress', value.toFixed(4));
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(reducedValue);
      return undefined;
    }

    let frameId = 0;

    const update = () => {
      frameId = 0;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const distance = vh * start - vh * end + rect.height;
      const raw = distance > 0 ? (vh * start - rect.top) / distance : 0;
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    const onScroll = () => {
      if (!frameId) frameId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [start, end, reducedValue]);

  return ref;
}

export default useScrollProgress;
