import { PrismaClient } from "@prisma/client";
import { Item } from "~/schema";
import cors from "cors";
import express from "express";

const PORT = 8080;
const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get<Item[]>("/items", async (_req, res) => {
  const items = await prisma.item.findMany();
  // res.json(items);
  res.json([]);
});

app.listen(PORT, () =>
  console.log(`
🚀 Server ready at: http://localhost:${PORT}`)
);
