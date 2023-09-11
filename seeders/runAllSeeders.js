/* 
  👉 node seeders/runAllSeeders.js
 
 
 
 👉 npm run seeders
  */

require("dotenv").config();

async function runAllSeeders() {
  await require("./roleSeeders")();
  await require("./authorSeeder")();
  await require("./articleSeeder")();
  await require("./commentSeeder")();

  console.log("[Database] ¡Los datos de prueba fueron insertados!");
}

runAllSeeders();
