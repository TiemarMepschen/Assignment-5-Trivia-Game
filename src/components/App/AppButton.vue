<template>
  <button class="app-button">{{ buttonText }}</button>
</template>

<script setup>
const props = defineProps({
  buttonText: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.app-button {
  font-size: 100%;
  font-family: inherit;
  background-color: #54428e;
  color: white;
  border-radius: 5px;
  padding: 10px;
}
</style>
