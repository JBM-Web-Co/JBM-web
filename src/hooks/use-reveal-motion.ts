import { useReducedMotion } from 'framer-motion';

const HIDDEN = { opacity: 0, y: 24 };
const SHOWN = { opacity: 1, y: 0 };
const DURATION = 0.5;

type RevealOptions = Readonly<{
    delay?: number;
    visible?: boolean;
}>;

export function useRevealMotion() {
    const reduced_motion = useReducedMotion();

    return ({ delay = 0, visible = true }: RevealOptions = {}) => {
        if (reduced_motion) {
            return {
                initial: false,
                animate: SHOWN,
                transition: { duration: 0 },
            };
        }
        return {
            initial: HIDDEN,
            animate: visible ? SHOWN : {},
            transition: { duration: DURATION, delay },
        };
    };
}
