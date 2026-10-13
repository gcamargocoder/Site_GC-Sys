"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/utils";

/**
 * Revelação discreta ao entrar na viewport. Usada com parcimônia:
 * apenas em blocos que contam uma sequência. Sem deslocamento de layout.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "p";
}) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}
