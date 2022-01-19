import { StatusBar } from "expo-status-bar";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Radio,
  Image,
  ScrollView,
} from "native-base";
import { useEffect, useState } from "react";
import { Alert, BackHandler } from "react-native";
import QuizService from "../services/QuizService";
import { SafeAreaView } from "react-native-safe-area-context";

const QuizScreen = ({ navigation }: any) => {
  const [value, setValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCorrectOption, setShowCorrectOption] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [questions] = useState(QuizService.fetchAll());

  // Timer
  const DURATION_IN_MINS = 60;
  const DURATION_IN_SECONDS = DURATION_IN_MINS * 60;

  const [duration, setDuration] = useState(DURATION_IN_SECONDS);

  const timer = () => setDuration(duration - 1);

  useEffect(() => {
    if (duration <= 0) {
      return finishQuiz();
    }

    const id = setInterval(timer, 1000);

    return () => clearInterval(id);
  }, [duration]);

  const minutes = Math.floor(duration / 60);
  const seconds = Number(duration - minutes * 60);

  const finishQuiz = () => {
    navigation.navigate("FinishQuiz", {
      correctAnswers,
      wrongAnswers,
      duration,
    });
  };

  const question = questions[currentQuestion];

  const handleAnswer = () => {
    const isCorrectOption = value === question.correctOption.toString();

    setShowCorrectOption(true);
    setIsCorrect(isCorrectOption);

    if (isCorrectOption) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setWrongAnswers(wrongAnswers + 1);
    }
  };

  const handleNext = () => {
    if (questions.length > currentQuestion + 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowCorrectOption(false);
      setIsCorrect(false);
      setValue("");
    } else {
      finishQuiz();
    }
  };

  const handleFinish = () => {
    Alert.alert(
      "Encerrar simulado",
      "Você tem certeza que deseja encerrar o simulado?",
      [
        {
          text: "Encerrar",
          onPress: () => {
            finishQuiz();
          },
        },
        { text: "Fechar" },
      ]
    );

    return true;
  };

  const getRadioColor = (index: number) => {
    const target = (index + 1).toString();

    if (showCorrectOption) {
      if (value === target) {
        return isCorrect ? "green.700" : "red.700";
      }

      if (target === question.correctOption.toString()) return "green.700";
    }

    return null;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleFinish
    );

    return () => backHandler.remove();
  }, [correctAnswers, wrongAnswers, duration]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1}>
        <Box
          display="flex"
          flexDirection={"row"}
          justifyContent={"space-between"}
          width={"100%"}
          px={10}
          py={5}
        >
          <Heading>
            {currentQuestion + 1}/{questions.length}
          </Heading>
          <Heading>
            {minutes >= 10 ? minutes : `0${minutes}`}:
            {seconds >= 10 ? seconds : `0${seconds}`}
          </Heading>
        </Box>
        <ScrollView mb={5} flex={1}>
          {question.image && (
            <Image
              alt="Imagem da questão"
              width={"100%"}
              height={120}
              resizeMode="contain"
              src={question.image}
            />
          )}
          <Text px={10} mt={2} alignSelf={"flex-start"} fontSize={19}>
            {question.title}
          </Text>

          <Radio.Group
            name="alternatives"
            value={value}
            onChange={(nextValue) => {
              setValue(nextValue);
            }}
            px={10}
          >
            {question.alternatives.map((alternative: string, index: number) => (
              <Radio
                isDisabled={showCorrectOption}
                size="sm"
                _text={{
                  fontSize: 17,
                  color: getRadioColor(index),
                }}
                value={(index + 1).toString()}
                my={1}
                key={index}
                display={"flex"}
              >
                {alternative}
              </Radio>
            ))}
          </Radio.Group>
        </ScrollView>
        <VStack px={10} pb={5} width="100%" space={5}>
          <Button
            isDisabled={value === ""}
            width="100%"
            size="lg"
            onPress={showCorrectOption ? handleNext : handleAnswer}
          >
            {showCorrectOption ? "PRÓXIMA" : "RESPONDER"}
          </Button>
          <Button
            width="100%"
            size="lg"
            onPress={handleFinish}
            colorScheme="secondary"
            variant="subtle"
          >
            ENCERRAR
          </Button>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default QuizScreen;
