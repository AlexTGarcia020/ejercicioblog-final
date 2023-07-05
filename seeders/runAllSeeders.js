/* 
  👉 node seeders/runAllSeeders.js
 
 
 
 👉 npm run seeders
  */

require("dotenv").config();

async function runAllSeeders() {
  await require("./authorSeeder")();
  await require("./articleSeeder")();
  await require("./commentSeeder")();
  await require("./roleSeeders")();

  console.log("[Database] ¡Los datos de prueba fueron insertados!");
}

runAllSeeders();
