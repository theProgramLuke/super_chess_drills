<script lang="ts" setup>
import type { Api as ChessgroundBoard } from "chessground/api";
import type {
  Color as ChessgroundColor,
  Dests as ChessgroundDests,
  Key as ChessgroundKey,
} from "chessground/types";
import { Chessground } from "chessground/chessground";
import { Chess } from "chess.js";
import type { Square as ChessJsSquare, Move as ChessJsMove } from "chess.js";
import type { PropType } from "vue";
import { ref, onMounted, watch } from "vue";
import * as _ from "lodash";

const props = defineProps({
  fen: {
    type: String,
    required: true,
  },
  orientation: {
    type: String as PropType<ChessgroundColor>,
    required: true,
  },
});
const emit = defineEmits(["update:fen"]);

const chessBoardDiv = ref<HTMLElement>();

let chessBoard: ChessgroundBoard | null = null;
let chessGame = Chess();
function initializeBoard(): void {
  const chessBoardElement = chessBoardDiv.value;
  chessGame = Chess(props.fen);

  if (chessBoardElement) {
    chessBoard = Chessground(chessBoardElement, {
      fen: chessGame.fen(),
      orientation: props.orientation,
      coordinates: false,
    });
    chessBoard.set({
      events: {
        move: handleChessBoardMove,
      },
    });
    updateBoardMoveablePieces();
  } else {
    throw new ReferenceError("Chess board div undefined");
  }
}

function handleChessBoardMove(
  orig: ChessgroundKey,
  dest: ChessgroundKey,
): void {
  if (chessBoard) {
    if (orig != "a0" && dest != "a0") {
      chessGame.move({ from: orig, to: dest });
    }
    updateBoardMoveablePieces();
    emit("update:fen", chessGame.fen());
  }
}

function updateBoardMoveablePieces(): void {
  if (chessBoard) {
    const dests: ChessgroundDests = new Map();

    _.forEach(chessGame.SQUARES, (square: ChessJsSquare) => {
      const moves = chessGame.moves({
        square: square,
        verbose: true,
      });

      if (!_.isEmpty(moves)) {
        const destsFromSquare: ChessgroundKey[] = _.map(
          moves,
          (move: ChessJsMove) => {
            return move.to;
          },
        );
        dests.set(square, destsFromSquare);
      }
    });

    chessBoard.set({ movable: { free: false, dests } });
  }
}

function updateBoardOrientation(): void {
  if (chessBoard) {
    chessBoard.set({ orientation: props.orientation });
  }
}

watch(() => props.fen, initializeBoard);
watch(() => props.orientation, updateBoardOrientation);

onMounted(() => {
  initializeBoard();
});
</script>

<template lang="pug">
q-card
  q-card-section
    | ChessBoard {{ fen }}

div
  .foo.blue.merida
    .cg-wrap(ref="chessBoardDiv")
</template>

<style lang="sass" src="/@/components/style/ChessBoard.sass" />
