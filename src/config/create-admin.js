const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  const adminEmail = 'admin@exemple.com';
  const adminPassword = 'admin123'; // Changez ce mot de passe après la première connexion
  const adminName = 'Administrateur';
  
  try {
    // Vérifier si l'utilisateur existe déjà
    const existing = await prisma.user.findUnique({
      where: { email: adminEmail },
    });
    
    if (existing) {
      console.log('ℹ️  L\'utilisateur existe déjà. Mise à jour du rôle...');
      const updated = await prisma.user.update({
        where: { email: adminEmail },
        data: { role: 'admin' },
      });
      console.log('✅ Utilisateur mis à jour en admin:', updated.email);
      return;
    }
    
    // Créer le nouvel utilisateur admin
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const user = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: adminName,
        role: 'admin',
      },
    });
    
    console.log('✅ Utilisateur admin créé avec succès!');
    console.log('📧 Email:', user.email);
    console.log('🔑 Mot de passe:', adminPassword);
    console.log('⚠️  Changez ce mot de passe après la première connexion!');
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
