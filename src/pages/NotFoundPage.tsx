import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TreePine, Home } from "lucide-react";
import earthHealing from "@/assets/earth-healing.jpg";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Animated background trees */}
      {[...Array(8)].map((_, i) => (
        <TreePine
          key={i}
          className="absolute text-primary/10 animate-float-slow"
          style={{
            width: `${30 + i * 10}px`,
            height: `${30 + i * 10}px`,
            left: `${10 + i * 11}%`,
            bottom: `${5 + (i % 3) * 10}%`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10"
      >
        <div className="relative w-48 h-48 mx-auto mb-8">
          <img
            src={earthHealing}
            alt="Earth healing"
            className="w-full h-full object-cover rounded-full border-4 border-primary/20 animate-crack-heal"
          />
          <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
            <TreePine className="h-8 w-8 text-primary animate-float" />
          </div>
        </div>

        <h1 className="font-display text-7xl font-bold eco-text-gradient mb-4">404</h1>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Oops! You Drifted Off the Climate Path.
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist. Let's get you back on track to saving the planet!
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity eco-glow"
        >
          <Home className="h-4 w-4" /> Return to Dashboard
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;