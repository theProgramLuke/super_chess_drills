import { describe, expect, test } from "vitest";
import type { RenderResult } from "@testing-library/vue";
import { render } from "@testing-library/vue";

// import ChessBoard from "../src/components/ChessBoard.vue";
import ChessBoard from "../src/components/ChessBoard.vue";

describe("ChessBoard", () => {
  test("WHEN render THEN populates board", () => {
    const { container } = renderBoard();

    const board = container.querySelector("cg-board");
    expect(board).toBeDefined();
  });

  test("WHEN render THEN fen populated on board", async () => {
    const { container } = renderBoard(startingBoardFen);

    const actualWhitePieces = container.querySelectorAll("piece.white");
    const actualBlackPieces = container.querySelectorAll("piece.black");
    expect(actualWhitePieces.length).toBe(16);
    expect(actualBlackPieces.length).toBe(16);
  });

  test("WHEN updated fen prop THEN new fen populated on board", async () => {
    const { container, rerender } = renderBoard(emptyBoardFen);

    await rerender({ fen: startingBoardFen });

    const actualWhitePieces = container.querySelectorAll("piece.white");
    const actualBlackPieces = container.querySelectorAll("piece.black");
    expect(actualWhitePieces.length).toBe(16);
    expect(actualBlackPieces.length).toBe(16);
  });
});

const emptyBoardFen = "8/8/8/8/8/8/8/8 w - - 0 1";
const startingBoardFen =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

function renderBoard(fen: string = emptyBoardFen): RenderResult {
  return render(ChessBoard, { props: { fen } });
}
