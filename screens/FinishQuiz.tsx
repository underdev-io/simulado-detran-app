import { Box, Button, Heading, Text } from "native-base";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FinishQuizScreen = ({ route, navigation }: any) => {
  const { correctAnswers, wrongAnswers, duration } = route.params;
  const isApproved = correctAnswers >= 21;

  const DURATION_IN_MINS = 60;
  const DURATION_IN_SECONDS = DURATION_IN_MINS * 60;

  const durationDiff = DURATION_IN_SECONDS - duration;

  const minutes = Math.floor(durationDiff / 60);
  const seconds = Number(durationDiff - minutes * 60);

  const time = `${minutes >= 10 ? minutes : `0${minutes}`}:${
    seconds >= 10 ? seconds : `0${seconds}`
  }`;
  useEffect(() => {
    const callback = async () => {
      const data = {
        time,
        correctAnswers,
        wrongAnswers,
        isApproved,
        date: new Date(),
      };

      const rankingAsString = await AsyncStorage.getItem(
        "@SimuladoDetran_Ranking"
      );
      const ranking = rankingAsString ? JSON.parse(rankingAsString) : [];
      const rankingUpdated = [...ranking, data];
      await AsyncStorage.setItem(
        "@SimuladoDetran_Ranking",
        JSON.stringify(rankingUpdated)
      );
    };

    callback();
  }, []);

  return (
    <Box backgroundColor="white" flex="1" justifyContent={"center"} px={10}>
      {isApproved && (
        <Box
          display="flex"
          flexDirection={"row"}
          alignItems={"center"}
          background="transparent"
          borderWidth={"2px"}
          borderColor="primary.500"
          padding={5}
          borderRadius={10}
          mt={5}
          mb={5}
        >
          <AntDesign name="Trophy" size={52} color="#14d1b9" />
          <Box flexShrink={1} ml={4}>
            <Heading color="primary.500">Parabéns!</Heading>
            <Text color="primary.900">Você foi aprovado com</Text>
            <Text color="primary.500" fontWeight={"bold"}>
              {correctAnswers} respostas corretas.
            </Text>
          </Box>
        </Box>
      )}
      {!isApproved && (
        <Box
          display="flex"
          flexDirection={"row"}
          alignItems={"center"}
          background="transparent"
          borderWidth={"2px"}
          borderColor="danger.300"
          padding={5}
          borderRadius={10}
          mt={5}
          mb={5}
        >
          <MaterialCommunityIcons
            name="emoticon-sad-outline"
            size={52}
            color="#ef4444"
          />

          <Box flexShrink={1} ml={4}>
            <Heading color="red.500">Ops...</Heading>

            <Text color="red.500" mt={2}>
              Faltaram{" "}
              <Text fontWeight={"bold"}>{21 - correctAnswers} respostas</Text>{" "}
              para você ser aprovado(a).
            </Text>
          </Box>
        </Box>
      )}
      <Box background={"green.50"} padding={3} borderRadius={10}>
        <Text>Respostas corretas</Text>
        <Heading>{correctAnswers}</Heading>
      </Box>
      <Box background={"red.50"} padding={3} borderRadius={10} mt={5}>
        <Text>Respostas erradas</Text>
        <Heading>{wrongAnswers}</Heading>
      </Box>
      <Box background={"trueGray.100"} padding={3} borderRadius={10} mt={5}>
        <Text>Tempo de prova</Text>
        <Heading>{time}</Heading>
      </Box>
      <Button
        width="100%"
        onPress={() => {
          navigation.push("Quiz");
        }}
        mt={5}
      >
        REFAZER
      </Button>
      <Button
        width="100%"
        variant={"link"}
        onPress={() => {
          navigation.push("Home");
        }}
        mt={3}
      >
        SAIR
      </Button>
    </Box>
  );
};

export default FinishQuizScreen;
