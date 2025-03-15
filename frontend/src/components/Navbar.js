"use client";

import { motion } from "framer-motion";

export default function Navbar({ introComplete }) {
return (
    <motion.nav
        className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-black/80 backdrop-blur-lg"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
    >
        <div className="flex-1"></div>
        <motion.div
            className="text-xl font-bold flex-1 text-center absolute left-1/2 transform -translate-x-1/2"
            initial={{ scale: 1.5, y: 0 }}
            animate={introComplete ? { scale: 1, y: 0 } : { scale: 1.5, y: "50vh" }}
            transition={{ duration: 1 }}
        >
            Adrian Szwaczyk
        </motion.div>

        {/* Navigation Links */}
        <div className="space-x-6">
            <a href="#about" className="hover:text-gray-400">About</a>
            <a href="#projects" className="hover:text-gray-400">Projects</a>
            <a href="#contact" className="hover:text-gray-400">Contact</a>
        </div>
    </motion.nav>
);
}
