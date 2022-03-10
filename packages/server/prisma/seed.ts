import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";

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
  await Promise.all(
    Array.from(generateUsers(10), (user) => prisma.user.create({ data: user }))
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
