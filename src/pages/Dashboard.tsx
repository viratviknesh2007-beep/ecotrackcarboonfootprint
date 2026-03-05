import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TreePine, Flame, Droplets, Zap, TrendingDown, Award } from "lucide-react";

const getScore = () => {
  const user = JSON.parse(localStorage.getItem("ecotrack_user") || "{}");
  let score = 50;
  if (user.transport === "bike" || user.transport === "walk") score += 20;
  else if (user.transport === "public" || user.transport === "ev") score += 10;
  else score -= 10;
  if (user.food === "vegan") score += 15;
  else if (user.food === "vegetarian") score += 10;
  else if (user.food === "meat") score -= 10;
  if (user.electricity === "low") score += 10;
  else if (user.electricity === "high") score -= 10;
  return Math.max(0, Math.min(100, score));
};

const CircularMeter: React.FC<{ value: number; label: string }> = ({ value, label }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="flex flex-col items-center">
      <svg width="180" height="180" className="-rotate-90">
        <circle cx="90" cy="90" r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth="12" />
        <motion.circle
          cx="90" cy="90" r={radius} fill="none" stroke="hsl(var(--primary))" strokeWidth="12" strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeDasharray={circumference}
        />
      </svg>
      <div className="absolute mt-14">
        <p className="text-4xl font-display font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground text-center">{label}</p>
      </div>
    </div>
  );
};

const challenges = [
  { title: "Meatless Monday", desc: "Skip meat for one full day", done: false },
  { title: "No Car Day", desc: "Use alternative transport today", done: false },
  { title: "Unplug Devices", desc: "Disconnect unused electronics", done: true },
  { title: "Reusable Bottle", desc: "Use only reusable water bottles", done: true },
];

const monthlyData = [
  { month: "Jan", value: 65 }, { month: "Feb", value: 58 }, { month: "Mar", value: 52 },
  { month: "Apr", value: 48 }, { month: "May", value: 42 }, { month: "Jun", value: 38 },
];

const Dashboard: React.FC = () => {
  const [score, setScore] = useState(50);
  const treesNeeded = Math.ceil((100 - score) * 0.8);

  useEffect(() => {
    setScore(getScore());
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-5xl">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">Green Command Center</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Carbon Meter */}
          <div className="glass-card rounded-2xl p-6 flex flex-col items-center relative">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Sustainability Score</h3>
            <CircularMeter value={score} label="/ 100" />
          </div>

          {/* Trees needed */}
          <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center">
            <TreePine className="h-12 w-12 text-primary mb-3 animate-float-slow" />
            <p className="text-4xl font-display font-bold text-foreground">{treesNeeded}</p>
            <p className="text-sm text-muted-foreground text-center">Trees needed to offset your emissions</p>
          </div>

          {/* Stats */}
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Quick Stats</h3>
            {[
              { icon: Flame, label: "CO₂/month", value: `${(100 - score) * 12}kg` },
              { icon: Droplets, label: "Water saved", value: `${score * 5}L` },
              { icon: Zap, label: "Energy score", value: `${score}%` },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <s.icon className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="font-semibold text-foreground">{s.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Chart */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <TrendingDown className="h-5 w-5 text-primary" />
            <h3 className="font-display font-semibold text-foreground">Monthly Carbon Footprint</h3>
          </div>
          <div className="flex items-end gap-4 h-40">
            {monthlyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${d.value}%` }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="w-full bg-primary/80 rounded-t-lg min-h-[4px]"
                />
                <span className="text-xs text-muted-foreground">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Challenges */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Award className="h-5 w-5 text-primary" />
            <h3 className="font-display font-semibold text-foreground">Weekly Eco Challenges</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {challenges.map((c, i) => (
              <div key={i} className={`p-4 rounded-xl border transition-colors ${
                c.done ? "border-primary/30 bg-primary/5" : "border-border bg-muted/20"
              }`}>
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    c.done ? "border-primary bg-primary" : "border-muted-foreground"
                  }`}>
                    {c.done && <span className="text-primary-foreground text-xs">✓</span>}
                  </div>
                  <h4 className="font-medium text-foreground text-sm">{c.title}</h4>
                </div>
                <p className="text-xs text-muted-foreground mt-1 ml-7">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;