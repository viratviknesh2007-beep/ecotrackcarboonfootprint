import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Award, Moon, Sun, Trash2, Shield, TreePine } from "lucide-react";
import ConfirmDialog from "@/components/ConfirmDialog";

const badges = [
  { name: "Eco Beginner", icon: "🌱", earned: true, desc: "Completed onboarding" },
  { name: "Green Warrior", icon: "⚔️", earned: false, desc: "Score above 70" },
  { name: "Climate Hero", icon: "🦸", earned: false, desc: "Score above 90" },
  { name: "Plastic Free", icon: "♻️", earned: false, desc: "Complete plastic challenge" },
  { name: "Tree Planter", icon: "🌳", earned: true, desc: "Offset first ton of CO₂" },
  { name: "Solar Pioneer", icon: "☀️", earned: false, desc: "Switch to renewable energy" },
];

const Profile: React.FC = () => {
  const [dark, setDark] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [user, setUser] = useState({ name: "Eco Explorer", email: "" });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("ecotrack_user") || "{}");
    if (data.name) setUser(data);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  const resetData = () => {
    localStorage.removeItem("ecotrack_user");
    localStorage.removeItem("ecotrack_onboarded");
    setConfirmReset(false);
    window.location.href = "/onboarding";
  };

  const score = (() => {
    const u = JSON.parse(localStorage.getItem("ecotrack_user") || "{}");
    let s = 50;
    if (u.transport === "bike" || u.transport === "walk") s += 20;
    else if (u.transport === "public" || u.transport === "ev") s += 10;
    else s -= 10;
    if (u.food === "vegan") s += 15;
    else if (u.food === "vegetarian") s += 10;
    if (u.electricity === "low") s += 10;
    else if (u.electricity === "high") s -= 10;
    return Math.max(0, Math.min(100, s));
  })();

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-2xl">
        <div className="glass-card rounded-2xl p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">{user.name}</h1>
              <p className="text-sm text-muted-foreground">{user.email || "eco@explorer.com"}</p>
            </div>
          </div>

          {/* Score */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20 mb-6">
            <Shield className="h-10 w-10 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Sustainability Score</p>
              <p className="text-3xl font-display font-bold text-foreground">{score}<span className="text-lg text-muted-foreground">/100</span></p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <TreePine className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">{Math.ceil((100 - score) * 0.8)} trees to offset</span>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="glass-card rounded-2xl p-8 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Award className="h-5 w-5 text-primary" />
            <h2 className="font-display font-semibold text-foreground">Achievements</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {badges.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`p-4 rounded-xl text-center transition-all ${
                  b.earned ? "bg-primary/10 border border-primary/20" : "bg-muted/30 border border-border opacity-50"
                }`}
              >
                <span className="text-3xl">{b.icon}</span>
                <p className="text-xs font-medium text-foreground mt-2">{b.name}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="glass-card rounded-2xl p-8">
          <h2 className="font-display font-semibold text-foreground mb-6">Settings</h2>
          <div className="space-y-4">
            <button onClick={toggleTheme} className="w-full flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                {dark ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
                <span className="text-sm font-medium text-foreground">Theme</span>
              </div>
              <span className="text-sm text-muted-foreground">{dark ? "Dark" : "Light"}</span>
            </button>
            <button onClick={() => setConfirmReset(true)} className="w-full flex items-center gap-3 p-4 rounded-xl bg-destructive/5 hover:bg-destructive/10 transition-colors text-destructive">
              <Trash2 className="h-5 w-5" />
              <span className="text-sm font-medium">Reset Demo Data</span>
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmReset}
        title="Reset All Data"
        message="This will clear all your demo data and redirect you to onboarding. Are you sure?"
        onConfirm={resetData}
        onCancel={() => setConfirmReset(false)}
      />
    </div>
  );
};

export default Profile;