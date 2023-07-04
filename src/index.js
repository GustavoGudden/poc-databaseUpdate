const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const { exec } = require("child_process");

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
  generateCsv("pops");
});

app.put("/:pop_id", async (req, res) => {
  const { pop_id } = req.params;
  const { name } = req.body;

  await prisma.pop.update({
    where: { id: pop_id },
    data: { name },
  });

  res.send("deu bom confia.");
  generateCsv("pops");
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

const generateCsv = (table) => {
  exec(
    `sqlite3 D:/poc-impacto/poc-dump-generator/prisma/dev.db -csv -separator "," ".mode csv" ".output src/csvs/${table}.csv" "SELECT * FROM ${table};`
  );
};
