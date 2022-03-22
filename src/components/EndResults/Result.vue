<template>
  <div class="results">
    <h1>Results</h1>
    <div class="results-actions">
      <user-score :userScore="userScore" />
      <play-again />
    </div>
    <!-- Displays a list of questions and answers indexed starting at 1. -->
    <question-answer
      v-for="(question, index) in questions"
      :key="index"
      :question="decodeHTMLEntities((index + 1).toString() + '. ' + question.question)"
      :correctAnswer="decodeHTMLEntities(question.correct_answer)"
      :userAnswer="userAnswers[index]"
    />
    <play-again />
  </div>
</template>

<script setup>
import QuestionAnswer from "./QuestionAnswer.vue";
import PlayAgain from "./PlayAgain.vue";
import UserScore from "./UserScore.vue";

import { computed } from "vue";
import { useStore } from "vuex";
import { updateHighScore } from "../../utils/api";

const store = useStore();
const questions = computed(() => store.state.questions);
const userScore = computed(() => store.state.userScore);
const userAnswers = computed(() => store.state.userAnswers);
const user = computed(() => store.state.user);

// If the user does not have a high score or if the users current score is bigger than their high score,
// Update their high score.
if (!user.value.highScore || userScore.value > user.value.highScore) {
  const updatedUser = updateHighScore(user.value.id, userScore.value);
}

/**
 * Changes the HTML entities (i.e. #quot;) to normal text.
 */
const decodeHTMLEntities = (text) => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
};
</script>

<style scoped>
.results {
  width: 90%;
  margin: 10px auto;
}
.results-actions {
  display: flex;
  justify-content: space-between;
}
</style>
