import { HStack, Text } from "@chakra-ui/react";
import { Message } from "@w/server";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface Props {
  message: Message;
}

export const MessageBubble: React.VFC<Props> = ({ message }) => {
  return (
    <HStack
      align="flex-end"
      bg="gray.50"
      px="3"
      py="2"
      spacing="3"
      borderWidth="1px"
      rounded="md"
    >
      <Text flexGrow={1}>{message.text}</Text>
      <Text
        as="time"
        dateTime={message.sentAt.toISOString()}
        flexShrink={0}
        fontSize="sm"
        color="gray.500"
        ml="2"
      >
        {dayjs(message.sentAt).fromNow()}
      </Text>
    </HStack>
  );
};
