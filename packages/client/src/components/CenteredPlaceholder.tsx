import { Center } from "@chakra-ui/react";

export const CenteredPlaceholder: React.FC = ({ children }) => (
  <Center h="full" color="gray.500">
    {children}
  </Center>
);
