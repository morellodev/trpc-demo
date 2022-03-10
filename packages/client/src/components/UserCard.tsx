import {
  Avatar,
  HStack,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { User } from "@w/server";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import { NavLink } from "react-router-dom";

interface Props {
  user: User;
}

export const UserCard: React.VFC<Props> = ({ user }) => {
  return (
    <LinkBox
      as={HStack}
      px="3"
      py="2"
      spacing="3"
      borderWidth="1px"
      rounded="md"
    >
      <Avatar
        name={pipe(O.fromNullable(user.name), O.toUndefined)}
        src={pipe(O.fromNullable(user.avatarUrl), O.toUndefined)}
      />
      <VStack align="flex-start" spacing="0">
        <LinkOverlay
          as={NavLink}
          to={user.id}
          fontWeight="bold"
          _hover={{ color: "blue.500" }}
          _activeLink={{ color: "blue.500" }}
        >
          {user.name}
        </LinkOverlay>
        <Text color="gray.500" fontSize="sm">
          {user.phone}
        </Text>
      </VStack>
    </LinkBox>
  );
};
