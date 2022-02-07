import { Vue } from "vue-class-component";

export default class ExampleComponent extends Vue {
  count = 0;

  increment() {
    this.count += 1;
  }
}
