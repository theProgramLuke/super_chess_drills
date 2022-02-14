<script lang="ts" setup>
import { ref } from "vue";
import type { Color as ChessgroundColor } from "chessground/types";

/* eslint-disable @typescript-eslint/no-unused-vars */
import ChessBoard from "/@/components/ChessBoard.vue";

const fen = ref("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
const orientation = ref<ChessgroundColor>("white");

function toggleOrientation(): void {
  if (orientation.value == "white") {
    orientation.value = "black";
  } else {
    orientation.value = "white";
  }
}
/* eslint-enable @typescript-eslint/no-unused-vars */
</script>

<template lang="pug">
q-card
  q-card-section
    | Edit {{ fen }}

q-btn(@click="toggleOrientation") Toggle orientation
chess-board(v-model:fen="fen", v-model:orientation="orientation")
</template>
