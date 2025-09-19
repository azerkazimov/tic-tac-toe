import { FaRegCircle } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";

export const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [data, setData] = useState(Array(9).fill(""));
  const [history, setHistory] = useState([]);
  const [title, setTitle] = useState("Tic Tac Toe");
  const [isComputerTurn, setIsComputerTurn] = useState(false);

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const toggle = (num) => {
    if (lock || data[num] !== "" || isComputerTurn) {
      return;
    }
    const newData = [...data];
    const newHistory = [...history, num];

    if (newHistory.length > 5) {
      const firstMove = newHistory.shift();
      newData[firstMove] = "";
    }

    // Player is always 'x' (count % 2 === 0), computer is always 'o'
    newData[num] = count % 2 === 0 ? "x" : "o";
    setData(newData);
    setHistory(newHistory);
    setCount(count + 1);

    const winner = checkWinner(newData);
    if (winner) {
      won(winner);
    } else if (count % 2 === 0) {
      // If it was player's turn (x), now it's computer's turn
      setIsComputerTurn(true);
      setTimeout(() => {
        computerMove(newData, newHistory);
      }, 500);
    }
  };

  const computerMove = (current, history) => {
    const emptyCells = current
      .map((cell, index) => (cell === "" ? index : null))
      .filter((cell) => cell !== null);

    if (emptyCells.length === 0) {
      setIsComputerTurn(false);
      return;
    }

    const bestMove = minimax(current, "o").index;
    const newData = [...current];
    const newHistory = [...history, bestMove];

    if (newHistory.length > 5) {
      const firstMove = newHistory.shift();
      newData[firstMove] = "";
    }

    newData[bestMove] = "o";
    setData(newData);
    setHistory(newHistory);
    setCount(prevCount => prevCount + 1);
    setIsComputerTurn(false);

    const winner = checkWinner(newData);
    if (winner) {
      won(winner);
    }
  };

  const minimax = (board, player) => {
    const winner = checkWinner(board);
    if (winner === "o") return { score: 1 };
    if (winner === "x") return { score: -1 };
    if (board.every((cell) => cell !== "")) return { score: 0 };

    const moves = [];

    board.forEach((cell, index) => {
      if (cell === "") {
        const newBoard = [...board];
        newBoard[index] = player;
        const result = minimax(newBoard, player === "o" ? "x" : "o");
        moves.push({ index, score: result.score });
      }
    });
    return player === "o"
      ? moves.reduce((best, move) => (move.score > best.score ? move : best), {
          score: -Infinity,
        })
      : moves.reduce((best, move) => (move.score < best.score ? move : best), {
          score: Infinity,
        });
  };

  const won = (winner) => {
    setLock(true);
    if (winner === "x") {
      setTitle(
        <p className="flex gap-3">
          <span>Congratulations:</span> <RxCross1 className="neon-blue" />
        </p>
      );
    } else {
      setTitle(
        <p className="flex gap-3">
          <span>Congratulations:</span> <FaRegCircle className="neon-red" />
        </p>
      );
    }
  };

  const resetGame = () => {
    setData(Array(9).fill(""));
    setCount(0);
    setLock(false);
    setHistory([]);
    setTitle("Tic Tac Toe");
    setIsComputerTurn(false);
  };

  return (
    <div className="tic-tac-toe container w-full flex flex-col items-center justify-center gap-5 p-4">
      <h1 className="title text-6xl">{title}</h1>
      <div className="board flex">
        <div className="row">
          <div className="boxes" onClick={() => toggle(0)}>
            {data[0] === "x" && <RxCross1 className="neon-blue" />}
            {data[0] === "o" && <FaRegCircle className="neon-red" />}
          </div>
          <div className="boxes" onClick={() => toggle(1)}>
            {data[1] === "x" && <RxCross1 className="neon-blue" />}
            {data[1] === "o" && <FaRegCircle className="neon-red" />}
          </div>
          <div className="boxes" onClick={() => toggle(2)}>
            {data[2] === "x" && <RxCross1 className="neon-blue" />}
            {data[2] === "o" && <FaRegCircle className="neon-red" />}
          </div>
        </div>
        <div className="row">
          <div className="boxes" onClick={() => toggle(3)}>
            {data[3] === "x" && <RxCross1 className="neon-blue" />}
            {data[3] === "o" && <FaRegCircle className="neon-red" />}
          </div>
          <div className="boxes" onClick={() => toggle(4)}>
            {data[4] === "x" && <RxCross1 className="neon-blue" />}
            {data[4] === "o" && <FaRegCircle className="neon-red" />}
          </div>
          <div className="boxes" onClick={() => toggle(5)}>
            {data[5] === "x" && <RxCross1 className="neon-blue" />}
            {data[5] === "o" && <FaRegCircle className="neon-red" />}
          </div>
        </div>
        <div className="row">
          <div className="boxes" onClick={() => toggle(6)}>
            {data[6] === "x" && <RxCross1 className="neon-blue" />}
            {data[6] === "o" && <FaRegCircle className="neon-red" />}
          </div>
          <div className="boxes" onClick={() => toggle(7)}>
            {data[7] === "x" && <RxCross1 className="neon-blue" />}
            {data[7] === "o" && <FaRegCircle className="neon-red" />}
          </div>
          <div className="boxes" onClick={() => toggle(8)}>
            {data[8] === "x" && <RxCross1 className="neon-blue" />}
            {data[8] === "o" && <FaRegCircle className="neon-red" />}
          </div>
        </div>
      </div>
      <button
        className="circle_black w-full md:w-1/3 text-2xl reset py-3 px-4 rounded-lg  text-white shadow-inner"
        onClick={resetGame}
      >
        <p>Reset</p>
      </button>
    </div>
  );
};
