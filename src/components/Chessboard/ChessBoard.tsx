import React, { useRef, useState } from "react";
import Tile from "../Tile/Tile";
import "./Chessboard.css";
import Referee from "../../referee/Referee";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Piece {
  image: string;
  x: number;
  y: number;
  type: PieceType;
}

export enum PieceType {
  PAWN,
  BISHOP,
  ROOK,
  KNIGHT,
  QUEEN,
  KING,
}

const pieces: Piece[] = [];

const initialBoardState: Piece[] = [];

//other pieces rendering:
for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "b" : "w";
  const y = p === 0 ? 7 : 0;
  initialBoardState.push({
    image: `./assets/rook_${type}.png`,
    x: 0,
    y: y,
    type: PieceType.ROOK,
  });
  initialBoardState.push({
    image: `./assets/knight_${type}.png`,
    x: 1,
    y: y,
    type: PieceType.KNIGHT,
  });
  initialBoardState.push({
    image: `./assets/bishop_${type}.png`,
    x: 2,
    y: y,
    type: PieceType.BISHOP,
  });
  initialBoardState.push({
    image: `./assets/queen_${type}.png`,
    x: 3,
    y: y,
    type: PieceType.QUEEN,
  });
  initialBoardState.push({
    image: `./assets/king_${type}.png`,
    x: 4,
    y: y,
    type: PieceType.KING,
  });
  initialBoardState.push({
    image: `./assets/bishop_${type}.png`,
    x: 5,
    y: y,
    type: PieceType.BISHOP,
  });
  initialBoardState.push({
    image: `./assets/knight_${type}.png`,
    x: 6,
    y: y,
    type: PieceType.KNIGHT,
  });
  initialBoardState.push({
    image: `./assets/rook_${type}.png`,
    x: 7,
    y: y,
    type: PieceType.ROOK,
  });
}

//pawns rendering:
for (let i = 0; i < horizontalAxis.length; i++) {
  initialBoardState.push({
    image: "./assets/pawn_b.png",
    x: i,
    y: 6,
    type: PieceType.PAWN,
  });
  initialBoardState.push({
    image: "./assets/pawn_w.png",
    x: i,
    y: 1,
    type: PieceType.PAWN,
  });
}

export default function ChessBoard() {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const chessboardRef = useRef<HTMLDivElement>(null);
  const referee = new Referee();

  function grabPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const element = e.target as HTMLElement;
    const cBoard = chessboardRef.current;
    if (element.classList.contains("chess-piece") && cBoard) {
      setGridX(Math.floor((e.clientX - cBoard.offsetLeft) / 80));
      setGridY(Math.abs(Math.ceil((e.clientY - cBoard.offsetTop - 640) / 80)));

      const x = e.clientX - 35;
      const y = e.clientY - 35;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      setActivePiece(element);
    }
  }

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
    const cBoard = chessboardRef.current;
    if (activePiece && cBoard) {
      //setting the piece in reference to the board including size of board and size of board tiles.
      const x = Math.floor((e.clientX - cBoard.offsetLeft) / 80);
      const y = Math.abs(Math.ceil((e.clientY - cBoard.offsetTop - 640) / 80));

      //updates the piece position
      setPieces((value) => {
        const pieces = value.map((p) => {
          if (p.x === gridX && p.y === gridY) {
            referee.isValidMove(gridX, gridY, x, y, p.type);
            p.x = x;
            p.y = y;
          }
          return p;
        });
        return pieces;
      });
      setActivePiece(null);
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
