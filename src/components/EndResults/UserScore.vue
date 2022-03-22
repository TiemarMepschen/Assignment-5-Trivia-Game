<template>
  <h2>Your score: {{ userScore }}</h2>
</template>

<script setup>
const props = defineProps({
  userScore: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped></style>
