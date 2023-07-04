const express = require("express");
const { PrismaClient, Prisma } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const { createObjectCsvWriter } = require("csv-writer");

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

// ROTAS
app.post("/", async (req, res) => {
  const { name } = req.body;

  const createdPop = await insertPop({
    id: uuidv4(),
    name,
  });

  res.status(201).send(JSON.stringify(createdPop));
  await generateCsv("pops");
});

app.put("/:pop_id", async (req, res) => {
  const { pop_id } = req.params;
  const { name } = req.body;

  const updatedPop = await prisma.pop.update({
    where: { id: pop_id },
    data: { name },
  });

  res.send(updatedPop);
  await generateCsv("pops");
});

app.listen(3001, () => console.log("rodando na porta 3001"));

// SERVIÇOS
const insertPop = async (pop) => {
  try {
    return await prisma.pop.findUniqueOrThrow({
      where: { id: pop.id },
    });
  } catch (err) {
    const createdPop = await prisma.pop.create({
      data: pop,
    });
    return createdPop;
  }
};

const generateCsv = async (table) => {
  const data = await prisma.$queryRawUnsafe(`SELECT * FROM ${table}`);

  const csvWriter = createObjectCsvWriter({
    path: `src/csvs/${table}.csv`,
    header: Object.keys(data[0]).map((key) => {
      return {
        id: key,
        title: key,
      };
    }),
  });

  await csvWriter.writeRecords(data);
};
