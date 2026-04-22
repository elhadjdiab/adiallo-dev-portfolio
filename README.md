# 🚀 Portfolio - Abdoulaye Diallo

Portfolio professionnel Full-Stack Developer avec design moderne, système de thème clair/sombre, et interface d'administration complète.

[![Next.js](https://img.shields.io/badge/Next.js-16.2.2-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ✨ Fonctionnalités principales

### 🎨 Interface utilisateur
- ✅ **Design moderne** avec animations Framer Motion
- ✅ **Thème clair/sombre** avec bascule animée et sauvegarde de préférence
- ✅ **Responsive** mobile-first avec menu hamburger
- ✅ **Micro-interactions** et feedbacks visuels (confetti, scroll to top)
- ✅ **Toast notifications** élégantes pour tous les retours utilisateur
- ✅ **Empty states** engageants avec appels à l'action

### 🔐 Authentification et sécurité
- ✅ **Système de rôles** (user/admin) avec JWT
- ✅ **Protection des routes** côté client et serveur
- ✅ **Validation** des données côté client et serveur
- ✅ **Hashage des mots de passe** avec bcryptjs

### 👨‍💼 Interface d'administration
- ✅ **Dashboard admin** avec statistiques
- ✅ **Gestion des projets** (CRUD complet avec upload d'images)
- ✅ **Modération des témoignages** (pending/approved/rejected)
- ✅ **Gestion des messages** de contact (lu/non lu, répondre, supprimer)
- ✅ **Accès restreint** aux administrateurs uniquement

### 📱 Pages publiques
- ✅ **Page d'accueil** avec hero, stats, stack technique, projets récents
- ✅ **Portfolio de projets** avec filtres et détails
- ✅ **Témoignages** groupés par projet
- ✅ **Formulaire de contact** avec protection anti-spam
- ✅ **Page À propos** avec liens sociaux

## �️ Stack Technique

### Frontend
- **Framework**: Next.js 16.2.2 (App Router)
- **UI Library**: React 19.2.4
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion 12.38.0
- **State Management**: Redux Toolkit 2.11.2
- **Icons**: Lucide React
- **Confetti**: canvas-confetti

### Backend
- **Database**: SQLite + Prisma 6.19.3
- **Authentication**: JWT + bcryptjs
- **API**: Next.js API Routes
- **File Upload**: Multipart form data

### DevOps
- **Version Control**: Git
- **Deployment**: Vercel-ready
- **Environment**: Node.js

## 📦 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Étapes d'installation

```bash
# 1. Cloner le repository
git clone https://github.com/elhadjdiab/adiallo-dev-portfolio.git
cd adiallo-dev-portfolio

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos valeurs

# 4. Configurer la base de données
cd src/config
npm install
npx prisma generate --schema=schema.prisma
npx prisma migrate deploy --schema=schema.prisma
cd ../..

# 5. Créer l'utilisateur admin
node set-admin-root.js

# 6. Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)


## 📁 Structure du projet

```
adiallo-dev-portfolio/
├── src/
│   ├── app/                      # Pages Next.js (App Router)
│   │   ├── (auth)/              # Routes d'authentification
│   │   │   ├── login/           # Page de connexion
│   │   │   └── register/        # Page d'inscription
│   │   ├── admin/               # Interface d'administration
│   │   │   ├── page.js          # Dashboard admin
│   │   │   ├── projects/        # Gestion des projets
│   │   │   ├── testimonials/    # Modération des témoignages
│   │   │   └── messages/        # Gestion des messages
│   │   ├── projects/            # Pages des projets
│   │   │   ├── page.js          # Liste des projets
│   │   │   └── [id]/            # Détails d'un projet
│   │   │       ├── page.js      # Page du projet
│   │   │       └── testimonial/ # Formulaire de témoignage
│   │   ├── testimonials/        # Page des témoignages
│   │   ├── about/               # Page à propos
│   │   ├── contact/             # Page de contact
│   │   ├── api/                 # API Routes
│   │   │   ├── auth/            # Authentification
│   │   │   ├── projects/        # CRUD projets
│   │   │   ├── testimonials/    # CRUD témoignages
│   │   │   ├── contact/         # Messages de contact
│   │   │   └── upload/          # Upload d'images
│   │   ├── layout.js            # Layout principal
│   │   └── page.js              # Page d'accueil
│   ├── components/              # Composants React
│   │   ├── ui/                  # Composants UI réutilisables
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Textarea.jsx
│   │   │   ├── Container.jsx
│   │   │   └── Toast.jsx
│   │   ├── SiteNav.jsx          # Navigation principale
│   │   ├── ThemeToggle.jsx      # Bouton de thème
│   │   ├── ThemeProvider.jsx    # Provider de thème
│   │   ├── ScrollToTop.jsx      # Bouton scroll to top
│   │   ├── EmptyState.jsx       # États vides
│   │   ├── ContactForm.jsx      # Formulaire de contact
│   │   └── ProjectsList.jsx     # Liste des projets
│   ├── lib/                     # Utilitaires
│   │   ├── auth.js              # Fonctions d'authentification
│   │   ├── messages.js          # Messages centralisés
│   │   ├── confetti.js          # Animations confetti
│   │   └── db.js                # Client Prisma
│   ├── store/                   # Redux Store
│   │   ├── index.js             # Configuration du store
│   │   └── slices/              # Slices Redux
│   │       ├── authSlice.js
│   │       ├── themeSlice.js
│   │       ├── projectSlice.js
│   │       └── testimonialsSlice.js
│   ├── styles/                  # Styles globaux
│   │   └── globals.css          # CSS global + variables thème
│   └── config/                  # Configuration Prisma
│       ├── schema.prisma        # Schéma de base de données
│       └── migrations/          # Migrations Prisma
├── public/                      # Fichiers statiques
│   ├── uploads/                 # Images uploadées
│   └── profile.png              # Photo de profil
├── .env                         # Variables d'environnement
├── .env.example                 # Exemple de variables
├── package.json                 # Dépendances npm
├── next.config.mjs              # Configuration Next.js
├── tailwind.config.js           # Configuration Tailwind
└── README.md                    # Ce fichier
```

## 🎨 Design System

### Palette de couleurs

**Mode sombre (défaut)**
- Background: `#0B0F14`
- Surface: `#111827`
- Primary: `#6366F1` (Indigo)
- Text: `#F8FAFC`

**Mode clair**
- Background: `#FFFFFF`
- Surface: `#F8FAFC`
- Primary: `#6366F1` (Indigo)
- Text: `#0F172A`

### Composants UI

```jsx
import { Button, Card, Badge, Input, Container } from "@/components/ui";
import { useToast } from "@/components/ui/Toast";

// Button
<Button variant="primary|secondary|ghost" size="sm|md|lg" href="/path">
  Texte du bouton
</Button>

// Card
<Card hover={true}>
  Contenu de la carte
</Card>

// Badge
<Badge variant="default|primary|success|error">
  Label
</Badge>

// Input
<Input 
  label="Email" 
  type="email"
  error="Message d'erreur"
  required
/>

// Container
<Container size="sm|md|lg|xl">
  Contenu centré avec max-width
</Container>

// Toast notifications
const { toast } = useToast();
toast.success("Opération réussie !");
toast.error("Une erreur est survenue");
toast.warning("Attention");
toast.info("Information");
```

## 🚀 Scripts disponibles

```bash
# Développement
npm run dev              # Lancer le serveur de développement

# Production
npm run build            # Build pour la production
npm run start            # Lancer le serveur de production

# Qualité du code
npm run lint             # Vérifier le code avec ESLint

# Base de données
cd src/config
npx prisma studio        # Interface graphique pour la DB
npx prisma generate      # Générer le client Prisma
npx prisma migrate dev   # Créer une nouvelle migration
```

## 🔒 Sécurité

### Authentification
- JWT avec expiration de 7 jours
- Mots de passe hashés avec bcrypt (10 rounds)
- Protection CSRF avec honeypot sur les formulaires
- Validation des données côté client et serveur

### Autorisation
- Système de rôles (user/admin)
- Middleware `requireAdmin` pour les routes protégées
- Vérification du rôle côté client et serveur
- Redirection automatique si accès non autorisé

### API
- Validation des entrées
- Messages d'erreur génériques (pas de fuite d'info)
- Rate limiting recommandé en production
- HTTPS obligatoire en production

## 📱 Responsive Design

Le site est entièrement responsive avec des breakpoints :
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

Fonctionnalités mobiles :
- Menu hamburger avec overlay
- Touch-friendly (boutons de 44px minimum)
- Scroll to top pour navigation rapide
- Images optimisées avec Next.js Image

## ♿ Accessibilité

- ✅ Contraste WCAG AA minimum
- ✅ Navigation au clavier
- ✅ aria-labels sur les liens et boutons
- ✅ Alt texts descriptifs sur les images
- ✅ Focus visible sur les éléments interactifs
- ✅ Respect de `prefers-reduced-motion`

## 🚀 Déploiement

### Vercel (recommandé)

1. Pusher le code sur GitHub
2. Importer le projet sur [Vercel](https://vercel.com)
3. Configurer les variables d'environnement
4. Déployer !

### Autre plateforme

```bash
# Build
npm run build

# Lancer en production
npm run start
```

Variables d'environnement requises :
- `DATABASE_URL`
- `JWT_SECRET`
- `NEXT_PUBLIC_API_URL` (optionnel)

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Changelog

### Version 2.0.0 (2026-04-21)
- ✨ Système de thème clair/sombre complet
- ✨ Interface admin de gestion des messages
- ✨ Système de rôles admin
- ✨ Améliorations UX (scroll to top, confetti, empty states)
- 🐛 Correction des boutons CTA
- 🐛 Corrections d'authentification JWT
- 📝 Documentation complète

### Version 1.0.0 (2026-04-08)
- 🎉 Version initiale
- ✨ Pages publiques (home, projects, about, contact, testimonials)
- ✨ Authentification (login, register)
- ✨ Interface admin (projects, testimonials)
- ✨ API REST complète
- ✨ Design system avec Tailwind CSS

## 📄 License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👤 Auteur

**Abdoulaye Diallo**
- Portfolio: [adiallo.dev](https://adiallo.dev)
- GitHub: [@elhadjdiab](https://github.com/elhadjdiab)
- LinkedIn: [Abdoulaye Diallo](https://linkedin.com/in/abdoulaye-diallo)

## technologies

- [Next.js](https://nextjs.org/) - Framework React
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Prisma](https://www.prisma.io/) - ORM
- [Lucide](https://lucide.dev/) - Icônes
- [Vercel](https://vercel.com/) - Hébergement ( prochainement)

---

⭐ Si ce projet vous a aidé, n'hésitez pas à lui donner une étoile sur GitHub !
