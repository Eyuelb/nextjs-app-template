import { TypeSafeLocale } from "@/components/common/type-safe-t";
import { Box, Text, Title } from "@mantine/core";

export default function Home() {
  return (
    <Box>
      <Title className="text-center mt-20">
        Welcome to{" "}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: "pink", to: "yellow" }}
        >
          Mantine
        </Text>
        +
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: "blue", to: "green" }}
        >
          TailwindCSS
        </Text>
      </Title>
      <Text
        className="text-center text-gray-700 dark:text-gray-300 max-w-[500px] mx-auto mt-xl"
        ta="center"
        size="lg"
        maw={580}
        mx="auto"
        mt="xl"
        fw={600}
      >
        <TypeSafeLocale tKey="common.header" />
      </Text>
    </Box>
  );
}
