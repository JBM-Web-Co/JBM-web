import type { ReactNode } from 'react';
import s from './Button.module.scss';

type ButtonProps = Readonly<{
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'white';
    href?: string;
    type?: 'button' | 'submit';
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
}>;

export function Button({
    children,
    variant = 'primary',
    href,
    type = 'button',
    disabled,
    onClick,
    className = '',
}: ButtonProps) {
    const variant_class =
        variant === 'secondary'
            ? s.secondary
            : variant === 'white'
              ? s.white
              : s.primary;
    const cls = `${s.btn} ${variant_class} ${className}`.trim();

    if (href) {
        return (
            <a href={href} className={cls}>
                {children}
            </a>
        );
    }
    return (
        <button
            type={type}
            className={cls}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
