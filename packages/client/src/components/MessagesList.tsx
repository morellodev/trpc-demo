import { Center, List, ListItem, Spinner } from "@chakra-ui/react";
import * as A from "fp-ts/Array";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import { trpc } from "../utils/trpc";
import { CenteredPlaceholder } from "./CenteredPlaceholder";
import { MessageBubble } from "./MessageBubble";

interface Props {
  recipientId: string;
}

export const MessagesList: React.VFC<Props> = ({ recipientId }) => {
  const messages = trpc.useQuery(["message.byRecipientId", recipientId]);

  return messages.isLoading ? (
    <Center h="full">
      <Spinner color="gray.500" />
    </Center>
  ) : (
    <List h="full" spacing="3">
      {pipe(
        messages.data,
        O.fromNullable,
        O.filter(A.isNonEmpty),
        O.map(
          A.map((m) => (
            <ListItem key={m.id}>
              <MessageBubble message={m} />
            </ListItem>
          ))
        ),
        O.getOrElseW(() => (
          <ListItem h="full">
            <CenteredPlaceholder>No messages yet</CenteredPlaceholder>
          </ListItem>
        ))
      )}
    </List>
  );
};
