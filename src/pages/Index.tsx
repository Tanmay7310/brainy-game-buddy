import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GamesGrid from "@/components/GamesGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <GamesGrid />
      <footer className="py-10 text-center text-sm text-muted-foreground border-t border-border/50">
        <p>AI Arena — Challenge the Machine</p>
      </footer>
    </div>
  );
};

export default Index;
