"use client";
import { Box, Card, Group, Image, Text } from "@mantine/core";
import classes from "./productsTabs.module.css";

export default function ManageProductTabs() {
  const stats = [
    { value: 447, label: "Remaining" },
    { value: 76, label: "In progress" },
  ];

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text>{stat.value}</Text>
      <Text size="xs" c="dimmed">
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <Card
          className={classes.glass}
          key={index}
          padding={10}
          withBorder
          orientation="horizontal"
          radius={12}
          shadow="sm"
          c="white"
          style={{
            position: "relative",
            overflow: "hidden",
            transition: "all 0.3s ease",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05))",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.25)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          }}
        >
          {/* Glow */}
          <Box
            style={{
              position: "absolute",
              width: 200,
              height: 200,
              background:
                "radial-gradient(circle, rgba(255,255,255,0.15), transparent)",
              top: -50,
              right: -50,
              filter: "blur(40px)",
            }}
          />

          {/* Reflection */}
          <Box
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 12,
              background:
                "linear-gradient(120deg, rgba(255,255,255,0.35), transparent 40%)",
              opacity: 0.4,
              pointerEvents: "none",
            }}
          />

          {/* CONTENT */}
          <Card.Section inheritPadding px="xs" w="40%">
            <Image
              h="100%"
              w={150}
              src="/TestImage.jpg"
              alt="logo"
              radius="md"
            />
          </Card.Section>

          <Card.Section inheritPadding px="md" w="60%">
            <Text fz="xl">Guo Jia {index + 1}</Text>

            <Box mt="xs">
              <Text>1887</Text>
              <Text fz="xs" c="dimmed">
                Completed
              </Text>
            </Box>

            <Group mt="sm">{items}</Group>
          </Card.Section>
        </Card>
      ))}
    </>
  );
}
