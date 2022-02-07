import { Options, Vue } from "vue-class-component";
import ExampleComponent from "/@/components/ExampleComponent.vue";

@Options({ components: { ExampleComponent } })
export default class App extends Vue {}
