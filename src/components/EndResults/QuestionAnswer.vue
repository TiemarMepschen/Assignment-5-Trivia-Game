<template>
  <div class="result">
    <h1>{{ question }}</h1>
    <h4>Correct answer: {{ correctAnswer }}</h4>
    <h4>Your answer: {{ userAnswer }}</h4>
  </div>
</template>

<script setup>
const props = defineProps({
  question: {
    type: String,
    required: true,
  },
  userAnswer: {
    type: String,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.result {
  background-color: #688b58;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 20px;
}
</style>
