import { Box, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { MessageComposer } from "../components/MessageComposer";
import { MessagesList } from "../components/MessagesList";
import { trpc } from "../utils/trpc";

export const Chat: React.VFC = () => {
  const params = useParams<"userId">();
  const queryUtils = trpc.useContext();

  const createMessage = trpc.useMutation("message.create", {
    onSuccess(data) {
      queryUtils.invalidateQueries(["message.byRecipientId", data.recipientId]);
    },
  });

  const handleSendMessage = (text: string) =>
    createMessage.mutateAsync({
      recipientId: params.userId as string,
      text,
    });

  return (
    <Flex direction="column" align="stretch" h="full">
      <Box flexGrow={1} overflowY="auto" p="3">
        {params.userId && <MessagesList recipientId={params.userId} />}
      </Box>
      <Box p="3">
        <MessageComposer onMessageSent={handleSendMessage} />
      </Box>
    </Flex>
  );
};
