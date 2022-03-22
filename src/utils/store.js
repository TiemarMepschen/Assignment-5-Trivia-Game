import { createStore } from "vuex";

const getDefaultState = () => {
  return {
    user: null,
    questions: [],
    currentIndex: 0,
    userScore: 0,
    userAnswers: [],
    apiUrl: "",
  };
};

const store = createStore({
  state: getDefaultState(),
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setQuestions(state, { questions }) {
      state.questions = questions;
    },
    setNextIndex(state) {
      state.currentIndex++;
    },
    setIncrementUserScore(state) {
      state.userScore += 10;
    },
    setUserAnswers(state, userAnswer) {
      state.userAnswers.push(userAnswer);
    },
    setApiUrl(state, url) {
      state.apiUrl = url;
    },
    tryAgainState(state) {
      Object.assign(state, {
        user: state.user,
        questions: state.questions,
        apiUrl: state.apiUrl,
        currentIndex: 0,
        userScore: 0,
        userAnswers: [],
      });
    },
    resetState(state) {
      Object.assign(state, getDefaultState());
    },
  },
  actions: {
    async getQuestions({ commit }, apiUrl) {
      const response = await fetch(apiUrl);
      const data = await response.json();
      commit("setQuestions", { questions: data.results });
    },
  },
});

export default store;
