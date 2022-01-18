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
import { HeaderBackButton } from "@react-navigation/elements";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Illustration from "./assets/undraw_fast_car_p-4-cu.svg";
import Illustration2 from "./assets/undraw_no_data_re_kwbl.svg";
import * as StoreReview from "expo-store-review";
import { useState } from "react";
import { Linking } from "react-native";
import QuizScreen from "./screens/Quiz";
import FinishQuiz from "./screens/FinishQuiz";
import { Button as RNButton } from "react-native";
/**
 * TODOs:
 *
 * 1) Perguntas com imagem não aparecem
 * 4) Calcular a diferença do tempo da prova com o tempo final
 * 5) Cadastrar mais perguntas
 * 7) Botão back do Android tem que acionar o botão de Encerrar
 * 8) Título no Android do Finish Quiz está errado
 * 9) Persistir na tela final para o LocalStorage de Ranking
 * 10) Incluir AdMob
 * */

const HomeScreen = ({ navigation }: any) => {
  return (
    <Box flex="1" alignItems="center" justifyContent="center" px={10}>
      <StatusBar style="auto" />
      <Illustration width="100%" height="30%" />
      <Heading>Simulado CNH DETRAN</Heading>
      <Text textAlign={"center"} fontSize="sm" mt={2}>
        Preparado para testar seus conhecimentos?
      </Text>
      <Button
        width="100%"
        mt={5}
        size="lg"
        onPress={() => navigation.push("Quiz")}
      >
        COMEÇAR
      </Button>
      <Button
        width="100%"
        size="lg"
        mt={4}
        variant="subtle"
        onPress={() => navigation.navigate("Ranking")}
      >
        RANKING
      </Button>
      <Button
        width="100%"
        size="sm"
        mt={2}
        variant="link"
        onPress={async () => {
          if (await StoreReview.hasAction()) {
            StoreReview.requestReview();
          }
        }}
      >
        AVALIAR APP
      </Button>
      <Text
        onPress={() => {
          try {
            Linking.openURL("https://underdev.io");
          } catch (e) {}
        }}
        fontSize={"xs"}
        mt={5}
        position={"absolute"}
        bottom={10}
      >
        Criado por{" "}
        <Text fontWeight={"bold"} color={"primary"}>
          Underdev Ⓒ
        </Text>{" "}
        2022
      </Text>
    </Box>
  );
};

const RankingScreen = ({ navigation }: any) => {
  const rankings: any = [];

  return (
    <Box backgroundColor="white" flex="1" px={10}>
      <StatusBar style="auto" />
      {rankings.length === 0 && (
        <Box flex={1} justifyContent={"center"} alignItems={"center"}>
          <Illustration2 width="100%" height="25%" />
          <Text mt={5}>Não há pessoas no ranking ainda.</Text>
        </Box>
      )}
      {rankings.length > 0 && (
        <VStack mt={5} space={2}>
          {rankings.map((ranking: any) => (
            <Row
              borderBottomWidth={1}
              borderBottomColor="black"
              paddingBottom={2}
              justifyContent="space-between"
            >
              <Column>
                <Text fontWeight="bold">{ranking.name}</Text>
              </Column>
              <Column>
                <Text>{ranking.score}/30</Text>
              </Column>
              <Column>
                <Text>{ranking.duration}</Text>
              </Column>
            </Row>
          ))}
        </VStack>
      )}
    </Box>
  );
};

const Stack = createNativeStackNavigator();

export default function App() {
  const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: "#dafffb",
        100: "#b1f9f1",
        200: "#86f5e6",
        300: "#58efdc",
        400: "#2eebd2",
        500: "#14d1b9",
        600: "#02a390",
        700: "#007567",
        800: "#00473e",
        900: "#001916",
      },
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="Quiz"
            options={{ headerShown: false }}
            component={QuizScreen}
          />
          <Stack.Screen
            name="FinishQuiz"
            options={({ navigation }) => ({
              headerShown: true,
              headerBackTitle: "Voltar",
              headerTitle: "Resultado",
              headerLeft: () => (
                <HeaderBackButton
                  label="Voltar"
                  labelVisible
                  onPress={() => navigation.navigate("Home")}
                />
              ),
            })}
            component={FinishQuiz}
          />
          <Stack.Screen
            name="Ranking"
            options={{ headerShown: true, headerBackTitle: "Voltar" }}
            component={RankingScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
