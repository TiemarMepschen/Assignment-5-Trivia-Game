<template>
  <h1>{{ question }}</h1>
</template>

<script setup>
const props = defineProps({
  question: {
    type: String,
    required: true,
  },
});
</script>

<style></style>
