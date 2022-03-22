import { createApp } from "vue";
import App from "./App.vue";
import router from "./utils/router";
import store from "./utils/store";

createApp(App).use(router).use(store).mount("#app");
