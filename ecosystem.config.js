module.exports = {
    apps : [{
      name: "vote-app",
      script: "./app.js",
      exec_mode: "cluster",
      instances: 1,
      watch: true,
      max_memory_restart: "300M",
      env: {
        "NODE_ENV": "development",
      },
      env_production: {
        "NODE_ENV": "production"
      }
    }]
  }