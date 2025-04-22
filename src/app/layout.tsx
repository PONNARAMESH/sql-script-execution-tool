import "@mantine/core/styles.css";

import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import GlobalContext from "../context/appContext";
import { PrivateLayout } from "../components/privateLayout";
import FetchAPIInterceptor from "../components/fetchAPIInterceptor";

export const metadata = {
  title: "Sql script execution tool",
  description:
    "An UI to verify your SQL syntax and execute it on SQL to get the result",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <GlobalContext>
          <FetchAPIInterceptor />
          <PrivateLayout>{children}</PrivateLayout>
        </GlobalContext>
      </body>
    </html>
  );
}
