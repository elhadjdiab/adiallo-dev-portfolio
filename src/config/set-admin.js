const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function setAdmin() {
  const adminEmail = 'admin@exemple.com';
  
  try {
    // Mettre à jour l'utilisateur avec cet email
    const user = await prisma.user.update({
      where: { email: adminEmail },
      data: { role: 'admin' },
    });
    
    console.log('✅ Utilisateur mis à jour en admin:', user.email);
  } catch (error) {
    if (error.code === 'P2025') {
      console.log('❌ Aucun utilisateur trouvé avec l\'email:', adminEmail);
      console.log('💡 Crée d\'abord un compte avec cet email sur /register');
    } else {
      console.error('❌ Erreur:', error.message);
    }
  } finally {
    await prisma.$disconnect();
  }
}

setAdmin();
