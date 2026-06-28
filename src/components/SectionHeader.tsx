import s from './SectionHeader.module.scss';

type SectionHeaderProps = Readonly<{
    label: string;
    title: string;
    subtitle?: string;
    dark?: boolean;
}>;

export function SectionHeader({
    label,
    title,
    subtitle,
    dark = false,
}: SectionHeaderProps) {
    return (
        <div className={s.sectionHeader}>
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
