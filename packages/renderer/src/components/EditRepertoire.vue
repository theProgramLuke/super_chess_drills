<script lang="ts" setup>
import { ref } from "vue";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ChessBoard from "/@/components/ChessBoard.vue";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fen = ref("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
</script>

<template lang="pug">
q-card
  q-card-section
    | Edit {{ fen }}

chess-board(v-model:fen="fen")
</template>
