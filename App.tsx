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
} from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Illustration from "./assets/undraw_fast_car_p-4-cu.svg";
import Illustration2 from "./assets/undraw_no_data_re_kwbl.svg";
import * as StoreReview from "expo-store-review";
import { useState } from "react";

/**
 * TODOs:
 *
 * 1) Tela após navegar para a próxima questão (mostrar a alternativa certa, se errou ou não)
 * 2) Tela final (após a última pergunta)
 * 3) Carregar questões dos JSONs
 * 4) Persistir na tela final para o LocalStorage de Ranking
 * 5) Incluir AdMob
 * 6) Contador no Quiz: reduzir a cada segundo
 * 7) Contador no Quiz: ao finalizar o tempo, mandar para a tela final
 * */

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
  const [value, setValue] = useState("one");
  return (
    <Box
      backgroundColor="white"
      flex="1"
      alignItems="center"
      justifyContent="center"
      px={10}
    >
      <StatusBar style="auto" />
      <Heading>00:30:00</Heading>
      <Text mt={2}>
        O condutor, atento, trafegando em uma viz, ve uma placa alertando sobre
        um estreitamento de pista adiante. Ele identifica esta placa como sendo
        de:
      </Text>

      <Box width="100%" mt={2}>
        <Radio.Group
          name="myRadioGroup"
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
          }}
        >
          <Radio size="sm" value="A" my={1}>
            A - Procurar um telefone e chamar o serviço médico especializado
          </Radio>
          <Radio size="sm" value="B" my={1}>
            B - Remover a vítima para o hospital
          </Radio>
          <Radio size="sm" value="C" my={1}>
            C - Não parar para socorrer
          </Radio>
          <Radio size="sm" value="D" my={1}>
            D - Proteger a cabeça e a coluna das vítimas
          </Radio>
          <Radio size="sm" value="E" my={1}>
            E - Remover as vítimas do veículo
          </Radio>
        </Radio.Group>
      </Box>
      <VStack width="100%" space={5} position="absolute" bottom={10}>
        <Button
          width="100%"
          size="lg"
          onPress={() => navigation.navigate("Home")}
        >
          PRÓXIMO
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
