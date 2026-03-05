import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, TreePine, Droplets, Wind, Zap } from "lucide-react";
import heroEarth from "@/assets/hero-earth.jpg";

const AnimatedCounter: React.FC<{ end: number; suffix?: string; duration?: number }> = ({ end, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [end, duration]);
  return <span>{count.toLocaleString()}{suffix}</span>;
};

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroEarth} alt="Earth with nature" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>

        {/* Floating leaves */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="absolute animate-leaf-fall text-primary/30"
            style={{ left: `${i * 18}%`, animationDelay: `${i * 1.5}s`, animationDuration: `${6 + i}s` }}
          >
            🍃
          </div>
        ))}

        <div className="relative z-10 text-center max-w-3xl mx-auto px-6 pt-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium tracking-[6px] uppercase text-primary mb-4"
          >
            Personal Carbon Footprint Simulator
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-5xl md:text-7xl font-bold text-foreground mb-4"
          >
            Measure Today.{" "}
            <span className="eco-text-gradient">Protect Tomorrow.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto"
          >
            Track your impact. Transform your future. An interactive platform to calculate, visualize, and reduce your carbon footprint.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity eco-glow"
            >
              Start Tracking <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 glass-card px-6 py-3 rounded-full font-semibold text-sm text-foreground hover:bg-primary/5 transition-colors"
            >
              Explore Impact
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Carbon Counter */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-2">Global CO₂ Emissions</h2>
          <p className="text-muted-foreground mb-10">Real-time simulated data</p>
          <div className="glass-card rounded-2xl p-10 max-w-2xl mx-auto">
            <div className="text-6xl font-display font-bold eco-text-gradient mb-2">
              <AnimatedCounter end={36800} suffix=" Mt" />
            </div>
            <p className="text-muted-foreground">Million tonnes of CO₂ emitted annually</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="font-display text-3xl font-bold text-center text-foreground mb-12">Why EcoTrack?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: TreePine, title: "Carbon Calculator", desc: "Calculate your personal carbon footprint from lifestyle data" },
              { icon: Droplets, title: "Water Impact", desc: "Track and reduce your water consumption footprint" },
              { icon: Wind, title: "Clean Energy Tips", desc: "Discover renewable alternatives for your home" },
              { icon: Zap, title: "Eco Challenges", desc: "Weekly sustainability challenges with gamified rewards" },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 rounded-2xl hover:-translate-y-2 transition-transform cursor-default"
              >
                <f.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 px-6 text-center">
        <p className="text-sm text-muted-foreground">
          © 2026 EcoTrack — Track Your Impact. Transform Your Future.
        </p>
      </footer>
    </div>
  );
};

export default Landing;