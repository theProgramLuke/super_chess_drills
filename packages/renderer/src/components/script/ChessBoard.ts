import { Vue } from "vue-class-component";
import { Chessground } from "chessground";
import { ref } from "vue";

export default class ChessBoard extends Vue {
  chessBoardDiv = ref<HTMLElement>();

  public mounted(): void {
    console.log(this.chessBoardDiv);
    if (this.chessBoardDiv as any | undefined) {
      Chessground(this.chessBoardDiv as any, {
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        orientation: "white",
        coordinates: false,
      });
    } else {
      throw new ReferenceError("Chess board div undefined");
    }
  }
}
