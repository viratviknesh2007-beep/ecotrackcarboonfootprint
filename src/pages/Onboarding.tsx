import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, User, Zap, Target, Eye, EyeOff } from "lucide-react";
import PasswordStrengthMeter from "@/components/PasswordStrengthMeter";

const steps = ["Account", "Lifestyle", "Goals"];

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const [form, setForm] = useState({
    name: "", email: "", password: "", age: "", location: "",
    transport: "car", electricity: "medium", food: "mixed",
    goals: [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!form.name.trim()) e.name = "Name is required";
      if (!form.email.includes("@")) e.email = "Valid email required";
      if (form.password.length < 6) e.password = "Min 6 characters";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    if (step < 2) setStep(step + 1);
    else {
      localStorage.setItem("ecotrack_user", JSON.stringify(form));
      localStorage.setItem("ecotrack_onboarded", "true");
      navigate("/dashboard");
    }
  };

  const toggleGoal = (g: string) => {
    setForm((f) => ({
      ...f,
      goals: f.goals.includes(g) ? f.goals.filter((x) => x !== g) : [...f.goals, g],
    }));
  };

  const goalOptions = [
    "Reduce Carbon by 20%", "Go Plastic-Free", "Switch to Renewable Energy",
    "Plant 50 Trees", "Zero Waste Kitchen", "Use Public Transport",
  ];

  const icons = [User, Zap, Target];
  const StepIcon = icons[step];

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20 pb-10">
      <div className="w-full max-w-md">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div className={`flex items-center gap-2 text-sm font-medium ${i <= step ? "text-primary" : "text-muted-foreground"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {i + 1}
                </div>
                <span className="hidden sm:inline">{s}</span>
              </div>
              {i < 2 && <div className={`flex-1 h-0.5 rounded ${i < step ? "bg-primary" : "bg-muted"}`} />}
            </React.Fragment>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="glass-card rounded-2xl p-8"
          >
            <StepIcon className="h-8 w-8 text-primary mb-4" />
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              {step === 0 && "Create Your Account"}
              {step === 1 && "Your Lifestyle"}
              {step === 2 && "Sustainability Goals"}
            </h2>

            {step === 0 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Full Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full mt-1 px-4 py-2.5 rounded-lg bg-muted/50 border border-border text-foreground outline-none focus:ring-2 focus:ring-primary/30" />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full mt-1 px-4 py-2.5 rounded-lg bg-muted/50 border border-border text-foreground outline-none focus:ring-2 focus:ring-primary/30" />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Password</label>
                  <div className="relative">
                    <input type={showPw ? "text" : "password"} value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="w-full mt-1 px-4 py-2.5 rounded-lg bg-muted/50 border border-border text-foreground outline-none focus:ring-2 focus:ring-primary/30 pr-10" />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 text-muted-foreground">
                      {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <PasswordStrengthMeter password={form.password} />
                  {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
                  <button type="button" onClick={() => setShowForgot(true)} className="text-xs text-primary mt-2 hover:underline">
                    Forgot Password?
                  </button>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Primary Transport</label>
                  <select value={form.transport} onChange={(e) => setForm({ ...form, transport: e.target.value })}
                    className="w-full mt-1 px-4 py-2.5 rounded-lg bg-muted/50 border border-border text-foreground outline-none">
                    <option value="car">🚗 Car</option>
                    <option value="public">🚌 Public Transit</option>
                    <option value="bike">🚲 Bicycle</option>
                    <option value="walk">🚶 Walking</option>
                    <option value="ev">⚡ Electric Vehicle</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Electricity Usage</label>
                  <select value={form.electricity} onChange={(e) => setForm({ ...form, electricity: e.target.value })}
                    className="w-full mt-1 px-4 py-2.5 rounded-lg bg-muted/50 border border-border text-foreground outline-none">
                    <option value="low">Low (< 200 kWh/mo)</option>
                    <option value="medium">Medium (200-500 kWh/mo)</option>
                    <option value="high">High (> 500 kWh/mo)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Diet Type</label>
                  <select value={form.food} onChange={(e) => setForm({ ...form, food: e.target.value })}
                    className="w-full mt-1 px-4 py-2.5 rounded-lg bg-muted/50 border border-border text-foreground outline-none">
                    <option value="meat">🥩 Meat-Heavy</option>
                    <option value="mixed">🍽️ Mixed</option>
                    <option value="vegetarian">🥦 Vegetarian</option>
                    <option value="vegan">🌱 Vegan</option>
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-2 gap-3">
                {goalOptions.map((g) => (
                  <button
                    key={g}
                    onClick={() => toggleGoal(g)}
                    className={`p-3 rounded-xl text-sm text-left transition-all border ${
                      form.goals.includes(g)
                        ? "border-primary bg-primary/10 text-primary font-medium"
                        : "border-border bg-muted/30 text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            )}

            <div className="flex justify-between mt-8">
              {step > 0 ? (
                <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              ) : <div />}
              <button onClick={next} className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
                {step === 2 ? "Complete Setup" : "Continue"} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Forgot Password Modal */}
        {showForgot && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/30 backdrop-blur-sm" onClick={() => setShowForgot(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="glass-card p-6 rounded-2xl max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <h3 className="font-display font-bold text-foreground mb-2">Reset Password</h3>
              <p className="text-sm text-muted-foreground mb-4">Enter your email and we'll send a reset link.</p>
              <input type="email" placeholder="your@email.com" className="w-full px-4 py-2.5 rounded-lg bg-muted/50 border border-border text-foreground outline-none mb-4" />
              <div className="flex gap-3 justify-end">
                <button onClick={() => setShowForgot(false)} className="text-sm text-muted-foreground">Cancel</button>
                <button onClick={() => { setShowForgot(false); alert("Reset link sent! (demo)"); }} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium">
                  Send Reset Link
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;