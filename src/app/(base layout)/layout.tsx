"use client";
import { marketGAService } from "@/api/services";
import classes from "./layout.module.css";
import { Footer, Navbar } from "@/components";
import { AppShell, Container } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useEffect } from "react";
import { errorNotification } from "@/utils";
import useBoundStore from "@/store";
import ShowLoadingModal from "@/utils/swal";
// import { GuardToken } from '@/contexts';
// import useBoundStore from '@/store';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { width } = useViewportSize();
  const isMobile = width <= 768;
  const { loading, setDataGroup, setLoading } =
    useBoundStore().generalStoreData;

  async function getGroupProductGA() {
    setLoading(true);
    try {
      const response = await marketGAService.getGroupsByCategoryId(74);

      if (response) {
        setDataGroup(response);
      }
    } catch (error) {
      errorNotification(error);
    }
  }

  useEffect(() => {
    getGroupProductGA();
  }, []);
  return (
    // <GuardToken>
    // <ErrorBoundary>
    <AppShell
      header={{ height: isMobile ? 50 : 100 }}
      classNames={{
        header: classes.header,
        main: classes.main,
      }}
    >
      <Navbar />
      <AppShell.Main
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <ShowLoadingModal isLoading={loading} />
        <Container
          fluid
          w={"100%"}
          h={"100%"}
          size="xs"
          px={0}
          pb={40}
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            // backgroundColor: "#FCFDFF",
          }}
        >
          {children}
        </Container>
        <Footer />
      </AppShell.Main>
    </AppShell>
    //   </ErrorBoundary>
    // </GuardToken>
  );
}
