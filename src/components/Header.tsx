"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface SectionHeaderProps {
  eyebrow: string;
  heading: React.ReactNode;
  description?: string;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  heading,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 text-center ${className ?? ""}`}>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
        className="font-space text-[11px] font-medium tracking-[0.2em] text-muted-foreground/60 uppercase"
      >
        {eyebrow}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
        className="mt-3 font-space text-3xl font-normal tracking-[-0.025em] text-foreground md:text-[42px] md:leading-[1.1]"
      >
        {heading}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
          className="mx-auto mt-4 max-w-xl font-space text-[15px] leading-relaxed text-muted-foreground"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}