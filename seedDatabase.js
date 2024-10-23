const { Food } = require('./models');
const sequelize = require('./database');

async function seedDatabase() {
  try {
    // Sync the database, force:true will drop existing tables
    await sequelize.sync({ force: true });

    // Add some initial foods
    const foods = [
      { name: 'Pizza' },
      { name: 'Burger' },
      { name: 'Sushi' },
      { name: 'Pasta' },
      { name: 'Salad' }
    ];

    for (const food of foods) {
      await Food.create(food);
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
}

seedDatabase();