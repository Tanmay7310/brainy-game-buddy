import { Gamepad2, Zap, Bot } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8 neon-border animate-fade-in">
          <Bot className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">AI-Powered Opponents</span>
        </div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s", opacity: 0 }}>
          Challenge the{" "}
          <span className="neon-text">Machine</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s", opacity: 0 }}>
          Test your skills against intelligent AI opponents across classic board games. From Tic-Tac-Toe to Chess — can you outsmart the algorithm?
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s", opacity: 0 }}>
          <a href="#games" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-lg transition-all hover:brightness-110 glow-pulse">
            <Gamepad2 className="w-5 h-5" />
            Play Now
          </a>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-primary" /> Free to Play</span>
            <span className="flex items-center gap-1.5"><Bot className="w-4 h-4 text-neon-purple" /> Smart AI</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
