import { useEffect, useState } from "react";
const useScrollHeight = (ref) => {
    const [scrollTop, setScrollTop] = useState(0);
    let throttling = false;

    const handleScroll = () => {
    // throttling 되었는지 나타냄.
    if (throttling) return;

        // 콘솔 메세지 적게 하기위해 throttling으로 최적화한셈
        throttling = true;

        setTimeout(() => {
            setScrollTop(ref.current.scrollTop);
            throttling = false;
        }, 300);
    };

    // 이벤트리스너 한 번 실행하면 삭제
    useEffect(() => {
        if (!ref.current) return;
        ref.current.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            if (!ref.current) return;
            ref.current.removeEventListener('scroll', handleScroll);
        };
    }, [ref]);

    return scrollTop;
};

export default useScrollHeight;