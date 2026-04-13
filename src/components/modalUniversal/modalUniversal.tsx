"use client";

import { ModalUniversalInterface } from "@/types";
import { Modal } from "@mantine/core";

export default function ModalUniversal({
  opened,
  close,
  title,
  size = "md",
  radius = 20,
  isCentered = true,
  isCloseButton = true,
  children,
  fullScreen = false,
  isCantClose = false,
}: ModalUniversalInterface) {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title={title}
      size={size}
      radius={radius}
      centered={isCentered}
      fullScreen={fullScreen}
      withCloseButton={isCloseButton}
      closeOnClickOutside={!isCantClose}
      closeOnEscape={!isCantClose}
      overlayProps={{
        backgroundOpacity: 0.15,
        blur: 12,
      }}
      styles={{
        header: {
          display: title == null ? "none" : "",
          background: `
            radial-gradient(circle at top left, rgba(255,255,255,0.25), transparent 40%),
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.12),
              rgba(255, 255, 255, 0.03)
            )
          `,

          backdropFilter: "blur(30px) saturate(180%)",
          WebkitBackdropFilter: "blur(30px) saturate(180%)",

          border: "1px solid rgba(255, 255, 255, 0.2)",

          boxShadow: `
            0 10px 40px rgba(0, 0, 0, 0.6),
            inset 0 1px 1px rgba(255, 255, 255, 0.25),
            inset 0 -1px 2px rgba(0, 0, 0, 0.3)
          `,

          color: "white",
        },

        body: {
          background: "black",

          backdropFilter: "blur(30px) saturate(180%)",
          WebkitBackdropFilter: "blur(30px) saturate(180%)",

          border: "1px solid rgba(255, 255, 255, 0.15)",

          boxShadow: `
            0 20px 60px rgba(0, 0, 0, 0.7),
            inset 0 1px 2px rgba(255, 255, 255, 0.2)
          `,
          padding: 10,
          color: "white",
        },
      }}
    >
      {children}
    </Modal>
  );
}
