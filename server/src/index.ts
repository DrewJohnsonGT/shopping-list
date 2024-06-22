import { PrismaClient } from "@prisma/client";
import { Item } from "~/schema";
import express from "express";

const PORT = 8080;
const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.post<Item[]>("/items", async (_req, res) => {
  const items = await prisma.item.findMany();
  res.json(items);
});

app.listen(PORT, () =>
  console.log(`
🚀 Server ready at: http://localhost:${PORT}`)
);
