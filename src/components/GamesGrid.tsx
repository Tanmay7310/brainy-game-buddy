import { Grid3X3, Crown, CircleDot, Sword, Puzzle, Dice1 } from "lucide-react";
import GameCard from "./GameCard";

const games = [
  {
    title: "Tic-Tac-Toe",
    description: "The classic 3×3 grid battle. Simple to learn, tricky to master against AI.",
    icon: Grid3X3,
    difficulty: "Easy",
    href: "/tic-tac-toe",
    available: true,
  },
  {
    title: "Chess",
    description: "The ultimate strategy game. Test your tactical mind against a smart AI.",
    icon: Crown,
    difficulty: "Hard",
    href: "/chess",
    available: false,
  },
  {
    title: "Connect Four",
    description: "Drop your discs and connect four in a row before the AI does.",
    icon: CircleDot,
    difficulty: "Medium",
    href: "/connect-four",
    available: false,
  },
  {
    title: "Reversi",
    description: "Flip your way to victory in this classic strategy board game.",
    icon: Sword,
    difficulty: "Medium",
    href: "/reversi",
    available: false,
  },
  {
    title: "2048",
    description: "Slide and merge tiles to reach the legendary 2048 tile.",
    icon: Puzzle,
    difficulty: "Easy",
    href: "/2048",
    available: false,
  },
  {
    title: "Minesweeper",
    description: "Clear the board without detonating any hidden mines.",
    icon: Dice1,
    difficulty: "Medium",
    href: "/minesweeper",
    available: false,
  },
];

const GamesGrid = () => {
  return (
    <section id="games" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Choose Your <span className="neon-text">Game</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Pick a game and challenge the AI. More games coming soon!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, i) => (
            <div key={game.title} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
              <GameCard {...game} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GamesGrid;
