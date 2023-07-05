const { Role } = require("../models");

module.exports = async () => {
  const roles = [];

  roles.push({
    rolname: "lector",
  });

  roles.push({
    rolname: "escritor",
  });

  roles.push({
    rolname: "editor",
  });

  roles.push({
    rolname: "admin",
  });

  await Role.bulkCreate(roles);
  console.log("[Database] Se corrió el seeder de Roles.");
};
