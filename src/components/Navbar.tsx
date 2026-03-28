import { Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <Gamepad2 className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
          <span className="font-display text-lg font-bold">
            AI <span className="neon-text">Arena</span>
          </span>
        </Link>
        <a href="#games" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Games
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
