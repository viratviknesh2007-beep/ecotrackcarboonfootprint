import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Check } from "lucide-react";
import plasticWaste from "@/assets/plastic-waste.jpg";
import solarEnergy from "@/assets/solar-energy.jpg";
import composting from "@/assets/composting.jpg";
import ecoProducts from "@/assets/eco-products.jpg";

interface DetailContent {
  title: string;
  heroImage: string;
  intro: string;
  tips: { title: string; desc: string }[];
  comparison?: { left: string; right: string; leftValue: number; rightValue: number; unit: string };
}

const content: Record<string, DetailContent> = {
  "reduce-plastic-waste": {
    title: "How to Reduce Plastic Waste",
    heroImage: plasticWaste,
    intro: "Over 8 million tons of plastic enter our oceans every year. Here's how you can make a real difference by reducing plastic in your daily life.",
    tips: [
      { title: "Carry Reusable Bags", desc: "Keep cloth bags in your car or backpack. A single reusable bag replaces 700 disposable ones over its lifetime." },
      { title: "Ditch Single-Use Bottles", desc: "Invest in a stainless steel or glass water bottle. This alone can prevent 156 plastic bottles per person annually." },
      { title: "Choose Package-Free Products", desc: "Shop at bulk stores. Bring your own containers for grains, nuts, and cleaning supplies." },
      { title: "Say No to Plastic Straws", desc: "Switch to metal, bamboo, or paper straws. Better yet, skip the straw entirely." },
      { title: "Use Beeswax Wraps", desc: "Replace plastic cling wrap with reusable beeswax wraps for food storage." },
      { title: "Support Plastic-Free Brands", desc: "Choose products from companies committed to plastic-free packaging and circular economy." },
    ],
    comparison: { left: "Plastic Lifestyle", right: "Plastic-Free", leftValue: 82, rightValue: 12, unit: "kg plastic/year" },
  },
  "solar-energy-benefits": {
    title: "Solar Energy Benefits",
    heroImage: solarEnergy,
    intro: "Solar energy is one of the most impactful switches you can make. It reduces carbon emissions, lowers electricity bills, and increases energy independence.",
    tips: [
      { title: "Reduce Electricity Bills", desc: "Solar panels can reduce your electricity bill by 50-100% depending on your location and system size." },
      { title: "Low Maintenance", desc: "Solar systems require minimal maintenance — just occasional cleaning and a 25-year warranty on most panels." },
      { title: "Increase Property Value", desc: "Homes with solar panels sell for 4.1% more on average according to Zillow research." },
      { title: "Government Incentives", desc: "Many countries offer tax credits, rebates, and feed-in tariffs for solar installations." },
    ],
    comparison: { left: "Grid Energy", right: "Solar Energy", leftValue: 900, rightValue: 50, unit: "g CO₂/kWh" },
  },
  "composting-guide": {
    title: "Composting Guide",
    heroImage: composting,
    intro: "Composting diverts organic waste from landfills and creates nutrient-rich soil for your garden. It's nature's recycling at its best.",
    tips: [
      { title: "Start with Greens & Browns", desc: "Mix nitrogen-rich greens (food scraps) with carbon-rich browns (dry leaves, cardboard) in a 1:3 ratio." },
      { title: "Keep It Moist", desc: "Your compost should feel like a wrung-out sponge. Too dry and it won't decompose; too wet and it'll smell." },
      { title: "Turn Regularly", desc: "Aerate your compost every 1-2 weeks to speed up decomposition and prevent odors." },
      { title: "Avoid Meat & Dairy", desc: "Stick to plant-based scraps. Meat and dairy attract pests and create bad odors." },
    ],
  },
  "eco-friendly-products": {
    title: "Eco-Friendly Products",
    heroImage: ecoProducts,
    intro: "Small switches in everyday products can make a massive cumulative impact. Here are sustainable alternatives for common items.",
    tips: [
      { title: "Bamboo Toothbrush", desc: "Billions of plastic toothbrushes end up in landfills. Bamboo alternatives are biodegradable." },
      { title: "Metal Straws", desc: "Reusable metal straws eliminate thousands of plastic straws from your lifetime waste." },
      { title: "Cloth Produce Bags", desc: "Replace thin plastic produce bags with washable mesh or cotton alternatives." },
      { title: "Refillable Cleaning Supplies", desc: "Use concentrated refills to reduce plastic bottle waste from cleaning products." },
    ],
  },
};

// Fallback for slugs without specific content
const defaultContent: DetailContent = {
  title: "Sustainable Living Guide",
  heroImage: ecoProducts,
  intro: "Discover practical ways to live more sustainably and reduce your environmental impact.",
  tips: [
    { title: "Start Small", desc: "Pick one area of your life to improve. Small consistent changes beat large unsustainable ones." },
    { title: "Track Your Progress", desc: "Use EcoTrack's dashboard to monitor your improvements over time." },
    { title: "Share Knowledge", desc: "Inspire others by sharing what you've learned about sustainable living." },
  ],
};

const DetailView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = content[slug || ""] || defaultContent;
  const [addedToPlan, setAddedToPlan] = useState<string[]>([]);

  const togglePlan = (tip: string) => {
    setAddedToPlan((prev) =>
      prev.includes(tip) ? prev.filter((t) => t !== tip) : [...prev, tip]
    );
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={data.heroImage} alt={data.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <Link to="/search" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2">
            <ArrowLeft className="h-4 w-4" /> Back to Discovery
          </Link>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">{data.title}</h1>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-6 mt-8">
        <p className="text-muted-foreground text-lg mb-8">{data.intro}</p>

        {/* Comparison Graph */}
        {data.comparison && (
          <div className="glass-card rounded-2xl p-6 mb-8">
            <h3 className="font-display font-semibold text-foreground mb-4">Impact Comparison</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{data.comparison.left}</span>
                  <span className="text-foreground font-medium">{data.comparison.leftValue} {data.comparison.unit}</span>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(data.comparison.leftValue / Math.max(data.comparison.leftValue, data.comparison.rightValue)) * 100}%` }}
                  transition={{ duration: 1 }}
                  className="h-3 bg-destructive/60 rounded-full"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{data.comparison.right}</span>
                  <span className="text-foreground font-medium">{data.comparison.rightValue} {data.comparison.unit}</span>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(data.comparison.rightValue / Math.max(data.comparison.leftValue, data.comparison.rightValue)) * 100}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-3 bg-primary rounded-full"
                />
              </div>
              <p className="text-sm text-primary font-medium mt-2">
                🌿 {Math.round(((data.comparison.leftValue - data.comparison.rightValue) / data.comparison.leftValue) * 100)}% reduction possible!
              </p>
            </div>
          </div>
        )}

        {/* Tips */}
        <h3 className="font-display font-semibold text-foreground mb-4">Actionable Tips</h3>
        <div className="space-y-4">
          {data.tips.map((tip, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-5 flex items-start gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-primary font-bold text-sm">{i + 1}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{tip.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{tip.desc}</p>
              </div>
              <button
                onClick={() => togglePlan(tip.title)}
                className={`shrink-0 p-2 rounded-lg transition-colors ${
                  addedToPlan.includes(tip.title) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10"
                }`}
                title="Add to My Action Plan"
              >
                {addedToPlan.includes(tip.title) ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailView;