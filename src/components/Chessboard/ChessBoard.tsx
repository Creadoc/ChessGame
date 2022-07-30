import React from "react";
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

for (let i = 0; i < verticalAxis.length; i++) {
  pieces.push({ image: "../../assets/pawn_b.png", x: i, y: 6 });
  pieces.push({ image: "../../assets/pawn_w.png", x: i, y: 1 });
}

export default function ChessBoard() {
  let board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      let image = undefined;

      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });

      board.push(
        <Tile
          image="/Users/jimmycollins/Desktop/chessgame/src/components/Chessboard/bishop_b.png"
          number={i + j}
        />
      );
    }
  }
  return <div id="chessboard">{board}</div>;
}
