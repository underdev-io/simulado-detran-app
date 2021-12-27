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
} from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Illustration from "./assets/undraw_fast_car_p-4-cu.svg";
import Illustration2 from "./assets/undraw_no_data_re_kwbl.svg";
import * as StoreReview from "expo-store-review";

const HomeScreen = ({ navigation }: any) => {
  return (
    <Box
      backgroundColor="white"
      flex="1"
      alignItems="center"
      justifyContent="center"
      px={10}
    >
      <StatusBar style="auto" />
      <Illustration width="100%" height="30%" />
      <Heading>CNH Simulado Prova</Heading>
      <Text fontSize="sm" mt={4}>
        Preparado para testar seus conhecimentos?
      </Text>
      <Button
        width="100%"
        mt={5}
        size="lg"
        onPress={() => navigation.navigate("Quiz")}
      >
        COMEÇAR
      </Button>
      <Button
        width="100%"
        mt={4}
        variant="subtle"
        onPress={() => navigation.navigate("Ranking")}
      >
        RANKING
      </Button>
      <Button
        width="100%"
        mt={4}
        variant="subtle"
        onPress={async () => {
          if (await StoreReview.hasAction()) {
            StoreReview.requestReview();
          }
        }}
      >
        AVALIAR APP
      </Button>
    </Box>
  );
};

const QuizScreen = ({ navigation }: any) => {
  return (
    <Box
      backgroundColor="white"
      flex="1"
      alignItems="center"
      justifyContent="center"
      px={10}
    >
      <StatusBar style="auto" />
      <Heading>QUIZ</Heading>
      <Button
        width="100%"
        mt={5}
        size="lg"
        onPress={() => navigation.navigate("Home")}
      >
        DESISTIR
      </Button>
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
  return (
    <NativeBaseProvider>
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
            name="Ranking"
            options={{ headerShown: true, headerBackTitle: "Voltar" }}
            component={RankingScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
