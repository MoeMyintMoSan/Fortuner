'use client';
import { motion } from "framer-motion";

export default function LandingPage() {
  const roleCards = [
    { id: "user", name: "The Fool", image: "/tarot_cards/ar00.jpg" },
    { id: "seer", name: "The High Priestess", image: "/tarot_cards/ar02.jpg" },
    { id: "admin", name: "The Magician", image: "/tarot_cards/ar01.jpg" },
  ];

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-6 ">
      {/* Background */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background.png')" }}
      />

      {/* Title Group */}
      <div className="flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <h1 className="text-7xl font-bold text-yellow-300">
            FORTUNER
          </h1>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400"></div>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl text-white"
        >
          What are you seeking today?
        </motion.p>
      </div>

      {/* Three Tarot Cards */}
      <div className="flex flex-row gap-28">
        {roleCards.map((card) => (
          <motion.div
            key={card.id}
            whileHover={{ opacity: 0.8, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center"
          >
            <div className="h-84 w-49 cursor-pointer rounded-lg bg-white/20 backdrop-blur-sm transition-all hover:bg-white/30">
              <img 
                src={card.image} 
                alt={card.name}
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
            <p className="mt-2 text-center font-medium text-white">
              {card.id.toUpperCase()}
            </p>
          </motion.div>
        ))}
      </div>
    </main>
  );
}