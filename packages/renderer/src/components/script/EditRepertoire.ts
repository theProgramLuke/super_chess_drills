import { Options, Vue } from "vue-class-component";
import ChessBoard from "/@/components/ChessBoard.vue";

@Options({ components: { ChessBoard } })
export default class EditRepertoire extends Vue {}
