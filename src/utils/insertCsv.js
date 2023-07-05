const { Pool } = require("pg");
const fs = require("fs");
const copyFrom = require("pg-copy-streams").from;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "sqlite",
  password: "123",
  port: 5432,
});

const insertCsv = async (table) => {
  const filePath = `src/csvs/${table}.csv`;

  pool.connect(async (err, client, done) => {
    if (err) throw err;

    await client.query(`DELETE FROM ${table}`);

    const stream = client.query(
      copyFrom(`COPY ${table} FROM STDIN DELIMITER ',' CSV HEADER`)
    );
    const fileStream = fs.createReadStream(filePath);

    fileStream.on("error", (error) => {
      done();
      console.error("Erro ao ler o arquivo CSV:", error);
    });

    stream.on("error", (error) => {
      done();
      console.error("Erro ao importar dados:", error);
    });

    stream.on("end", () => {
      done();
      console.log("Importação concluída com sucesso!");
    });

    fileStream.pipe(stream);
  });
};

module.exports = { insertCsv };
