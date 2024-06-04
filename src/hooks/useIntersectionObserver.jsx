import { useEffect, useRef } from "react";

const useIntersectionObserver = (callback) => {
    const observerRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    callback();
                }
            });
        });

        observerRef.current = observer;

        return () => observer.disconnect();
    }, [callback]);

    const setTarget = (target) => {
        if (observerRef.current) observerRef.current.observe(target);
    };

    return setTarget;
};

export default useIntersectionObserver;