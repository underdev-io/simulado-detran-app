import questions from "../questions.json";

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const fetchAll = () => {
  const response = questions.filter(
    (question: any) => question.alternatives.length > 0
  );
  shuffleArray(response);

  return response.slice(0, 30);
};

export default {
  fetchAll,
};
