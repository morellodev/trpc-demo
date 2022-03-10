import { ChakraProvider } from "@chakra-ui/react";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import superjson from "superjson";
import { App } from "./App";
import { Blank } from "./routes/blank";
import { Chat } from "./routes/chat";
import { trpc } from "./utils/trpc";

const queryClient = new QueryClient();

const trpcClient = trpc.createClient({
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === "development" ||
        (opts.direction === "down" && opts.result instanceof Error),
    }),
    httpBatchLink({
      url: "http://localhost:8080/trpc",
    }),
  ],
  transformer: superjson,
});

ReactDOM.render(
  <React.StrictMode>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />}>
                <Route path=":userId" element={<Chat />} />
                <Route index element={<Blank />} />
              </Route>
            </Routes>
          </BrowserRouter>
          {/* <ReactQueryDevtools /> */}
        </ChakraProvider>
      </QueryClientProvider>
    </trpc.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
