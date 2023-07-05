const { DumpRepository } = require("../repository/dumpRespository");


class DumpService {
  constructor() {
    this.dumpRepository = new DumpRepository();
  }

  async createPop(createdPopDto) {
    return await this.dumpRepository.insertPop(createdPopDto);
  }

  async updatePop(pop_id, updatedPopDto) {
    return await this.dumpRepository.updatedPop(pop_id, updatedPopDto);
  }
}

module.exports = { DumpService };
