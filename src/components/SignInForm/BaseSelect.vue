<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <select :value="modelValue" @change="updateValue">
      <option value="any">Any</option>
      <option
        v-for="option in options"
        :key="option.id || option.name.toLowerCase()"
        :value="option.id || option.name.toLowerCase()"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => emit("update:modelValue", event.target.value);
</script>

<style></style>
