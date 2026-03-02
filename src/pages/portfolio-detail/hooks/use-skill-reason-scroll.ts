import { useRef, useState } from "react";

export const useSkillReasonScroll = (scrollRef: React.RefObject<HTMLDivElement | null>) => {
    const [maskState, setMaskState] = useState('right');
    const [activeIndex, setActiveIndex] = useState(0);

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
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1;

        if (isAtStart) setMaskState('right');
        else if (isAtEnd) setMaskState('left');
        else setMaskState('both')

        const children = scrollRef.current.children;
        let closestIndex = 0;
        let minDiff = Infinity;

        for (let i = 0; i < children.length; i++) {
            const child = children[i] as HTMLElement;
            const childScrollLeft = child.offsetLeft - scrollRef.current.offsetLeft;
            const diff = Math.abs(childScrollLeft - scrollLeft);

            if (diff < minDiff) {
                minDiff = diff;
                closestIndex = i;
            }
        }
        setActiveIndex(closestIndex);
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
        maskState, activeIndex, onDragStart, onDragEnd, onDragMove, handleScroll, handleSkillClick
    }
}