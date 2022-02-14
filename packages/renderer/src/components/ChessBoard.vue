<script lang="ts" setup>
import type { Api as ChessgroundBoard } from "chessground/api";
import type { Color } from "chessground/types";
import { Chessground } from "chessground/chessground";
import type { PropType } from "vue";
import { ref, onMounted, watch } from "vue";
import * as _ from "lodash";

const props = defineProps({
  fen: {
    type: String,
    required: true,
  },
  orientation: {
    type: Object as PropType<Color>,
    required: true,
  },
});
const emit = defineEmits(["update:fen"]);

const chessBoardDiv = ref<HTMLElement>();

function initializeBoard(): void {
  const chessBoardElement = chessBoardDiv.value;

  if (chessBoardElement) {
    const chessBoard = Chessground(chessBoardElement, {
      fen: props.fen,
      orientation: "white",
      coordinates: false,
    });
    chessBoard.set({
      events: {
        move: _.partial(handleChessBoardMove, chessBoard),
      },
    });
  } else {
    throw new ReferenceError("Chess board div undefined");
  }
}

function handleChessBoardMove(chessBoard: ChessgroundBoard): void {
  emit("update:fen", chessBoard.getFen());
}

watch(() => props.fen, initializeBoard);

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
