import { StatusBar } from "expo-status-bar";
import {
  NativeBaseProvider,
  Box,
  Heading,
  Text,
  Button,
  Image,
} from "native-base";
import Illustration from "./assets/undraw_fast_car_p-4-cu.svg";

export default function App() {
  return (
    <NativeBaseProvider>
      <Box flex="1" alignItems="center" justifyContent="center" px={10}>
        <StatusBar style="auto" />
        <Illustration width="100%" height="30%" />
        <Heading>CNH Simulado Prova</Heading>
        <Text fontSize="sm" mt={4}>
          Preparado para testar seus conhecimentos?
        </Text>
        <Button width="100%" mt={5} size="lg">
          COMEÇAR
        </Button>
        <Button width="100%" mt={4} variant="subtle">
          RANKING
        </Button>
        <Button width="100%" mt={4} variant="subtle">
          AVALIAR APP
        </Button>
      </Box>
    </NativeBaseProvider>
  );
}
