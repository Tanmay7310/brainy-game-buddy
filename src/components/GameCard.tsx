import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface GameCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  difficulty: string;
  href: string;
  available: boolean;
  accentColor?: string;
}

const GameCard = ({ title, description, icon: Icon, difficulty, href, available, accentColor = "primary" }: GameCardProps) => {
  const content = (
    <div className={`glass-card p-6 game-card-hover neon-border group relative overflow-hidden ${!available ? "opacity-50" : "cursor-pointer"}`}>
      {!available && (
        <span className="absolute top-3 right-3 text-xs font-medium bg-secondary px-2.5 py-1 rounded-full text-muted-foreground">
          Coming Soon
        </span>
      )}
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="font-display text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
          {difficulty}
        </span>
        {available && (
          <span className="text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
            Play →
          </span>
        )}
      </div>
    </div>
  );

  if (!available) return content;
  return <Link to={href}>{content}</Link>;
};

export default GameCard;
