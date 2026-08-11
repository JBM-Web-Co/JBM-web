import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import s from './RecentProjects.module.scss';
import { SectionHeader } from '../../components/SectionHeader';

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
        name: "Jake's Cafe",
        url: 'https://www.jakemayled.dev',
        industry: 'Personal Portfolio',
        location: 'Australia',
        blurb: 'Interactive 3D developer portfolio disguised as a corner cafe. Every brick, chalkboard, and neon sign is painted at runtime with React Three Fiber, shipping zero image assets.',
        accent: '#a2542f',
    },
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
    const track_ref = useRef<HTMLDivElement>(null);
    const [active_index, set_active_index] = useState(0);
    const [can_scroll_prev, set_can_scroll_prev] = useState(false);
    const [can_scroll_next, set_can_scroll_next] = useState(false);

    const update_scroll_state = useCallback(() => {
        const track = track_ref.current;
        if (!track) return;

        const max_scroll = track.scrollWidth - track.clientWidth;
        set_can_scroll_prev(track.scrollLeft > 8);
        set_can_scroll_next(track.scrollLeft < max_scroll - 8);

        const cards = Array.from(
            track.querySelectorAll<HTMLElement>('[data-carousel-card]')
        );
        const track_center = track.scrollLeft + track.clientWidth / 2;

        let closest_index = 0;
        let closest_distance = Infinity;
        cards.forEach((card, index) => {
            const card_center = card.offsetLeft + card.offsetWidth / 2;
            const distance = Math.abs(card_center - track_center);
            if (distance < closest_distance) {
                closest_distance = distance;
                closest_index = index;
            }
        });
        set_active_index(closest_index);
    }, []);

    useLayoutEffect(() => {
        const track = track_ref.current;
        if (!track) return;

        update_scroll_state();

        let frame = 0;
        const handle_scroll = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(update_scroll_state);
        };

        const resize_observer = new ResizeObserver(update_scroll_state);
        resize_observer.observe(track);
        track.addEventListener('scroll', handle_scroll, { passive: true });

        return () => {
            cancelAnimationFrame(frame);
            track.removeEventListener('scroll', handle_scroll);
            resize_observer.disconnect();
        };
    }, [update_scroll_state]);

    const scroll_to_index = useCallback(
        (index: number) => {
            const track = track_ref.current;
            if (!track) return;

            const cards = track.querySelectorAll<HTMLElement>(
                '[data-carousel-card]'
            );
            const card = cards[index];
            if (!card) return;

            track.scrollTo({
                left: card.offsetLeft,
                behavior: reduced_motion ? 'auto' : 'smooth',
            });
        },
        [reduced_motion]
    );

    const show_controls = can_scroll_prev || can_scroll_next;

    return (
        <section className={s.recentProjects} id="projects">
            <div className={s.inner}>
                <SectionHeader
                    className={s.header}
                    label="Recent Projects"
                    title="Websites we've launched"
                    subtitle="A look at some of our recent builds."
                />

                <div className={s.carousel}>
                    <div
                        className={`${s.track}${
                            show_controls ? '' : ` ${s.trackCentered}`
                        }`}
                        ref={track_ref}
                        role="region"
                        aria-roledescription="carousel"
                        aria-label="Recent projects"
                        tabIndex={0}
                    >
                        {PROJECTS.map((project, i) => {
                            const preview_style: PreviewStyle = {
                                '--project-accent': project.accent,
                            };

                            return (
                                <motion.a
                                    key={project.url}
                                    data-carousel-card
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
                                                className={`${s.trafficDot} ${s.trafficDotRed}`}
                                            />
                                            <span
                                                className={`${s.trafficDot} ${s.trafficDotAmber}`}
                                            />
                                            <span
                                                className={`${s.trafficDot} ${s.trafficDotGreen}`}
                                            />
                                            <div className={s.previewUrl}>
                                                {project.url.replace(
                                                    /^https?:\/\/(www\.)?/,
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
                                        <h3 className={s.name}>
                                            {project.name}
                                        </h3>
                                        <p className={s.location}>
                                            {project.location}
                                        </p>
                                        <p className={s.blurb}>
                                            {project.blurb}
                                        </p>
                                        <span className={s.visitLink}>
                                            Visit site
                                            <ArrowUpRight size={16} />
                                        </span>
                                    </div>
                                </motion.a>
                            );
                        })}
                    </div>

                    {show_controls && (
                        <div className={s.controls}>
                            <button
                                type="button"
                                className={s.navButton}
                                onClick={() =>
                                    scroll_to_index(active_index - 1)
                                }
                                disabled={!can_scroll_prev}
                                aria-label="Previous project"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <div className={s.dots}>
                                {PROJECTS.map((project, index) => (
                                    <button
                                        key={project.url}
                                        type="button"
                                        className={`${s.pageDot}${
                                            index === active_index
                                                ? ` ${s.pageDotActive}`
                                                : ''
                                        }`}
                                        onClick={() => scroll_to_index(index)}
                                        aria-label={`Go to ${project.name}`}
                                        aria-current={index === active_index}
                                    />
                                ))}
                            </div>

                            <button
                                type="button"
                                className={s.navButton}
                                onClick={() =>
                                    scroll_to_index(active_index + 1)
                                }
                                disabled={!can_scroll_next}
                                aria-label="Next project"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
