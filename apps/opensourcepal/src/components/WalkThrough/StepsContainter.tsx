import React, { ReactNode } from 'react';

const StepsContainter = ({ children }: { children: ReactNode }) => {
	return <ul className="px-3 py-2 flex flex-col gap-2 bg-secondary text-primary">{children}</ul>;
};

export default StepsContainter;
