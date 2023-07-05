const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class DumpRepository {
  async insertPop(createdPopDto) {
    try {
      return await prisma.pop.findUniqueOrThrow({
        where: { id: createdPopDto.id },
      });
    } catch (err) {
      return await prisma.pop.create({
        data: createdPopDto,
      });
    }
  }

  async updatedPop(pop_id, updatedPopDto) {
    try {
      return await prisma.pop.update({
        where: { id: pop_id },
        data: updatedPopDto,
      });
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  }
}

module.exports = { DumpRepository };
