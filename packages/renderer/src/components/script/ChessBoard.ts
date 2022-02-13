import { Vue } from "vue-class-component";
import { Chessground } from "chessground/chessground";
import { ref } from "vue";

export default class ChessBoard extends Vue {
  chessBoardDiv = ref<HTMLElement>();

  public mounted(): void {
    if (this.chessBoardDiv as any | undefined) {
      Chessground(this.chessBoardDiv as any, {
        fen: "8/8/8/8/8/8/8/8 w - - 0 1",
        orientation: "white",
        coordinates: false,
      });
    } else {
      throw new ReferenceError("Chess board div undefined");
    }
  }
}
