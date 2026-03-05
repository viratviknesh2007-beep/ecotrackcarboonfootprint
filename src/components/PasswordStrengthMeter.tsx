import React from "react";

interface PasswordStrengthMeterProps {
  password: string;
}

const getStrength = (pw: string) => {
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
};

const labels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
const colors = [
  "bg-destructive",
  "bg-destructive/70",
  "bg-accent/70",
  "bg-primary/70",
  "bg-primary",
];

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const strength = getStrength(password);
  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i < strength ? colors[strength - 1] : "bg-muted"
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">{labels[strength - 1] || "Too short"}</p>
    </div>
  );
};

export default PasswordStrengthMeter;