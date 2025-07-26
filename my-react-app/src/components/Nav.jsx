import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const navItems = [
    { 
        key: 'tenses', 
        icon: 'fa-clock', 
        label: 'Tenses',
        description: 'Past, Present & Future',
        gradient: 'from-blue-500 to-purple-600'
    },
    { 
        key: 'parts-of-speech', 
        icon: 'fa-puzzle-piece', 
        label: 'Parts of Speech',
        description: 'Nouns, Verbs & More',
        gradient: 'from-green-500 to-blue-500'
    },
    { 
        key: 'be-verbs', 
        icon: 'fa-v', 
        label: 'Be Verbs',
        description: 'Am, Is, Are, Was, Were',
        gradient: 'from-purple-500 to-pink-500'
    },
    { 
        key: 'prepositions', 
        icon: 'fa-map-marker-alt', 
        label: 'Prepositions',
        description: 'In, On, At & More',
        gradient: 'from-orange-500 to-red-500'
    },
    { 
        key: 'either-neither', 
        icon: 'fa-random', 
        label: 'Either/Neither',
        description: 'Choice & Negation',
        gradient: 'from-teal-500 to-cyan-500'
    },
    { 
        key: 'add-content', 
        icon: 'fa-plus-circle', 
        label: 'Add Content',
        description: 'Create New Entry',
        gradient: 'from-indigo-500 to-purple-500'
    },
];

const Nav = ({ activeSection, setActiveSection, onNavItemClick }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
            }
        }
    };

    return (
        <motion.nav 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-2 p-4"
        >
            {navItems.map((item, index) => (
                <motion.div
                    key={item.key}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setActiveSection(item.key);
                            if (onNavItemClick) onNavItemClick();
                        }}
                        className={clsx(
                            'nav-item group relative flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-medium transition-all duration-300 overflow-hidden',
                            {
                                'bg-gradient-to-r text-white shadow-lg transform scale-105': activeSection === item.key,
                                'text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary hover:text-light-text dark:hover:text-dark-text': activeSection !== item.key
                            },
                            activeSection === item.key && item.gradient
                        )}
                    >
                        {/* Background gradient for active state */}
                        {activeSection === item.key && (
                            <motion.div
                                layoutId="activeBackground"
                                className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-2xl`}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        )}

                        {/* Icon container */}
                        <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm">
                            <motion.i 
                                className={clsx('text-lg fa', item.icon)}
                                animate={activeSection === item.key ? { 
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 10, -10, 0] 
                                } : {}}
                                transition={{ duration: 0.6 }}
                            />
                        </div>

                        {/* Text content */}
                        <div className="relative z-10 flex-1 min-w-0">
                            <div className="font-semibold truncate">
                                {item.label}
                            </div>
                            <div className={clsx(
                                "text-xs truncate transition-colors duration-200",
                                activeSection === item.key 
                                    ? "text-white/80" 
                                    : "text-light-text-muted dark:text-dark-text-muted group-hover:text-light-text-secondary dark:group-hover:text-dark-text-secondary"
                            )}>
                                {item.description}
                            </div>
                        </div>

                        {/* Arrow indicator */}
                        <motion.div
                            className="relative z-10"
                            animate={activeSection === item.key ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <i className="fas fa-chevron-right text-sm"></i>
                        </motion.div>

                        {/* Hover glow effect */}
                        <motion.div
                            className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                        />

                        {/* Ripple effect */}
                        <motion.div
                            className="absolute inset-0 rounded-2xl"
                            whileTap={{
                                background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)"
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    </a>
                </motion.div>
            ))}

            {/* Statistics or additional info */}
            <motion.div
                variants={itemVariants}
                className="mt-6 p-4 rounded-2xl bg-light-bg-secondary/50 dark:bg-dark-bg-secondary/50 border border-light-border/30 dark:border-dark-border/30"
            >
                <div className="text-center">
                    <motion.div
                        className="text-2xl font-bold text-gradient mb-1"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        100+
                    </motion.div>
                    <div className="text-xs text-light-text-muted dark:text-dark-text-muted">
                        Grammar Rules
                    </div>
                </div>
            </motion.div>

            {/* Footer note */}
            <motion.div
                variants={itemVariants}
                className="mt-4 text-center text-xs text-light-text-muted dark:text-dark-text-muted"
            >
                <div className="flex items-center justify-center gap-1">
                    <i className="fas fa-heart text-red-400"></i>
                    <span>Created by Mukshith</span>
                </div>
            </motion.div>
        </motion.nav>
    );
};

export default Nav;