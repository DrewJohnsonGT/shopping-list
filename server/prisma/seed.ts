import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const NUMBER_OF_ITEMS = 25;

const ITEMS: Prisma.ItemCreateInput[] = Array.from(
  { length: NUMBER_OF_ITEMS },
  (_, i) => ({
    name: `Item ${i + 1}`,
    description: `Description for item ${i + 1}`,
    quantity: i + 1,
    checked: i % 2 === 0,
  })
);

async function main() {
  console.log("Start seeding ...");
  for (const item of ITEMS) {
    const user = await prisma.item.create({
      data: item,
    });
    console.log(`Created item with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
