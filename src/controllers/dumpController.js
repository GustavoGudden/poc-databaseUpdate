const { v4: uuidv4 } = require("uuid");
const { DumpService } = require("../service/dumpService");
const { generateCsv } = require("../utils/generateCsv");
const { insertCsv } = require("../utils/insertCsv");

class DumpController {
  constructor() {
    this.dumpService = new DumpService();
  }

  handleCreatePop = async (req, res) => {
    const createPopDto = {
      id: uuidv4(),
      name: req.body.name,
    };

    const createdPop = await this.dumpService.createPop(createPopDto);
    await generateCsv("pops");
    insertCsv("pops");
    return res.status(201).json(createdPop);
  };

  handleUpdatePop = async (req, res) => {
    const { pop_id } = req.params;

    const updatedPop = await this.dumpService.updatePop(pop_id, req.body);
    await generateCsv("pops");
    insertCsv("pops");
    return res.status(200).json(updatedPop);
  };

  handleInsertCsv = (req, res) => {
    insertCsv("pops");
    return res.send("deu bom confia ");
  };
}

module.exports = { DumpController };
