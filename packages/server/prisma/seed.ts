import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";
import { array as A, either as E, taskEither as TE } from "fp-ts";
import { pipe } from "fp-ts/function";

const prisma = new PrismaClient();

interface DataGenerator<A> {
  (count: number): Iterable<A>;
}

const generateUsers: DataGenerator<Prisma.UserCreateInput> = function* (count) {
  for (let i = 0; i < count; i++) {
    yield {
      name: faker.name.findName(),
      avatarUrl: faker.image.avatar(),
      phone: faker.phone.phoneNumber("+393########"),
    };
  }
};

async function main() {
  const effect = pipe(
    generateUsers(10),
    (a) => Array.from(a),
    A.map((u) => TE.tryCatch(() => prisma.user.create({ data: u }), E.toError)),
    A.sequence(TE.ApplicativePar)
  );

  await effect();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
