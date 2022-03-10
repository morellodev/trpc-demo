import { Box, SimpleGrid } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { ContactsList } from "./components/ContactsList";

export const App: React.VFC = () => {
  return (
    <SimpleGrid h="100vh" templateColumns="320px 1fr">
      <Box p="3" overflowY="auto" borderRightWidth="1px">
        <ContactsList />
      </Box>
      <Box overflowY="auto">
        <Outlet />
      </Box>
    </SimpleGrid>
  );
};
