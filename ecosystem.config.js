module.exports = {
    apps : [{
      name: "vote-app",
      script: "./app.js",
      exec_mode: "fork",
      instances: 1,
      watch: true,
      ignore_watch: [
        "node_modules", 
        "sessions",
        "*.sqlite",
        "*.sqlite-journal",
        "logs"
      ],
      max_memory_restart: "300M",
      env: {
        "NODE_ENV": "development",
        "SESSION_SECRET" : process.env.SESSION_SECRET
      },
      env_production: {
        "NODE_ENV": "production",
        "SESSION_SECRET" : process.env.SESSION_SECRET
      }
    }]
  }