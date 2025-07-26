import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GrammarCard = ({ item }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
            }
        },
        hover: {
            y: -8,
            scale: 1.02,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 25
            }
        }
    };

    const contentVariants = {
        collapsed: { height: 0, opacity: 0 },
        expanded: {
            height: "auto",
            opacity: 1,
            transition: {
                height: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                },
                opacity: {
                    delay: 0.1,
                    duration: 0.2
                }
            }
        }
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative overflow-hidden"
        >
            {/* Background gradient overlay */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-light-primary/5 via-transparent to-light-accent/5 dark:from-dark-primary/5 dark:to-dark-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.6 }}
            />

            <div className="relative bg-gradient-card-light dark:bg-gradient-card-dark backdrop-blur-sm border border-light-border/50 dark:border-dark-border/50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* Card header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                        <motion.h3 
                            className="text-2xl font-bold text-light-text dark:text-dark-text mb-2 group-hover:text-gradient transition-all duration-300"
                            animate={isHovered ? { x: 5 } : { x: 0 }}
                        >
                            {item.title}
                        </motion.h3>
                        
                        {/* Category badge */}
                        <motion.div
                            className="inline-flex items-center px-3 py-1 rounded-full bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary text-sm font-medium"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="w-2 h-2 bg-current rounded-full mr-2 animate-pulse" />
                            {item.category}
                        </motion.div>
                    </div>

                    {/* Expand button */}
                    <motion.button
                        onClick={toggleExpand}
                        className="p-2 rounded-full hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={isExpanded ? "Collapse content" : "Expand content"}
                    >
                        <motion.i
                            className="fas fa-chevron-down text-light-text-secondary dark:text-dark-text-secondary"
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.button>
                </div>

                {/* Definition */}
                <motion.div
                    className="mb-6"
                    animate={isHovered ? { x: 2 } : { x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed text-lg">
                        {item.definition}
                    </p>
                </motion.div>

                {/* Expandable content */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            variants={contentVariants}
                            initial="collapsed"
                            animate="expanded"
                            exit="collapsed"
                            className="overflow-hidden"
                        >
                            {/* Examples section */}
                            {item.examples && item.examples.length > 0 && (
                                <motion.div
                                    className="mb-6 p-6 rounded-2xl bg-light-bg/50 dark:bg-dark-bg/50 border border-light-border/30 dark:border-dark-border/30"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="flex items-center mb-4">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-light-secondary to-light-accent dark:from-dark-secondary dark:to-dark-accent flex items-center justify-center mr-3">
                                            <i className="fas fa-lightbulb text-white text-sm"></i>
                                        </div>
                                        <h4 className="font-bold text-light-text dark:text-dark-text">
                                            Examples
                                        </h4>
                                    </div>
                                    <ul className="space-y-3">
                                        {item.examples.map((example, index) => (
                                            <motion.li
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 + index * 0.1 }}
                                                className="flex items-start group/example"
                                            >
                                                <div className="w-6 h-6 rounded-full bg-light-primary/10 dark:bg-dark-primary/10 flex items-center justify-center mr-3 mt-0.5 group-hover/example:bg-light-primary/20 dark:group-hover/example:bg-dark-primary/20 transition-colors duration-200">
                                                    <div className="w-2 h-2 rounded-full bg-light-primary dark:bg-dark-primary"></div>
                                                </div>
                                                <span className="text-light-text-secondary dark:text-dark-text-secondary group-hover/example:text-light-text dark:group-hover/example:text-dark-text transition-colors duration-200">
                                                    "{example}"
                                                </span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}

                            {/* Notes section */}
                            {item.notes && (
                                <motion.div
                                    className="p-6 rounded-2xl bg-gradient-to-r from-light-warning/10 to-light-accent/10 dark:from-dark-warning/10 dark:to-dark-accent/10 border border-light-warning/20 dark:border-dark-warning/20"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <div className="flex items-start">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-light-warning to-light-accent dark:from-dark-warning dark:to-dark-accent flex items-center justify-center mr-3 flex-shrink-0">
                                            <i className="fas fa-sticky-note text-white text-sm"></i>
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-light-text dark:text-dark-text mb-2">
                                                Note
                                            </h5>
                                            <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                                                {item.notes}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Quick preview for collapsed state - now clickable */}
                {!isExpanded && item.examples && item.examples.length > 0 && (
                    <motion.button
                        onClick={toggleExpand}
                        className="mt-4 p-4 rounded-xl bg-light-bg/30 dark:bg-dark-bg/30 border border-light-border/20 dark:border-dark-border/20 w-full text-left cursor-pointer"
                        animate={isHovered ? { y: -2 } : { y: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        aria-expanded={isExpanded}
                        aria-label="Expand to view examples"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-light-text-muted dark:text-dark-text-muted">
                                <i className="fas fa-lightbulb mr-2"></i>
                                <span>{item.examples.length} example{item.examples.length > 1 ? 's' : ''}</span>
                            </div>
                            <div className="text-xs text-light-primary dark:text-dark-primary font-medium">
                                Click to expand
                            </div>
                        </div>
                    </motion.button>
                )}

                {/* Decorative elements */}
                <motion.div
                    className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-light-primary/5 to-light-accent/5 dark:from-dark-primary/5 dark:to-dark-accent/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={isHovered ? { scale: [1, 1.2, 1], rotate: 360 } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </div>
        </motion.div>
    );
};

export default GrammarCard;