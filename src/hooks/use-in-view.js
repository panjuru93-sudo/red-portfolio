import { useEffect, useRef, useState } from 'react';

/**
 * useInView 훅
 * 요소가 화면(viewport)에 들어왔는지 감지한다. 한 번 보이면 true 로 유지된다.
 *
 * @param {number} threshold - 보이는 비율 기준 (0~1) [Optional, 기본값: 0.15]
 * @returns {[object, boolean]} [ref, isInView]
 *
 * Example usage:
 * const [ref, isInView] = useInView(0.2);
 */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView];
}

export default useInView;
