import { useEffect, useState } from 'react';

interface Position {
	left: number;
	top: number;
}

interface Size {
	width: number;
	height: number;
}

export const useArrowNavigation = () => {
	const [arrows, setArrows] = useState<string[]>([]);
	const [currentArrowId, setCurrentArrowId] = useState<string | null>(null);

	const calculatePosition = (element: HTMLElement): Position => {
		const viewportElement = document.documentElement;
		const scrollLeft = viewportElement.scrollLeft;
		const scrollTop = viewportElement.scrollTop;

		const rect = element.getBoundingClientRect() || { left: 0, top: 0 };
		return {
			left: rect.left + scrollLeft,
			top: rect.top + scrollTop,
		};
	};

	const createArrow = (element: HTMLElement | null, elementClass: string): void => {
		if (!element || !elementClass) return;

		const id = elementClass + '-arrow';
		const existingArrow = arrows.includes(id);
		if (existingArrow) return;

		const rect = element.getBoundingClientRect();
		const size: Size = {
			width: rect.width | 0,
			height: rect.height | 0,
		};

		const position: Position = calculatePosition(element);

		const top = position.top - size.height / 2.8;
		const left = position.left - 60;

		const Arrow = document.createElement('div');
		Arrow.className = `h-2 w-14 bg-red absolute z-[80]`;

		Arrow.style.top = top + 'px';
		Arrow.style.left = left + 'px';
		Arrow.style.pointerEvents = 'none';

		Arrow.id = id;

		Arrow.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m18 8l4 4l-4 4M2 12h20"/></svg>`;

		const elementToAttach = document.querySelector('body');
		elementToAttach?.append(Arrow);

		const updatedArrows = [...arrows, Arrow.id];
		setArrows(updatedArrows);
		setCurrentArrowId(Arrow.id);
	};

	const removeArrow = (id: string | null): void => {
		if (!id) return;
		const existingArrow = arrows.includes(id);

		if (!existingArrow) return;
		const getElement = document.getElementById(id);
		getElement?.remove();
		const updatedArrows = arrows.filter((item) => item !== id);

		setArrows(updatedArrows);
	};

	const handleResize = (): void => {
		arrows.forEach((id) => {
			removeArrow(id);
		});

		arrows.forEach((id) => {
			const elementClass = id.replace('-arrow', '');
			const element = document.querySelector(elementClass) as HTMLElement;
			createArrow(element, elementClass);
		});
	};

	const onClickWalkThrough = (elementClass: string): void => {
		if (elementClass.length === 0) return;
		const element = document.querySelector(elementClass) as HTMLElement;
		element?.scrollIntoView({ behavior: 'smooth' });

		createArrow(element, elementClass);
	};

	useEffect(() => {
		setTimeout(() => {
			removeArrow(currentArrowId);
		}, 7000);
	}, [currentArrowId]);

	useEffect(() => {
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [arrows]);

	return { onClickWalkThrough };
};
