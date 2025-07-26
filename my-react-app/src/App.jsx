import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Nav from './components/Nav';
import GrammarCard from './components/GrammarCard';
import AddContentForm from './components/AddContentForm';

const App = () => {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('tenses');
    const [grammarData, setGrammarData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/grammar')
            .then(response => setGrammarData(response.data.sort((a, b) => a.title.localeCompare(b.title))))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const toggleTheme = () => setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    const toggleNav = () => setIsNavOpen(prev => !prev);
    const handleContentAdded = (newContent) => {
        setGrammarData(prev => [...prev, newContent].sort((a, b) => a.title.localeCompare(b.title)));
        setActiveSection(newContent.category.replace(/\s+/g, '-'));
    };

    const sectionMap = {
        'tenses': { title: 'English Tenses', category: 'tense' },
        'parts-of-speech': { title: 'Parts of Speech', category: 'part-of-speech' },
        'be-verbs': { title: 'Be Verbs', category: 'be-verb' },
        'prepositions': { title: 'Prepositions', category: 'preposition' },
        'either-neither': { title: 'Either/Neither', category: 'either-neither' },
    };

    const filteredData = useMemo(() => {
        if (activeSection === 'add-content' || !sectionMap[activeSection]) return [];
        const category = sectionMap[activeSection].category;
        return grammarData.filter(item =>
            item.category === category &&
            (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
             item.definition.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [grammarData, activeSection, searchTerm]);

    return (
        <div className="flex w-full h-screen bg-light-bg dark:bg-dark-bg">
            {/* DESKTOP SIDEBAR: Hidden on mobile, flex on medium screens and up */}
            <aside className="hidden md:flex flex-col w-64 h-screen bg-light-bg-secondary dark:bg-dark-bg-secondary border-r border-light-border dark:border-dark-border">
                <div className="flex items-center h-16 px-6 text-xl font-bold border-b border-light-border dark:border-dark-border">
                    <i className="fas fa-book-open mr-3 text-light-primary dark:text-dark-primary"></i>
                    Grammar Guide
                </div>
                <div className="flex-1 overflow-y-auto">
                    <Nav activeSection={activeSection} setActiveSection={setActiveSection} />
                </div>
            </aside>

            {/* MOBILE NAVIGATION MENU */}
            <AnimatePresence>
                {isNavOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-black/60 md:hidden"
                            onClick={toggleNav}
                        />
                        <motion.aside
                            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed top-0 left-0 z-50 w-4/5 h-full max-w-xs bg-light-bg-secondary dark:bg-dark-bg-secondary md:hidden"
                        >
                            <Nav activeSection={activeSection} setActiveSection={setActiveSection} onNavItemClick={toggleNav} />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col h-screen">
                <Header theme={theme} toggleTheme={toggleTheme} toggleNav={toggleNav} />
                <main className="flex-1 p-4 pt-20 overflow-y-auto sm:p-6 md:p-8">
                    {sectionMap[activeSection] ? (
                        <motion.section key={activeSection} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                            <h2 className="mb-6 text-2xl font-bold sm:text-3xl text-light-text dark:text-dark-text">{sectionMap[activeSection].title}</h2>
                            <div className="relative mb-8">
                                <i className="absolute text-gray-500 fas fa-search top-1/2 left-4 -translate-y-1/2"></i>
                                <input type="text" placeholder={`Search in ${sectionMap[activeSection].title}...`} value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                                    className="w-full py-3 pl-12 pr-4 transition bg-light-bg-secondary dark:bg-dark-bg-secondary border rounded-lg border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"/>
                            </div>
                            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                                {filteredData.map(item => <GrammarCard key={item._id} item={item} />)}
                            </div>
                             {filteredData.length === 0 && <p className="mt-8 text-center text-light-text-secondary dark:text-dark-text-secondary">No results found.</p>}
                        </motion.section>
                    ) : (
                        <AddContentForm onContentAdded={handleContentAdded} />
                    )}
                </main>
            </div>
        </div>
    );
};

export default App;