import { motion, useInView } from 'motion/react';
import { useRef, ReactNode } from 'react';

interface FadeContentProps {
  children: ReactNode;
  className?: string;
  blur?: boolean;
  duration?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  threshold?: number;
}

const FadeContent: React.FC<FadeContentProps> = ({
  children,
  className = '',
  blur = false,
  duration = 0.8,
  delay = 0,
  direction = 'up',
  distance = 40,
  threshold = 0.1
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: `-${threshold * 100}px` });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance };
      case 'down':
        return { y: -distance };
      case 'left':
        return { x: distance };
      case 'right':
        return { x: -distance };
      default:
        return {};
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        filter: blur ? 'blur(10px)' : 'blur(0px)',
        ...getInitialPosition()
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              filter: 'blur(0px)',
              x: 0,
              y: 0
            }
          : {}
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeContent;
