import { AppShell, Flex, Text, ActionIcon } from "@mantine/core";
import {
  IconBrandDiscordFilled,
  IconBrandFacebookFilled,
  IconBrandInstagram,
  IconMail,
} from "@tabler/icons-react";
import { useViewportSize } from "@mantine/hooks";

export function Footer() {
  const { width } = useViewportSize();
  const isMobile = width <= 768;
  return (
    <>
      <AppShell.Footer
        style={{
          marginTop: "auto", // Pushes the footer to the bottom of the container
          width: "100%",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01)), rgba(0,0,0,0.8)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          color: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Flex
          direction={isMobile ? "column" : "row"}
          justify={"space-between"}
          align={"center"}
          w={"100%"}
          py={5}
        >
          <Text size="xs">©2026 Fenri Mintardja - Play Card</Text>
          <Flex>
            <ActionIcon bg={"black"}>
              <IconBrandDiscordFilled size={15} scale={2.5} />
            </ActionIcon>
            <ActionIcon bg={"black"}>
              <IconBrandFacebookFilled size={15} scale={2.5} />
            </ActionIcon>
            <ActionIcon bg={"black"}>
              <IconBrandInstagram size={15} scale={2.5} />
            </ActionIcon>
            <ActionIcon bg={"black"}>
              <IconMail size={15} scale={2.5} />
            </ActionIcon>
          </Flex>
        </Flex>
      </AppShell.Footer>
    </>
  );
}
