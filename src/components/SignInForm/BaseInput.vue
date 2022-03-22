<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <input
      :type="type"
      :min="getNumericValueForInputElement(1)"
      :max="getNumericValueForInputElement(50)"
      :value="modelValue"
      @input="updateValue"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
    validator(value) {
      return ["text", "number"].includes(value);
    },
  },
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => emit("update:modelValue", event.target.value);

// Only apply a min/max value when the input has a number attribute.
const getNumericValueForInputElement = (number) =>
  props.type === "number" ? number : null;
</script>

<style>
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
}

.form-group select,
.form-group input {
  padding: 5px;
  width: 100%;
  font-family: inherit;
  font-size: 100%;
}
</style>
