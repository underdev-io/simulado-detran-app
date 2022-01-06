import { StatusBar } from "expo-status-bar";
import { Box, Heading, Text, Button, VStack, Radio } from "native-base";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

const QuizScreen = ({ navigation }: any) => {
  const [value, setValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCorrectOption, setShowCorrectOption] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const DURATION_IN_MINS = 1;
  const DURATION_IN_SECONDS = DURATION_IN_MINS * 10;

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

  const questions = [
    {
      title:
        "Excetuando-se as infrações resultantes do excesso de peso, será sempre responsável pelo pagamento da penalidade de multa o:",
      alternatives: [
        "Condutor do veículo",
        "Passageiro do veículo",
        "Agente da autoridade de trânsito",
        "Proprietário do veículo",
      ],
      correctOption: 4,
    },
    {
      title:
        "Os veículos vermelhos, ilustrados na imagem, estão cometendo a seguinte infração de estacionamento:",
      alternatives: [
        "Fila dupla",
        "Impedindo a movimentação de outro veículo",
        "Afastado da guia da calçada a mais de 1 (um) metro",
        "Em local e horário proibidos especificamente pela sinalização",
      ],
      correctOption: 3,
    },
  ];

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
  };

  const getRadioColor = (index: number) => {
    const target = (index + 1).toString();

    if (showCorrectOption) {
      if (value === target) {
        return isCorrect ? "green.900" : "red.900";
      }

      if (target === question.correctOption.toString()) return "green.900";
    }

    return null;
  };

  return (
    <Box
      backgroundColor="white"
      flex="1"
      alignItems="center"
      justifyContent="center"
      px={10}
    >
      <StatusBar style="auto" />
      <Box
        display="flex"
        flexDirection={"row"}
        justifyContent={"space-between"}
        width={"100%"}
        mb={1}
      >
        <Heading>
          {currentQuestion + 1}/{questions.length}
        </Heading>
        <Heading>
          {minutes >= 10 ? minutes : `0${minutes}`}:
          {seconds >= 10 ? seconds : `0${seconds}`}
        </Heading>
      </Box>
      <Text mt={2}>{question.title}</Text>

      <Box width="100%" mt={2}>
        <Radio.Group
          name="myRadioGroup"
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
          }}
        >
          {question.alternatives.map((alternative, index) => (
            <Radio
              isDisabled={showCorrectOption}
              size="sm"
              _text={{
                color: getRadioColor(index),
              }}
              value={(index + 1).toString()}
              my={1}
              key={index}
            >
              {alternative}
            </Radio>
          ))}
        </Radio.Group>
      </Box>
      <VStack width="100%" space={5} position="absolute" bottom={10}>
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
  );
};

export default QuizScreen;
