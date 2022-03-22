import { createRouter, createWebHistory } from "vue-router";
import StartScreen from "../views/StartScreen.vue";
import QuestionScreen from "../views/QuestionScreen.vue";
import ResultScreen from "../views/ResultScreen.vue";

const routes = [
  {
    path: "/",
    component: StartScreen,
  },
  {
    path: "/questions",
    component: QuestionScreen,
  },
  {
    path: "/results",
    component: ResultScreen,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
