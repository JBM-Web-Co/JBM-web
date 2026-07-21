import s from './SectionHeader.module.scss';

type SectionHeaderProps = Readonly<{
    label: string;
    title: string;
    subtitle?: string;
    dark?: boolean;
    className?: string;
}>;

export function SectionHeader({
    label,
    title,
    subtitle,
    dark = false,
    className = '',
}: SectionHeaderProps) {
    return (
        <div className={`${s.sectionHeader} ${className}`.trim()}>
            <span
                className={`${s.sectionLabel}${dark ? ` ${s.sectionLabelDark}` : ''}`}
            >
                {label}
            </span>
            <h2
                className={`${s.sectionTitle}${dark ? ` ${s.sectionTitleDark}` : ''}`}
            >
                {title}
            </h2>
            {subtitle && (
                <p
                    className={`${s.sectionSubtitle}${dark ? ` ${s.sectionSubtitleDark}` : ''}`}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
}
