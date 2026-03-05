import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchItem {
  id: string;
  title: string;
  category: string;
  impact: "low" | "medium" | "high";
  description: string;
  slug: string;
}

const allItems: SearchItem[] = [
  { id: "1", title: "How to Reduce Plastic Waste", category: "Waste Reduction", impact: "high", description: "Practical tips to minimize single-use plastics in daily life", slug: "reduce-plastic-waste" },
  { id: "2", title: "Solar Energy Benefits", category: "Renewable Energy", impact: "high", description: "Why switching to solar can save money and the planet", slug: "solar-energy-benefits" },
  { id: "3", title: "Composting Guide", category: "Waste Reduction", impact: "medium", description: "Turn kitchen scraps into nutrient-rich soil for your garden", slug: "composting-guide" },
  { id: "4", title: "Low Carbon Transport Options", category: "Transport", impact: "high", description: "Cycling, EVs, and public transit for a greener commute", slug: "low-carbon-transport" },
  { id: "5", title: "Plant-Based Diet Guide", category: "Food", impact: "medium", description: "How eating more plants reduces your carbon footprint", slug: "plant-based-diet" },
  { id: "6", title: "Water Conservation Methods", category: "Water", impact: "medium", description: "Simple ways to reduce water usage at home", slug: "water-conservation" },
  { id: "7", title: "Eco-Friendly Products", category: "Lifestyle", impact: "low", description: "Sustainable alternatives for everyday products", slug: "eco-friendly-products" },
  { id: "8", title: "Wind Energy Explained", category: "Renewable Energy", impact: "high", description: "How wind turbines generate clean electricity", slug: "wind-energy" },
];

const impactColors = {
  low: "bg-secondary text-secondary-foreground",
  medium: "bg-accent/20 text-accent",
  high: "bg-primary/20 text-primary",
};

const LiveSearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [showResults, setShowResults] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setShowResults(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = allItems.filter((item) => {
    const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "all" || item.impact === filter;
    return matchesQuery && matchesFilter;
  });

  return (
    <div ref={ref} className="relative w-full max-w-2xl mx-auto">
      <div className="glass-card flex items-center gap-3 px-4 py-3 rounded-xl">
        <Search className="h-5 w-5 text-muted-foreground shrink-0" />
        <input
          type="text"
          placeholder="Search sustainable tips, guides, products..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setShowResults(true); }}
          onFocus={() => setShowResults(true)}
          className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
        />
        {query && (
          <button onClick={() => { setQuery(""); setShowResults(false); }}>
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
        <div className="flex items-center gap-1 border-l border-border pl-3">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-transparent text-sm text-muted-foreground outline-none cursor-pointer"
          >
            <option value="all">All</option>
            <option value="low">Low Impact</option>
            <option value="medium">Medium Impact</option>
            <option value="high">High Impact</option>
          </select>
        </div>
      </div>

      <AnimatePresence>
        {showResults && query.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 glass-card rounded-xl overflow-hidden z-50 max-h-80 overflow-y-auto"
          >
            {filtered.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">No results found</div>
            ) : (
              filtered.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(`/detail/${item.slug}`);
                    setShowResults(false);
                    setQuery("");
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-primary/5 transition-colors border-b border-border last:border-0 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-foreground text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ml-3 ${impactColors[item.impact]}`}>
                    {item.impact}
                  </span>
                </button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveSearchBar;