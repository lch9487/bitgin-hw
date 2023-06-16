import { ApolloProvider } from "@apollo/client";
import { createTheme, ThemeProvider } from "@mui/material";
import { useApollo } from "../apollo/client";

const theme = createTheme();

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}
