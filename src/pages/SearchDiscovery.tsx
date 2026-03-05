import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Leaf, Car, Utensils, Droplets, Recycle, Wind, Lightbulb, Search, Filter } from "lucide-react";
import LiveSearchBar from "@/components/LiveSearchBar";

const categories = [
  { icon: Car, title: "Low Carbon Transport", slug: "low-carbon-transport", impact: "high" as const, desc: "Cycling, EVs, and public transit for greener commutes" },
  { icon: Lightbulb, title: "Solar Energy Benefits", slug: "solar-energy-benefits", impact: "high" as const, desc: "Why switching to solar saves money and the planet" },
  { icon: Utensils, title: "Plant-Based Diet Guide", slug: "plant-based-diet", impact: "medium" as const, desc: "How eating more plants reduces your carbon footprint" },
  { icon: Recycle, title: "How to Reduce Plastic", slug: "reduce-plastic-waste", impact: "high" as const, desc: "Practical tips to minimize single-use plastics" },
  { icon: Leaf, title: "Composting Guide", slug: "composting-guide", impact: "medium" as const, desc: "Turn kitchen scraps into nutrient-rich soil" },
  { icon: Droplets, title: "Water Conservation", slug: "water-conservation", impact: "medium" as const, desc: "Simple ways to reduce water usage at home" },
  { icon: Wind, title: "Eco-Friendly Products", slug: "eco-friendly-products", impact: "low" as const, desc: "Sustainable alternatives for everyday products" },
  { icon: Lightbulb, title: "Wind Energy Explained", slug: "wind-energy", impact: "high" as const, desc: "How wind turbines generate clean electricity" },
];

const impactBadge = {
  low: "bg-secondary text-secondary-foreground",
  medium: "bg-accent/20 text-accent",
  high: "bg-primary/20 text-primary",
};

const SearchDiscovery: React.FC = () => {
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const filtered = categories.filter((c) => filter === "all" || c.impact === filter);

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2 text-center">Discover Sustainable Living</h1>
        <p className="text-muted-foreground text-center mb-8">Explore guides, tips, and alternatives for a greener lifestyle</p>

        <LiveSearchBar />

        <div className="flex gap-2 justify-center mt-8 mb-6 flex-wrap">
          {["all", "low", "medium", "high"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {f === "all" ? "All" : `${f.charAt(0).toUpperCase() + f.slice(1)} Impact`}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {filtered.map((c, i) => (
            <motion.button
              key={c.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/detail/${c.slug}`)}
              className="glass-card p-6 rounded-2xl text-left hover:-translate-y-1 transition-transform group"
            >
              <div className="flex items-start justify-between mb-3">
                <c.icon className="h-8 w-8 text-primary" />
                <span className={`text-xs px-2 py-0.5 rounded-full ${impactBadge[c.impact]}`}>{c.impact}</span>
              </div>
              <h3 className="font-display font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchDiscovery;