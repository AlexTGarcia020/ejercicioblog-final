const { Role } = require("../models");

module.exports = async () => {
  const roles = [];

  roles.push({
    rolID: 1,
    rolname: "lector",
  });

  roles.push({
    rolID: 2,
    rolname: "escritor",
  });

  roles.push({
    rolID: 3,
    rolname: "editor",
  });

  roles.push({
    rolID: 4,
    rolname: "admin",
  });

  await Role.bulkCreate(roles);
  console.log("[Database] Se corrió el seeder de Roles.");
};