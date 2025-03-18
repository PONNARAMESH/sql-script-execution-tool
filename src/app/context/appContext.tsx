import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  /** Your theme override here */
});

export default function GlobalContext({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MantineProvider
      // defaultColorScheme="dark"
      theme={theme}
    >
      {/* Your app here */}
      {children}
    </MantineProvider>
  );
}
