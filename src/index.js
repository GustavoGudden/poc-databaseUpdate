const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const { exec } = require("child_process");

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

// ROTAS
app.post("/cadastrarPop", async (req, res) => {
  const createdPop = await insertPop({
    id: uuidv4(),
    name: "teste",
  });

  res.send(JSON.stringify(createdPop));
  generateCsv("pops");
});

app.post("/update", async (req, res) => {
  const { id, name } = req.body;

  await prisma.pop.update({
    where: { id: id },
    data: { name },
  });
  generateCsv("pops");
  res.send("deu bom confia.");
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
    `sqlite3 D:/poc-impacto/poc-dump-generator/prisma/dev.db -csv -separator "," ".mode csv" ".output src/csvs/pops.csv" "SELECT * FROM ${table};`
  );
};
