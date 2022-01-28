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
  Image,
  extendTheme,
} from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/elements";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Illustration2 from "./assets/undraw_no_data_re_kwbl.svg";
import * as StoreReview from "expo-store-review";
import { Linking } from "react-native";
import QuizScreen from "./screens/Quiz";
import FinishQuiz from "./screens/FinishQuiz";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format, parseJSON } from "date-fns";

const Illustration = require("./assets/icon.png");

const HomeScreen = ({ navigation }: any) => {
  return (
    <Box flex="1" alignItems="center" justifyContent="center" px={10}>
      <StatusBar style="auto" />
      <Box width="100%" borderRadius={10} overflow={"hidden"} height={240}>
        <Image
          source={Illustration}
          resizeMode="cover"
          width="100%"
          height="100%"
          alt="Ilustração de pessoa sentada no veículo"
        />
      </Box>
      <Heading mt={3}>Simulado Prova CNH</Heading>
      <Text textAlign={"center"} fontSize="sm" mt={2}>
        Conteúdo atualizado para 2022. Preparado(a)?
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
          Linking.openURL("market://details?id=googoo.android.btgps");
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
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const callback = async () => {
      const rankingAsString = await AsyncStorage.getItem(
        "@SimuladoDetran_Ranking"
      );
      const rankingAsObject = rankingAsString
        ? JSON.parse(rankingAsString)
        : [];
      const rankingOrdered = rankingAsObject.sort((a: any, b: any) => {
        const aDate = parseJSON(a.date);
        const bDate = parseJSON(b.date);

        return +bDate - +aDate;
      });
      const rankingSliced = rankingOrdered.slice(0, 10);

      setRankings(rankingSliced);
    };

    callback();
  }, []);
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
                <Text fontWeight="bold">
                  {format(parseJSON(ranking.date), "dd/MM/yy HH:mm")}
                </Text>
              </Column>
              <Column>
                <Text color={ranking.isApproved ? "green.700" : "red.700"}>
                  {ranking.correctAnswers}/30
                </Text>
              </Column>
              <Column>
                <Text>{ranking.time}</Text>
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
              headerTitle: "Resultado Final",
              title: "Resultado Final",
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
