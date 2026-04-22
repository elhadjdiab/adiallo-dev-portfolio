const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function listUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
    
    console.log('\n📋 Utilisateurs dans la base de données:\n');
    if (users.length === 0) {
      console.log('Aucun utilisateur trouvé.');
    } else {
      users.forEach(user => {
        console.log(`ID: ${user.id}`);
        console.log(`Email: ${user.email}`);
        console.log(`Nom: ${user.name || 'N/A'}`);
        console.log(`Rôle: ${user.role}`);
        console.log(`Créé le: ${user.createdAt.toLocaleDateString()}`);
        console.log('---');
      });
    }
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

listUsers();
