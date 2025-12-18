"use client";

import { SimpleList } from "@/components/SimpleList";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export default function Home() {
  const [bgMode, setBgMode] = useState<'dark' | 'image' | 'custom'>('custom');

  // Unsplash Image
  const bgImage = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";
  // Local Custom Image
  const customBgImage = "/background.webp";

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center font-sans">

      {/* Background Layers */}
      <div className="absolute inset-0 bg-[#0f0f0f] z-0" />

      {/* Unsplash Layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: bgMode === 'image' ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Custom Local Layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: bgMode === 'custom' ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${customBgImage})` }}
      />

      {/* Content */}
      <div className="relative z-10">
        <SimpleList />
      </div>

      {/* Background Toggles - Bottom Left */}
      <div className="absolute bottom-10 left-10 z-50 flex items-center gap-4">
        {/* 1. Dark Mode Toggle */}
        <button
          onClick={() => setBgMode('dark')}
          className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 relative ${bgMode === 'dark' ? 'border-white/50' : 'border-transparent hover:border-white/20'}`}
        >
          <div className="w-10 h-10 rounded-full bg-[#1a1a1a] shadow-inner" />
        </button>

        {/* 2. Custom (Local WebP) Toggle - MIDDLE */}
        <button
          onClick={() => setBgMode('custom')}
          className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 relative overflow-hidden ${bgMode === 'custom' ? 'border-white/50' : 'border-transparent hover:border-white/20'}`}
        >
          <div
            className="w-10 h-10 rounded-full bg-cover bg-center shadow-inner"
            style={{ backgroundImage: `url(${customBgImage})` }}
          />
        </button>

        {/* 3. Image (Unsplash) Toggle */}
        <button
          onClick={() => setBgMode('image')}
          className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 relative overflow-hidden ${bgMode === 'image' ? 'border-white/50' : 'border-transparent hover:border-white/20'}`}
        >
          <div
            className="w-10 h-10 rounded-full bg-cover bg-center shadow-inner"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
        </button>
      </div>

    </main>
  );
}
