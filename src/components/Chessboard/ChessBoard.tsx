import React, { useRef } from "react";
import Tile from "../Tile/Tile";
import "./Chessboard.css";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Piece {
  image: string;
  x: number;
  y: number;
}

const pieces: Piece[] = [];

//other pieces rendering:
for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "b" : "w";
  const y = p === 0 ? 7 : 0;
  pieces.push({ image: `./assets/rook_${type}.png`, x: 0, y: y });
  pieces.push({ image: `./assets/knight_${type}.png`, x: 1, y: y });
  pieces.push({ image: `./assets/bishop_${type}.png`, x: 2, y: y });
  pieces.push({ image: `./assets/queen_${type}.png`, x: 3, y: y });
  pieces.push({ image: `./assets/king_${type}.png`, x: 4, y: y });
  pieces.push({ image: `./assets/bishop_${type}.png`, x: 5, y: y });
  pieces.push({ image: `./assets/knight_${type}.png`, x: 6, y: y });
  pieces.push({ image: `./assets/rook_${type}.png`, x: 7, y: y });
}

//pawns rendering:
for (let i = 0; i < horizontalAxis.length; i++) {
  pieces.push({ image: "./assets/pawn_b.png", x: i, y: 6 });
  pieces.push({ image: "./assets/pawn_w.png", x: i, y: 1 });
}

export default function ChessBoard() {
  const chessboardRef = useRef<HTMLDivElement>(null);

  function grabPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const element = e.target as HTMLElement;
    if (element.classList.contains("chess-piece")) {
      console.log(element);

      const x = e.clientX - 35;
      const y = e.clientY - 35;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      activePiece = element;
    }
  }

  let activePiece: HTMLElement | null = null;

  function movePiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft - 15;
      const minY = chessboard.offsetTop - 5;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 55;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 60;
      const x = e.clientX - 35;
      const y = e.clientY - 35;

      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      } else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      } else {
        activePiece.style.left = `${x}px`;
      }

      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      } else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      } else {
        activePiece.style.top = `${y}px`;
      }
    }
  }

  function dropPiece(e: React.MouseEvent) {
    if (activePiece) {
      activePiece = null;
    }
  }

  let board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      let image = undefined;

      //putting the pieces on the tiles of the board:
      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });

      //if there is no piece there, just render the tile without a piece on it:
      board.push(<Tile key={`${j},${i}`} image={image} number={i + j} />);
    }
  }
  return (
    <div
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => grabPiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      id="chessboard"
      ref={chessboardRef}
    >
      {board}
    </div>
  );
}
