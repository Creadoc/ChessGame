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
      board.push(<Tile image={image} number={i + j} />);
    }
  }
  return <div id="chessboard">{board}</div>;
}
