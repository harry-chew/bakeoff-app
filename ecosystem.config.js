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
        "logs"
      ],
      max_memory_restart: "300M",
      env: {
        "NODE_ENV": "development",
        "SESSION_SECRET" : process.env.SESSION_SECRET,
        "DB_NAME": process.env.DB_NAME,
        "DB_USER": process.env.DB_USER,
        "DB_PASSWORD": process.env.DB_PASSWORD,
        "DB_HOST": process.env.DB_HOST
      },
      env_production: {
        "NODE_ENV": "production",
        "SESSION_SECRET" : process.env.SESSION_SECRET,
        "DB_NAME": process.env.DB_NAME,
        "DB_USER": process.env.DB_USER,
        "DB_PASSWORD": process.env.DB_PASSWORD,
        "DB_HOST": process.env.DB_HOST
      }
    }]
  }