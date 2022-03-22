<template>
  <div class="question-card">
    <h1>Question {{ currentIndex + 1 }}:</h1>
    <question 
      :question="decodeHTMLEntities(questions[currentIndex].question)"
    />
    <div class="question-card-answers">
      <app-button
        v-for="(answer, index) in shuffle([
        // Get the correct and incorrect answers into an array.
          questions[currentIndex].correct_answer, 
          ...questions[currentIndex].incorrect_answers,
          // Decode all the elements of the array.
        ].map((a) => decodeHTMLEntities(a)))"
        :key="index"
        :button-text="answer"
        @click="goToNextQuestion(answer)"
      />
    </div>
  </div>
</template>

<script setup>
import Question from "./Question.vue";
import { ref, computed } from "vue";
import AppButton from "../App/AppButton.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const currentIndex = computed(() => store.state.currentIndex);
const questions = computed(() => store.state.questions);
const userAnswers = computed(() => store.state.userAnswers);

/**
 * Saves the user answer, redirects the user to the next question, or
 * if there are no more questions, redirects the user to the result screen.
 */
const goToNextQuestion = (userAnswer) => {
  let currentQuestion = questions.value[currentIndex.value];
  store.commit("setUserAnswers", userAnswer);
  if (isUserAnswerCorrect(userAnswer)) {
    store.commit("setIncrementUserScore");
  }
  if (currentIndex.value >= questions.value.length - 1) {
    router.push("/results");
  } else {
    store.commit("setNextIndex");
  }
};

/**
 * Checks the user answer against the correct answer.
 * @param {String} userAnswer - The answer the user clicked.
 */
const isUserAnswerCorrect = (userAnswer) => {
  let currentQuestion = questions.value[currentIndex.value];
  return userAnswer === currentQuestion.correct_answer;
};

/**
 * Shuffles the answers randomly or returns True & False in case of a boolean question.
 */
const shuffle = (array) => {
  // If the array is of size two and includes True and False, then return True and False.
  if (array.length === 2 && array.includes("True") && array.includes("False")) {
    return ["True", "False"];
  }

  let index = array.length;
  while (index != 0) {
    let randomIndex = Math.floor(Math.random() * index);
    index--;

    [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
  }

  return array;
};

/**
 * Changes the HTML entities (i.e. #quot;) to normal text.
 */
const decodeHTMLEntities = (text) => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
};
</script>

<style>
.question-card {
  background-color: #688b58;
  padding: 40px;
  border-radius: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.question-card-answers {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
</style>
