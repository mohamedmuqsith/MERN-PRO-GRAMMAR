import React from 'react';
import { Sun, Moon, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = ({ theme, toggleTheme, toggleNav }) => {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 z-30 flex items-center justify-between w-full h-20 px-4 sm:px-6 md:px-8 glass-effect border-b border-light-border/50 dark:border-dark-border/50 md:justify-end"
    >
      {/* Mobile Menu Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleNav}
        className="p-3 -ml-1 text-light-text dark:text-dark-text md:hidden rounded-xl hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors duration-200"
        aria-label="Open navigation menu"
      >
        <Menu size={24} />
      </motion.button>

      {/* Logo/Title - visible on mobile */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center md:hidden"
      >
        <motion.i 
          className="fas fa-book-open mr-2 text-light-primary dark:text-dark-primary text-xl"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        />
        <span className="text-lg font-bold text-gradient">Grammar Guide</span>
      </motion.div>

      {/* Theme Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className="relative p-3 rounded-xl hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-all duration-300 group"
        aria-label="Toggle theme"
      >
        <motion.div
          initial={false}
          animate={{ 
            rotate: theme === 'dark' ? 0 : 180,
            scale: theme === 'dark' ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="text-dark-primary" size={20} />
        </motion.div>
        
        <motion.div
          initial={false}
          animate={{ 
            rotate: theme === 'light' ? 0 : 180,
            scale: theme === 'light' ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center"
        >
          <Moon className="text-light-text dark:text-dark-text" size={20} />
        </motion.div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-light-primary/20 to-light-accent/20 dark:from-dark-primary/20 dark:to-dark-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{
            boxShadow: theme === 'dark' 
              ? "0 0 20px rgba(96, 165, 250, 0.3)" 
              : "0 0 20px rgba(59, 130, 246, 0.3)"
          }}
        />
      </motion.button>

      {/* Additional header actions */}
      <div className="hidden lg:flex items-center space-x-4 ml-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-light-text-secondary dark:text-dark-text-secondary"
        >
          <span className="hidden xl:inline">Last updated: </span>
          <span className="font-medium">Today</span>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;