import { motion } from "motion/react";

export function TransitionWrapper({
    children,
    className,
    key,
}: {
    children: React.ReactNode; 
    className?: string;
    key?: string;
}) {
    return (
        <motion.div
            key={`transition-wrapper-${key}`}
            className={className}
            initial={{ opacity: 0, translateY: 10  }}
            animate={{ opacity: 1, translateY: 1 }} 
            transition={{ duration: 0.5, ease: "easeInOut" }}   
        >
            {children}
        </motion.div>
    );
}