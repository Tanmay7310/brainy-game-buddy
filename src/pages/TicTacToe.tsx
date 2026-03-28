import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Bot, User } from "lucide-react";

type Cell = "X" | "O" | null;
type Winner = "X" | "O" | "draw" | null;

const WINNING_LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

const checkWinner = (board: Cell[]): { winner: Winner; line: number[] | null } => {
  for (const l of WINNING_LINES) {
    const [a,b,c] = l;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: l };
    }
  }
  if (board.every(c => c !== null)) return { winner: "draw", line: null };
  return { winner: null, line: null };
};

// Minimax AI
const minimax = (board: Cell[], isMaximizing: boolean): number => {
  const { winner } = checkWinner(board);
  if (winner === "O") return 10;
  if (winner === "X") return -10;
  if (winner === "draw") return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = "O";
        best = Math.max(best, minimax(board, false));
        board[i] = null;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = "X";
        best = Math.min(best, minimax(board, true));
        board[i] = null;
      }
    }
    return best;
  }
};

const getAIMove = (board: Cell[]): number => {
  let bestScore = -Infinity;
  let bestMove = -1;
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = "O";
      const score = minimax(board, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
};

const TicTacToe = () => {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [result, setResult] = useState<{ winner: Winner; line: number[] | null }>({ winner: null, line: null });
  const [scores, setScores] = useState({ player: 0, ai: 0, draws: 0 });

  const handleClick = useCallback((index: number) => {
    if (board[index] || !isPlayerTurn || result.winner) return;
    const newBoard = [...board];
    newBoard[index] = "X";
    const check = checkWinner(newBoard);
    setBoard(newBoard);
    setResult(check);
    if (check.winner === "X") {
      setScores(s => ({ ...s, player: s.player + 1 }));
    } else if (!check.winner) {
      setIsPlayerTurn(false);
    }
  }, [board, isPlayerTurn, result.winner]);

  // AI move
  useEffect(() => {
    if (isPlayerTurn || result.winner) return;
    const timer = setTimeout(() => {
      const newBoard = [...board];
      const move = getAIMove(newBoard);
      if (move === -1) return;
      newBoard[move] = "O";
      const check = checkWinner(newBoard);
      setBoard(newBoard);
      setResult(check);
      if (check.winner === "O") {
        setScores(s => ({ ...s, ai: s.ai + 1 }));
      } else if (check.winner === "draw") {
        setScores(s => ({ ...s, draws: s.draws + 1 }));
      }
      setIsPlayerTurn(true);
    }, 400);
    return () => clearTimeout(timer);
  }, [isPlayerTurn, result.winner, board]);

  const reset = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setResult({ winner: null, line: null });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <h1 className="font-display text-lg font-bold">Tic-Tac-Toe</h1>
          <button onClick={reset} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </header>

      {/* Game */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        {/* Scores */}
        <div className="flex items-center gap-8 mb-8">
          <div className="text-center">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
              <User className="w-3.5 h-3.5" /> You
            </div>
            <span className="font-display text-2xl font-bold">{scores.player}</span>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Draw</div>
            <span className="font-display text-2xl font-bold text-muted-foreground">{scores.draws}</span>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
              <Bot className="w-3.5 h-3.5" /> AI
            </div>
            <span className="font-display text-2xl font-bold">{scores.ai}</span>
          </div>
        </div>

        {/* Status */}
        <div className="mb-6 h-8 flex items-center">
          {result.winner === "X" && <span className="text-primary font-semibold animate-scale-in">🎉 You win!</span>}
          {result.winner === "O" && <span className="text-destructive font-semibold animate-scale-in">AI wins! Try again.</span>}
          {result.winner === "draw" && <span className="text-muted-foreground font-semibold animate-scale-in">It's a draw!</span>}
          {!result.winner && (
            <span className="text-sm text-muted-foreground">
              {isPlayerTurn ? "Your turn (X)" : "AI is thinking..."}
            </span>
          )}
        </div>

        {/* Board */}
        <div className="grid grid-cols-3 gap-2.5 mb-8">
          {board.map((cell, i) => {
            const isWinCell = result.line?.includes(i);
            return (
              <button
                key={i}
                onClick={() => handleClick(i)}
                disabled={!!cell || !isPlayerTurn || !!result.winner}
                className={`w-24 h-24 sm:w-28 sm:h-28 rounded-xl font-display text-3xl font-bold transition-all duration-200
                  ${!cell && isPlayerTurn && !result.winner ? "hover:bg-primary/10 cursor-pointer" : ""}
                  ${isWinCell ? "bg-primary/20 border-primary" : "glass-card"}
                  ${cell === "X" ? "text-primary" : "text-neon-purple"}
                `}
              >
                {cell && (
                  <span className="animate-scale-in inline-block">{cell}</span>
                )}
              </button>
            );
          })}
        </div>

        {result.winner && (
          <button
            onClick={reset}
            className="bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-lg hover:brightness-110 transition-all animate-fade-in"
          >
            Play Again
          </button>
        )}
      </main>
    </div>
  );
};

export default TicTacToe;
