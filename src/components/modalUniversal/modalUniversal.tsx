"use client";

import { ModalUniversalInterface } from "@/types";
import { Modal } from "@mantine/core";

export default function ModalUniversal({
  opened,
  close,
  title,
  size = "md",
  // radius = 20,
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
      // radius={radius}
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
        content: {
          background: "rgba(30, 30, 30, 0.55)",
          backdropFilter: "blur(30px) saturate(160%)",
          WebkitBackdropFilter: "blur(30px) saturate(160%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 20px 80px rgba(0,0,0,0.6)",
        },

        header: {
          display: title == null ? "none" : "",
          background: "transparent",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          color: "rgba(255,255,255,0.9)",
        },

        body: {
          background: "transparent",
          color: "rgba(255,255,255,0.85)",
          padding: 20,
        },
      }}
    >
      {children}
    </Modal>
  );
}
