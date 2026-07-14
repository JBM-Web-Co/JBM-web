import type { CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import s from './RecentProjects.module.scss';

type Project = Readonly<{
    name: string;
    url: string;
    industry: string;
    location: string;
    blurb: string;
    accent: string;
}>;

type PreviewStyle = CSSProperties & { '--project-accent': string };

const PROJECTS: readonly Project[] = [
    {
        name: 'J & H Rural Earthmoving',
        url: 'https://www.j-hruralearthmoving.com',
        industry: 'Rural Earthmoving',
        location: 'Ben Lomond, NSW',
        blurb: 'Family-run rural and civil earthworks specialist covering dam construction, land clearing, and broad-acre farm work across the New England region.',
        accent: '#4fae1a',
    },
    {
        name: 'MTB Earthmoving',
        url: 'https://www.mtb-earthmoving.com',
        industry: 'Civil Earthworks',
        location: 'Gunnedah, NSW',
        blurb: 'Owner-operated earthmoving and civil works business delivering road construction, site works, and machinery repair across North West NSW.',
        accent: '#2f6fed',
    },
] as const;

export function RecentProjects() {
    const reduced_motion = useReducedMotion() ?? false;

    return (
        <section className={s.recentProjects} id="projects">
            <div className={s.inner}>
                <div className={s.header}>
                    <div className={s.label}>Recent Projects</div>
                    <h2 className={s.title}>
                        Landing pages we&apos;ve launched
                    </h2>
                    <p className={s.subtitle}>
                        A look at recent builds for Australian service
                        businesses.
                    </p>
                </div>

                <div className={s.grid}>
                    {PROJECTS.map((project, i) => {
                        const preview_style: PreviewStyle = {
                            '--project-accent': project.accent,
                        };

                        return (
                            <motion.a
                                key={project.url}
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={s.card}
                                initial={
                                    reduced_motion
                                        ? false
                                        : { opacity: 0, y: 20 }
                                }
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.4,
                                    delay: 0.15 + i * 0.1,
                                }}
                            >
                                <div
                                    className={s.preview}
                                    style={preview_style}
                                >
                                    <div className={s.previewBar}>
                                        <span
                                            className={`${s.dot} ${s.dotRed}`}
                                        />
                                        <span
                                            className={`${s.dot} ${s.dotAmber}`}
                                        />
                                        <span
                                            className={`${s.dot} ${s.dotGreen}`}
                                        />
                                        <div className={s.previewUrl}>
                                            {project.url.replace(
                                                'https://www.',
                                                ''
                                            )}
                                        </div>
                                    </div>
                                    <div className={s.previewBody}>
                                        <span className={s.industryPill}>
                                            {project.industry}
                                        </span>
                                        <span className={s.previewName}>
                                            {project.name}
                                        </span>
                                    </div>
                                </div>

                                <div className={s.content}>
                                    <h3 className={s.name}>{project.name}</h3>
                                    <p className={s.location}>
                                        {project.location}
                                    </p>
                                    <p className={s.blurb}>{project.blurb}</p>
                                    <span className={s.visitLink}>
                                        Visit site
                                        <ArrowUpRight size={16} />
                                    </span>
                                </div>
                            </motion.a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
