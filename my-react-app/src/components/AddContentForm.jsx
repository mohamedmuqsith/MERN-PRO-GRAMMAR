import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const AddContentForm = ({ onContentAdded }) => {
    const [formData, setFormData] = useState({
        category: '', title: '', definition: '', examples: '', notes: ''
    });
    const [status, setStatus] = useState({ error: '', success: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [focusedField, setFocusedField] = useState('');

    const categories = [
        { value: 'tense', label: 'Tense', icon: 'fa-clock', color: 'from-blue-500 to-purple-600' },
        { value: 'part-of-speech', label: 'Part of Speech', icon: 'fa-puzzle-piece', color: 'from-green-500 to-blue-500' },
        { value: 'be-verb', label: 'Be Verb', icon: 'fa-v', color: 'from-purple-500 to-pink-500' },
        { value: 'preposition', label: 'Preposition', icon: 'fa-map-marker-alt', color: 'from-orange-500 to-red-500' },
        { value: 'either-neither', label: 'Either/Neither', icon: 'fa-random', color: 'from-teal-500 to-cyan-500' }
    ];

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
        // Clear error when user starts typing
        if (status.error) {
            setStatus({ error: '', success: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ error: '', success: '' });
        setIsSubmitting(true);

        if (!formData.category || !formData.title || !formData.definition) {
            setStatus({ error: 'Please fill in Category, Title, and Definition.', success: '' });
            setIsSubmitting(false);
            return;
        }

        try {
            const newContent = {
                ...formData,
                examples: formData.examples.split('\n').filter(e => e.trim() !== '')
            };
            const response = await axios.post('http://localhost:5000/api/grammar', newContent);
            onContentAdded(response.data);
            setStatus({ success: 'Content added successfully!', error: '' });
            setFormData({ category: '', title: '', definition: '', examples: '', notes: '' });
        } catch (err) {
            setStatus({ error: err.response?.data?.message || 'Failed to add content.', success: '' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const formVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    };

    const fieldVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
            }
        }
    };

    return (
        <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
        >
            {/* Header */}
            <motion.div 
                className="text-center mb-12"
                variants={fieldVariants}
            >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-3xl shadow-lg mb-6">
                    <i className="fas fa-plus-circle"></i>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                    Add New Content
                </h1>
                <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
                    Contribute to our grammar guide by adding new rules, explanations, and examples.
                </p>
            </motion.div>

            <motion.form
                onSubmit={handleSubmit}
                className="space-y-8 p-8 md:p-10 rounded-3xl glass-effect border border-light-border/50 dark:border-dark-border/50 shadow-2xl"
                variants={fieldVariants}
            >
                {/* Status Messages */}
                <AnimatePresence>
                    {(status.error || status.success) && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`p-4 rounded-2xl border ${
                                status.error 
                                    ? 'bg-light-error/10 dark:bg-dark-error/10 border-light-error/30 dark:border-dark-error/30 text-light-error dark:text-dark-error'
                                    : 'bg-light-success/10 dark:bg-dark-success/10 border-light-success/30 dark:border-dark-success/30 text-light-success dark:text-dark-success'
                            }`}
                        >
                            <div className="flex items-center">
                                <i className={`fas ${status.error ? 'fa-exclamation-triangle' : 'fa-check-circle'} mr-3`}></i>
                                <span className="font-medium">
                                    {status.error || status.success}
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Category Selection */}
                <motion.div variants={fieldVariants}>
                    <label htmlFor="category" className="block mb-4 text-lg font-bold text-light-text dark:text-dark-text">
                        Content Type
                        <span className="text-light-error dark:text-dark-error ml-1">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categories.map((cat) => (
                            <motion.label
                                key={cat.value}
                                className={`relative cursor-pointer p-4 rounded-2xl border-2 transition-all duration-300 ${
                                    formData.category === cat.value
                                        ? 'border-light-primary dark:border-dark-primary bg-light-primary/5 dark:bg-dark-primary/5'
                                        : 'border-light-border dark:border-dark-border hover:border-light-primary/50 dark:hover:border-dark-primary/50'
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <input
                                    type="radio"
                                    id="category"
                                    name="category"
                                    value={cat.value}
                                    checked={formData.category === cat.value}
                                    onChange={handleChange}
                                    className="sr-only"
                                />
                                <div className="flex items-center space-x-3">
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${cat.color} flex items-center justify-center text-white shadow-lg`}>
                                        <i className={`fas ${cat.icon}`}></i>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-light-text dark:text-dark-text">
                                            {cat.label}
                                        </div>
                                        <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                            Grammar category
                                        </div>
                                    </div>
                                </div>
                                {formData.category === cat.value && (
                                    <motion.div
                                        layoutId="selectedCategory"
                                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-light-primary/10 to-light-accent/10 dark:from-dark-primary/10 dark:to-dark-accent/10"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                            </motion.label>
                        ))}
                    </div>
                </motion.div>

                {/* Title Field */}
                <motion.div variants={fieldVariants}>
                    <label htmlFor="title" className="block mb-4 text-lg font-bold text-light-text dark:text-dark-text">
                        Title
                        <span className="text-light-error dark:text-dark-error ml-1">*</span>
                    </label>
                    <div className="relative group">
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-light-primary/20 via-light-accent/20 to-light-primary/20 dark:from-dark-primary/20 dark:via-dark-accent/20 dark:to-dark-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            animate={focusedField === 'title' ? { opacity: 1, scale: 1.02 } : { opacity: 0, scale: 1 }}
                        />
                        <motion.input
                            type="text"
                            id="title"
                            value={formData.title}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('title')}
                            onBlur={() => setFocusedField('')}
                            className="relative w-full px-6 py-4 bg-light-bg-secondary/80 dark:bg-dark-bg-secondary/80 backdrop-blur-sm border-2 border-light-border/50 dark:border-dark-border/50 rounded-2xl focus:outline-none focus:border-light-primary dark:focus:border-dark-primary transition-all duration-300 text-lg placeholder-light-text-muted dark:placeholder-dark-text-muted shadow-lg hover:shadow-xl"
                            placeholder="Enter a descriptive title..."
                            maxLength="100"
                            animate={focusedField === 'title' ? { 
                                scale: 1.01,
                                boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.25)"
                            } : { 
                                scale: 1,
                                boxShadow: "0 4px 20px -4px rgba(0, 0, 0, 0.1)"
                            }}
                            transition={{ duration: 0.3 }}
                        />
                        
                        {/* Input decoration */}
                        <motion.div
                            className="absolute right-4 top-1/2 transform -translate-y-1/2"
                            animate={focusedField === 'title' ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0.5 }}
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent flex items-center justify-center">
                                <i className="fas fa-heading text-white text-sm"></i>
                            </div>
                        </motion.div>

                        {/* Character counter */}
                        <motion.div
                            className="absolute -bottom-6 right-0 text-xs text-light-text-muted dark:text-dark-text-muted"
                            animate={focusedField === 'title' ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {formData.title.length}/100
                        </motion.div>
                    </div>
                </motion.div>

                {/* Definition Field */}
                <motion.div variants={fieldVariants}>
                    <label htmlFor="definition" className="block mb-4 text-lg font-bold text-light-text dark:text-dark-text">
                        Definition
                        <span className="text-light-error dark:text-dark-error ml-1">*</span>
                    </label>
                    <div className="relative group">
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-light-secondary/20 via-light-accent/20 to-light-secondary/20 dark:from-dark-secondary/20 dark:via-dark-accent/20 dark:to-dark-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            animate={focusedField === 'definition' ? { opacity: 1, scale: 1.01 } : { opacity: 0, scale: 1 }}
                        />
                        <motion.textarea
                            id="definition"
                            value={formData.definition}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('definition')}
                            onBlur={() => setFocusedField('')}
                            rows="4"
                            className="relative w-full px-6 py-4 bg-light-bg-secondary/80 dark:bg-dark-bg-secondary/80 backdrop-blur-sm border-2 border-light-border/50 dark:border-dark-border/50 rounded-2xl focus:outline-none focus:border-light-secondary dark:focus:border-dark-secondary transition-all duration-300 text-lg placeholder-light-text-muted dark:placeholder-dark-text-muted shadow-lg hover:shadow-xl resize-none"
                            placeholder="Provide a clear and concise definition..."
                            maxLength="500"
                            animate={focusedField === 'definition' ? { 
                                scale: 1.005,
                                boxShadow: "0 20px 40px -12px rgba(16, 185, 129, 0.25)"
                            } : { 
                                scale: 1,
                                boxShadow: "0 4px 20px -4px rgba(0, 0, 0, 0.1)"
                            }}
                            transition={{ duration: 0.3 }}
                        />
                        
                        {/* Input decoration */}
                        <motion.div
                            className="absolute right-4 top-4"
                            animate={focusedField === 'definition' ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0.5 }}
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-light-secondary to-light-accent dark:from-dark-secondary dark:to-dark-accent flex items-center justify-center">
                                <i className="fas fa-book-open text-white text-sm"></i>
                            </div>
                        </motion.div>

                        {/* Character counter */}
                        <motion.div
                            className="absolute -bottom-6 right-0 text-xs text-light-text-muted dark:text-dark-text-muted"
                            animate={focusedField === 'definition' ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {formData.definition.length}/500
                        </motion.div>
                    </div>
                </motion.div>

                {/* Examples Field */}
                <motion.div variants={fieldVariants}>
                    <label htmlFor="examples" className="block mb-4 text-lg font-bold text-light-text dark:text-dark-text">
                        Examples
                        <span className="text-sm font-normal text-light-text-secondary dark:text-dark-text-secondary ml-2">
                            (one per line)
                        </span>
                    </label>
                    <div className="relative group">
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-light-accent/20 via-purple-500/20 to-light-accent/20 dark:from-dark-accent/20 dark:via-purple-400/20 dark:to-dark-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            animate={focusedField === 'examples' ? { opacity: 1, scale: 1.01 } : { opacity: 0, scale: 1 }}
                        />
                        <motion.textarea
                            id="examples"
                            value={formData.examples}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('examples')}
                            onBlur={() => setFocusedField('')}
                            rows="5"
                            className="relative w-full px-6 py-4 bg-light-bg-secondary/80 dark:bg-dark-bg-secondary/80 backdrop-blur-sm border-2 border-light-border/50 dark:border-dark-border/50 rounded-2xl focus:outline-none focus:border-light-accent dark:focus:border-dark-accent transition-all duration-300 text-lg placeholder-light-text-muted dark:placeholder-dark-text-muted shadow-lg hover:shadow-xl resize-none"
                            placeholder="Example 1&#10;Example 2&#10;Example 3..."
                            animate={focusedField === 'examples' ? { 
                                scale: 1.005,
                                boxShadow: "0 20px 40px -12px rgba(139, 92, 246, 0.25)"
                            } : { 
                                scale: 1,
                                boxShadow: "0 4px 20px -4px rgba(0, 0, 0, 0.1)"
                            }}
                            transition={{ duration: 0.3 }}
                        />
                        
                        {/* Input decoration */}
                        <motion.div
                            className="absolute right-4 top-4"
                            animate={focusedField === 'examples' ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0.5 }}
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-light-accent to-purple-500 dark:from-dark-accent dark:to-purple-400 flex items-center justify-center">
                                <i className="fas fa-lightbulb text-white text-sm"></i>
                            </div>
                        </motion.div>

                        {/* Examples counter */}
                        <motion.div
                            className="absolute -bottom-6 right-0 text-xs text-light-text-muted dark:text-dark-text-muted"
                            animate={focusedField === 'examples' ? { opacity: 1, y: 0 } : { opacity: 0.7, y: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {formData.examples.split('\n').filter(e => e.trim() !== '').length} examples
                        </motion.div>
                    </div>
                </motion.div>

                {/* Notes Field */}
                <motion.div variants={fieldVariants}>
                    <label htmlFor="notes" className="block mb-4 text-lg font-bold text-light-text dark:text-dark-text">
                        Additional Notes
                        <span className="text-sm font-normal text-light-text-secondary dark:text-dark-text-secondary ml-2">
                            (optional)
                        </span>
                    </label>
                    <div className="relative group">
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-light-warning/20 via-orange-500/20 to-light-warning/20 dark:from-dark-warning/20 dark:via-orange-400/20 dark:to-dark-warning/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            animate={focusedField === 'notes' ? { opacity: 1, scale: 1.01 } : { opacity: 0, scale: 1 }}
                        />
                        <motion.textarea
                            id="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('notes')}
                            onBlur={() => setFocusedField('')}
                            rows="3"
                            className="relative w-full px-6 py-4 bg-light-bg-secondary/80 dark:bg-dark-bg-secondary/80 backdrop-blur-sm border-2 border-light-border/50 dark:border-dark-border/50 rounded-2xl focus:outline-none focus:border-light-warning dark:focus:border-dark-warning transition-all duration-300 text-lg placeholder-light-text-muted dark:placeholder-dark-text-muted shadow-lg hover:shadow-xl resize-none"
                            placeholder="Any additional information, tips, or exceptions..."
                            maxLength="300"
                            animate={focusedField === 'notes' ? { 
                                scale: 1.005,
                                boxShadow: "0 20px 40px -12px rgba(245, 158, 11, 0.25)"
                            } : { 
                                scale: 1,
                                boxShadow: "0 4px 20px -4px rgba(0, 0, 0, 0.1)"
                            }}
                            transition={{ duration: 0.3 }}
                        />
                        
                        {/* Input decoration */}
                        <motion.div
                            className="absolute right-4 top-4"
                            animate={focusedField === 'notes' ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0.5 }}
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-light-warning to-orange-500 dark:from-dark-warning dark:to-orange-400 flex items-center justify-center">
                                <i className="fas fa-sticky-note text-white text-sm"></i>
                            </div>
                        </motion.div>

                        {/* Character counter */}
                        <motion.div
                            className="absolute -bottom-6 right-0 text-xs text-light-text-muted dark:text-dark-text-muted"
                            animate={focusedField === 'notes' ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {formData.notes.length}/300
                        </motion.div>
                    </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div 
                    variants={fieldVariants}
                    className="flex justify-center pt-6"
                >
                    <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary px-12 py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                        whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                    >
                        <AnimatePresence mode="wait">
                            {isSubmitting ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center"
                                >
                                    <motion.div
                                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-3"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    />
                                    Adding Content...
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="submit"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center"
                                >
                                    <i className="fas fa-plus mr-3"></i>
                                    Add Content
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Button background animation */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                            animate={isSubmitting ? {} : { x: ['-100%', '100%'] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        />
                    </motion.button>
                </motion.div>

                {/* Form Footer */}
                <motion.div 
                    variants={fieldVariants}
                    className="text-center pt-6 border-t border-light-border/30 dark:border-dark-border/30"
                >
                    <div className="flex items-center justify-center text-sm text-light-text-muted dark:text-dark-text-muted">
                        <i className="fas fa-info-circle mr-2"></i>
                        <span>Fields marked with * are required</span>
                    </div>
                </motion.div>
            </motion.form>
        </motion.div>
    );
};

export default AddContentForm;