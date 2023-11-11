import React from 'react';

export type ButtonProps = {
	action: (e: any) => void;
	label: any;
	className?: string;
};

const Button = ({ action, label, className }: ButtonProps) => (
	<button className={className || 'px-5 py-2 bg-primary rounded'} onClick={action}>
		{label}
	</button>
);

export default Button;
