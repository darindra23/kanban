module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "kanban",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: "yedudtcheqcvrm",
    password: "7cd9d285a3dd916e6623a5e9ed1d25b8309ca492e806386dc2c7810e820c7e03",
    database: "dedo3cr1g09r35",
    host: "ec2-184-72-236-57.compute-1.amazonaws.com",
    dialect: "postgres"
  }
};
