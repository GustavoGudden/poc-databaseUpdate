const { createObjectCsvWriter } = require("csv-writer");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function generateCsv(table) {
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

  // exec(
  //   `sqlite3 ./prisma/dev.db -csv -separator "," ".mode csv" ".output src/csvs/${table}.csv" "SELECT * FROM ${table};`
  // );
}

module.exports = { generateCsv };
