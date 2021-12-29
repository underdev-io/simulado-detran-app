import { StatusBar } from "expo-status-bar";
import {
  NativeBaseProvider,
  Box,
  Heading,
  Text,
  Button,
  Row,
  Column,
  VStack,
  Radio,
  extendTheme,
} from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Illustration from "./assets/undraw_fast_car_p-4-cu.svg";
import Illustration2 from "./assets/undraw_no_data_re_kwbl.svg";
import * as StoreReview from "expo-store-review";
import { useState } from "react";
import { Linking } from "react-native";

const QuizScreen = ({ navigation }: any) => {
  const [value, setValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCorrectOption, setShowCorrectOption] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

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
      console.log(`total certo: ${correctAnswers}`);
      console.log(`total errado: ${wrongAnswers}`);
    }
  };

  const getRadioColor = (index: number) => {
    const target = (index + 1).toString();

    if (showCorrectOption) {
      if (value === target) {
        return isCorrect ? "green.500" : "red.500";
      }

      if (target === question.correctOption.toString()) return "green.500";
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
        <Heading>00:30:00</Heading>
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
          onPress={() => navigation.navigate("Home")}
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
