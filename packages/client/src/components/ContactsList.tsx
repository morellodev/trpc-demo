import { List, ListItem } from "@chakra-ui/react";
import * as A from "fp-ts/Array";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import { trpc } from "../utils/trpc";
import { UserCard } from "./UserCard";

export const ContactsList: React.VFC = () => {
  const users = trpc.useQuery(["user.all"]);

  return (
    <List spacing="3">
      {pipe(
        users.data,
        O.fromNullable,
        O.map(
          A.map((u) => (
            <ListItem key={u.id}>
              <UserCard user={u} />
            </ListItem>
          ))
        ),
        O.toNullable
      )}
    </List>
  );
};
