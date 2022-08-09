import { PieceType } from "../components/Chessboard/ChessBoard";

export default class Referee {
  isValidMove(
    px: number,
    py: number,
    currX: number,
    currY: number,
    type: PieceType
  ) {
    console.log("Referee checking the move: ");
    console.log(
      "Previous Location: ",
      px,
      ", ",
      py,
      ": Current Location: ",
      currX,
      ", ",
      currY,
      ": Piece Type: ",
      type.
    );
    return true;
  }
}
