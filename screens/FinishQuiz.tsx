import { Box, Button, Heading, Text } from "native-base";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

const FinishQuizScreen = ({ route, navigation }: any) => {
  const { correctAnswers, wrongAnswers } = route.params;
  const isApproved = correctAnswers >= 1;

  return (
    <Box backgroundColor="white" flex="1" justifyContent={"center"} px={10}>
      {isApproved && (
        <Box
          display="flex"
          flexDirection={"row"}
          alignItems={"center"}
          background="green.500"
          padding={5}
          borderRadius={10}
          mt={5}
          mb={5}
        >
          <AntDesign name="Trophy" size={52} color="black" />
          <Box flexShrink={1} ml={4}>
            <Heading>Parabéns!</Heading>
            <Text>
              Você foi aprovado com{" "}
              <Text fontWeight={"bold"}>{correctAnswers} respostas</Text>{" "}
              corretas.
            </Text>
          </Box>
        </Box>
      )}
      {!isApproved && (
        <Box
          display="flex"
          flexDirection={"row"}
          alignItems={"center"}
          background="danger.300"
          padding={5}
          borderRadius={10}
          mt={5}
          mb={5}
        >
          <MaterialCommunityIcons
            name="emoticon-sad-outline"
            size={52}
            color="black"
          />

          <Box flexShrink={1} ml={4}>
            <Heading>Ops...</Heading>

            <Text mt={2}>
              Faltaram{" "}
              <Text fontWeight={"bold"}>{21 - correctAnswers} respostas</Text>{" "}
              para você ser aprovado(a).
            </Text>
          </Box>
        </Box>
      )}
      <Box background={"trueGray.100"} padding={3} borderRadius={10}>
        <Text>Respostas corretas</Text>
        <Heading>{correctAnswers}</Heading>
      </Box>
      <Box background={"trueGray.100"} padding={3} borderRadius={10} mt={5}>
        <Text>Respostas erradas</Text>
        <Heading>{wrongAnswers}</Heading>
      </Box>
      <Box background={"trueGray.100"} padding={3} borderRadius={10} mt={5}>
        <Text>Tempo de prova</Text>
        <Heading>00:15:26</Heading>
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
        variant={"subtle"}
        colorScheme="secondary"
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
