import { Prisma, PrismaClient } from "@prisma/client";
import { Item, ItemUpdateInputSchema } from "~/schema";
import cors from "cors";
import express from "express";

const PORT = 8080;
const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// GET All Items
app.get<Item[]>("/items", async (_req, res, next) => {
  try {
    const items = await prisma.item.findMany();
    res.json(items);
  } catch (error) {
    next(error);
  }
});

// POST Create Item
app.post<Item>("/items", async (req, res, next) => {
  try {
    const item = await prisma.item.create({ data: req.body });
    res.json(item);
  } catch (error) {
    next(error);
  }
});

// PUT Update Item
app.put<Item>("/items/:id", async (req, res, next) => {
  const { id } = req.params;

  const parseResult = ItemUpdateInputSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({ errors: parseResult.error.flatten() });
  }
  try {
    const item = await prisma.item.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(item);
  } catch (error) {
    next(error);
  }
});

const errorHandlerMiddleware = (
  error: unknown,
  _req: express.Request,
  res: express.Response
) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      // P2025 is the code for record not found
      return res.status(404).json({ error: "Item not found." });
    }
    if (error.code === "P2026") {
      // P2026 is the code for invalid input
      return res.status(400).json({ error: "Invalid input." });
    }
    return res.status(500).json({ error: "An unexpected error occurred." });
  }
};

app.use(errorHandlerMiddleware);

app.listen(PORT, () =>
  console.log(`
🚀 Server ready at: http://localhost:${PORT}`)
);
