import { describe, expect, test } from "vitest";
import { render } from "@testing-library/vue";

import ChessBoard from "../src/components/ChessBoard.vue";

describe("ChessBoard", () => {
  test("WHEN render THEN populates board", () => {
    const { container } = render(ChessBoard);

    const board = container.querySelector("cg-board");

    expect(board).toBeDefined();
  });

  test("WHEN render THEN empty initial board", async () => {
    const { container } = render(ChessBoard);

    const pieces = container.querySelectorAll("piece:not(.ghost)");

    expect(pieces.length).toBe(0);
  });
});
