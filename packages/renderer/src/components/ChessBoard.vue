<script lang="ts" setup>
import type { Api as ChessgroundBoard } from "chessground/api";
import type { Color as ChessgroundColor } from "chessground/types";
import { Chessground } from "chessground/chessground";
import type { PropType } from "vue";
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  fen: {
    type: String,
    required: true,
  },
  orientation: {
    type: Object as PropType<ChessgroundColor>,
    required: true,
  },
});
const emit = defineEmits(["update:fen"]);

const chessBoardDiv = ref<HTMLElement>();

let chessBoard: ChessgroundBoard | null = null;
function initializeBoard(): void {
  const chessBoardElement = chessBoardDiv.value;

  if (chessBoardElement) {
    chessBoard = Chessground(chessBoardElement, {
      fen: props.fen,
      orientation: props.orientation,
      coordinates: false,
    });
    chessBoard.set({
      events: {
        move: handleChessBoardMove,
      },
    });
  } else {
    throw new ReferenceError("Chess board div undefined");
  }
}

function handleChessBoardMove(): void {
  if (chessBoard) {
    emit("update:fen", chessBoard.getFen());
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
