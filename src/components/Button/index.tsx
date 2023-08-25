import React from 'react';

export type ButtonProps = {
    action: (e: any) => void;
    label: string;
};

export const Button = (props: ButtonProps) => (
    <button className="w-8 h-8 bg-black" onClick={props.action}>
        {props.label}
    </button>
);

export default Button;
