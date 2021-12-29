import { Box, Text } from "native-base";

const FinishQuizScreen = ({ route }: any) => {
  const { correctAnswers, wrongAnswers } = route.params;

  return (
    <Box
      backgroundColor="white"
      flex="1"
      alignItems="center"
      justifyContent="center"
      px={10}
    >
      <Text>
        correto: {correctAnswers} errado: {wrongAnswers}
      </Text>
    </Box>
  );
};

export default FinishQuizScreen;
