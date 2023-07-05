const express = require("express");
const { DumpController } = require("./controllers/dumpController");

const app = express();
app.use(express.json());

const dumpController = new DumpController();

app.post("/", dumpController.handleCreatePop);

app.put("/:pop_id", dumpController.handleUpdatePop);

app.post("/insetCsv",dumpController.handleInsertCsv)

app.listen(3001, () => console.log("rodando na porta 3001"));
