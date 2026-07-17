import type { MouseEvent, ReactNode } from 'react';
import { Link } from 'react-router';
import s from './Button.module.scss';

type ButtonProps = Readonly<{
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'white';
    href?: string;
    to?: string;
    type?: 'button' | 'submit';
    disabled?: boolean;
    onClick?: (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
    className?: string;
}>;

export function Button({
    children,
    variant = 'primary',
    href,
    to,
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

    if (to) {
        return (
            <Link to={to} className={cls} onClick={onClick}>
                {children}
            </Link>
        );
    }
    if (href) {
        return (
            <a href={href} className={cls} onClick={onClick}>
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
