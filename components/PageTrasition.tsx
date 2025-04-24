'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React from 'react';

type PageTransitionProps = {
  children: React.ReactNode;
};

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        {/* Tela de transição animada */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: 0,
            transition: {
              delay: 0.1,
              duration: 0.5,
              ease: 'easeInOut',
            },
          }}
          exit={{
            opacity: 1,
            transition: {
              delay: 0.1,
              duration: 0.5,
              ease: 'easeInOut',
            },
          }}

          className="h-screen w-screen fixed bg-neutral-950 top-0 left-0 z-50 pointer-events-none"
        />
        {/* Conteúdo da página */}
        <div className="relative z-0">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
