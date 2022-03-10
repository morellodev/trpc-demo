import { Button, HStack, Textarea } from "@chakra-ui/react";
import { either as E, option as O, string as S, taskEither as TE } from "fp-ts";
import { flow, pipe } from "fp-ts/function";
import { not } from "fp-ts/Predicate";
import { useForm } from "react-hook-form";

interface FormFields {
  text: string;
}

interface Props {
  onMessageSent: (text: string) => Promise<unknown>;
}

export const MessageComposer: React.VFC<Props> = ({ onMessageSent }) => {
  const { formState, register, reset, handleSubmit } = useForm<FormFields>();

  const onSubmit = async (values: FormFields) => {
    const effect = pipe(
      O.fromNullable(values.text),
      O.map(S.trim),
      O.filter(not(S.isEmpty)),
      TE.fromOption(() => new Error("Message cannot be empty")),
      TE.chain((a) => TE.tryCatch(() => onMessageSent(a), E.toError)),
      TE.chainFirst(() => TE.fromIO(() => reset())),
      TE.toUnion
    );

    return effect();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HStack spacing="3">
        <Textarea
          {...register("text", {
            validate: flow(S.trim, not(S.isEmpty)),
          })}
          autoFocus
          variant="outline"
          placeholder="Type your message here"
          resize="none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit(onSubmit)(e);
            }
          }}
        />
        <Button type="submit" isLoading={formState.isSubmitting}>
          Send
        </Button>
      </HStack>
    </form>
  );
};
