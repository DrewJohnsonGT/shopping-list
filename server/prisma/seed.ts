import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const ITEMS: Prisma.ItemCreateInput[] = [
  {
    name: "Tomatoes",
    description: "The little green ones",
    quantity: 5,
    checked: false,
  },
  {
    name: "Potatoes",
    description: "The little red ones",
    quantity: 10,
    checked: false,
  },
  {
    name: "Carrots",
    description: "The little orange ones",
    quantity: 15,
    checked: false,
  },
  {
    name: "Cucumbers",
    description: "The little green ones",
    quantity: 20,
    checked: true,
  },
];

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
