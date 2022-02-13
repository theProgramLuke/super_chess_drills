<script lang="ts" setup>
import { Chessground } from "chessground/chessground";
import { ref, defineProps, onMounted, watch } from "vue";

const props = defineProps({
  fen: {
    required: true,
    type: String,
  },
});

const chessBoardDiv = ref<HTMLElement>();

onMounted(() => {
  initializeBoard();
});

watch(() => props.fen, initializeBoard);

function initializeBoard() {
  const chessBoardElement = chessBoardDiv.value;

  if (chessBoardElement) {
    Chessground(chessBoardElement, {
      fen: props.fen,
      orientation: "white",
      coordinates: false,
    });
  } else {
    throw new ReferenceError("Chess board div undefined");
  }
}
</script>

<template lang="pug">
// Hack for @testing-library/vue instead of src=
include template/ChessBoard.pug
</template>

<style lang="sass" src="/@/components/style/ChessBoard.sass" />
