module.exports = {
  port: process.env.PORT || 3000,
  mongoUri: "mongodb://localhost:27017/myapp",
  instances: 3,
  max_memory_restart: "200M",
  error_file: "logs/err.log",
  secretJwtToken: "test",
};
//commande pour lancer l'application
//pm2 start ecosystem.config.js
