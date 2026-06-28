import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../../business-data';
import s from './FAQ.module.scss';

export function FAQ() {
    const reduced_motion = useReducedMotion() ?? false;
    const [open_index, set_open_index] = useState<number | null>(null);

    const toggle = (index: number) => {
        set_open_index((prev) => (prev === index ? null : index));
    };

    return (
        <section className={s.faq} id="faq">
            <div className={s.inner}>
                <div className={s.header}>
                    <div className={s.label}>FAQs</div>
                    <h2 className={s.title}>Frequently Asked Questions</h2>
                    <p className={s.subtitle}>
                        Got questions? Here are answers to the most common ones.
                    </p>
                </div>
                <div className={s.list}>
                    {FAQS.map((faq, i) => (
                        <motion.div
                            key={faq.question}
                            className={`${s.item} ${open_index === i ? s.itemOpen : ''}`}
                            initial={
                                reduced_motion ? false : { opacity: 0, y: 12 }
                            }
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.3,
                                delay: 0.1 + i * 0.05,
                            }}
                        >
                            <button
                                className={s.question}
                                onClick={() => toggle(i)}
                                aria-expanded={open_index === i}
                            >
                                <span>{faq.question}</span>
                                <ChevronDown
                                    size={18}
                                    className={`${s.chevron} ${open_index === i ? s.chevronOpen : ''}`}
                                />
                            </button>
                            <AnimatePresence>
                                {open_index === i && (
                                    <motion.div
                                        className={s.answer}
                                        initial={
                                            reduced_motion
                                                ? false
                                                : {
                                                      height: 0,
                                                      opacity: 0,
                                                  }
                                        }
                                        animate={{
                                            height: 'auto',
                                            opacity: 1,
                                        }}
                                        exit={{
                                            height: 0,
                                            opacity: 0,
                                        }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <p>{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
