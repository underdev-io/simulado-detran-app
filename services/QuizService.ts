import exam1 from "../questions/exam1.json";
import exam2 from "../questions/exam2.json";
import exam3 from "../questions/exam3.json";
import exam4 from "../questions/exam4.json";
import exam5 from "../questions/exam5.json";
import exam6 from "../questions/exam6.json";
import exam7 from "../questions/exam7.json";

const questions: any = [exam1, exam2, exam3, exam4, exam5, exam6, exam7];

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const fetchAll = () => {
  const response = Object.keys(questions)
    .map((key) => {
      return questions[key].questions;
    })
    .reduce((prev, curr) => [...prev, ...curr], [])
    .filter((question: any) => question.alternatives.length > 0);
  shuffleArray(response);

  return response.slice(0, 30);
};

export default {
  fetchAll,
};
