<template>
  <div @click.self.prevent="redirectToQuestions(form)" class="div-body">
    <form class="form">
      <base-input label="Enter your username:" v-model="form.userName" />
      <base-select
        label="Select category:"
        :options="categories"
        v-model="form.category"
      />
      <base-select
        label="Select difficulty:"
        :options="difficulties"
        v-model="form.difficulty"
      />
      <base-input
        label="Number of questions:"
        type="number"
        v-model="form.numberOfQuestions"
      />
      <app-button
        button-text="Start Game"
        @click.prevent="redirectToQuestions(form)"
      />
    </form>
  </div>
</template>

<script setup>
import BaseInput from "./BaseInput.vue";
import BaseSelect from "./BaseSelect.vue";
import AppButton from "../App/AppButton.vue";
import { getCategories, getUser, registerUserName } from "../../utils/api";
import { ref, onBeforeMount, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const form = ref({
  userName: "",
  category: "any",
  difficulty: "any",
  numberOfQuestions: "1",
});
const categories = ref([]);
const difficulties = [{ name: "Easy" }, { name: "Medium" }, { name: "Hard" }];
onBeforeMount(async () => (categories.value = await getCategories()));

/**
 * Builds the URL necessary to communicate with the API based on the user input.
 */
const getFormattedApiUrl = (amount, category, difficulty) => {
  let baseApiUrl = `https://opentdb.com/api.php?amount=${amount}`;
  if (category !== "any") {
    baseApiUrl += `&category=${category}`;
  }
  if (difficulty !== "any") {
    baseApiUrl += `&difficulty=${difficulty}`;
  }

  return baseApiUrl;
};

/**
 * Gets the questions from the Open Trivia Database and redirects to the QuestionScreen.
 * @param {Object} form - An object representing the user input.
 */
const redirectToQuestions = async (form) => {
  // Check if the username and number of questions fields aren't empty.
  if (form.userName && form.numberOfQuestions) {
    const user = await getUser(form.userName);
    const apiUrl = getFormattedApiUrl(
      form.numberOfQuestions,
      form.category,
      form.difficulty
    );

    store.commit("setApiUrl", apiUrl);

    // If the user exists, then add them to the state, if not, register them.
    if (user) {
      store.commit("setUser", user);
    } else {
      const newUser = await registerUserName(form.userName);
      store.commit("setUser", newUser);
    }

    // Go to the next question.
    store
      .dispatch("getQuestions", apiUrl)
      .then(() => router.push("/questions"));
  }
};
</script>

<style>
.form {
  padding: 20px;
  color: white;
  border-radius: 20px;
  background-color: #688b58;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.form > .app-button {
  width: 100%;
  margin: 0;
}

.div-body {
  height: 100vh;
  top: 0;
  left: 0;
  position: relative;
}
</style>
