<template>
  <div class="button-group">
    <app-button button-text="Try Again" @click="tryAgain" />
    <app-button button-text="New Game" @click="goToStart" />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import store from "../../utils/store";
import AppButton from "../App/AppButton.vue";

const router = useRouter();

/**
 * Resets the state to the try again state, gets new questions and redirects the user to those questions.
 */
const tryAgain = () => {
  store.commit("tryAgainState");
  store.dispatch("getQuestions", store.state.apiUrl);
  router.push("/questions");
};

/**
 * Resets the state back to the original and brings the user back to the start screen.
 */
const goToStart = () => {
  store.commit("resetState");
  router.push("/");
};
</script>

<style scoped>
.button-group {
  align-self: center;
}

.button-group > button:first-child {
  margin-right: 10px;
}
</style>
