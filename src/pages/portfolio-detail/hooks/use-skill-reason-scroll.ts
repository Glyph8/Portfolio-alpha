import { useRef, useState } from "react";

export const useSkillReasonScroll = (scrollRef: React.RefObject<HTMLDivElement | null>) => {
    const [maskState, setMaskState] = useState('right');

    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const onDragStart = (e: React.MouseEvent) => {
        isDragging.current = true;
        if (!scrollRef.current) return;

        scrollRef.current.style.scrollSnapType = 'none';
        startX.current = e.pageX - scrollRef.current.offsetLeft;
        scrollLeft.current = scrollRef.current.scrollLeft;
    };

    const onDragEnd = () => {
        isDragging.current = false;
        if (!scrollRef.current) return;
        scrollRef.current.style.scrollSnapType = 'x proximity';
    }

    const onDragMove = (e: React.MouseEvent) => {
        if (!isDragging.current || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX.current) * 2; // 드래그 속도 조절
        scrollRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

        const isAtStart = scrollLeft <= 0;
        // 오차 범위를 위해 -1 정도 여유를 줍니다.
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1;

        if (isAtStart) setMaskState('right');
        else if (isAtEnd) setMaskState('left');
        else setMaskState('both'); // 중간에 있을 때
    };


    const handleSkillClick = (index: number) => {
        if (!scrollRef.current) return;
        const targetCard = scrollRef.current.children[index] as HTMLElement;

        if (targetCard) {
            scrollRef.current.scrollTo({
                left: targetCard.offsetLeft - scrollRef.current.offsetLeft,
                behavior: "smooth"
            })
        }
    }

    return {
        maskState, onDragStart, onDragEnd, onDragMove, handleScroll, handleSkillClick
    }
}