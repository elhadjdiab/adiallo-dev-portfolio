# Portfolio - Abdoulaye Diallo

Portfolio Full-Stack Developer avec design minimaliste moderne.

## 🚀 Stack Technique

- **Framework**: Next.js 16.2.2 (App Router)
- **UI**: React 19.2.4
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion 12.38.0
- **State**: Redux Toolkit 2.11.2
- **Database**: SQLite + Prisma 6.19.3
- **Auth**: JWT + bcryptjs
- **Icons**: Lucide React

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Configurer la base de données
cd src/config
npm install
npx prisma generate
npx prisma migrate dev

# Retour à la racine
cd ../..

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

Le projet utilise un design system minimaliste avec:

- **Palette**: Background `#0B0F14`, Surface `#111827`, Primary `#6366F1`
- **Composants UI**: Button, Card, Badge, Input, Textarea, Container
- **Animations**: 400ms max, easeOut, respect de `prefers-reduced-motion`
- **Layout**: Mobile-first, responsive

Voir `DESIGN_SYSTEM.md` pour la documentation complète (local uniquement).

## 📁 Structure

```
src/
├── app/                    # Pages Next.js (App Router)
│   ├── (auth)/            # Routes auth (login, register)
│   ├── admin/             # Dashboard admin
│   ├── projects/          # Liste et détails projets
│   ├── testimonials/      # Témoignages
│   └── contact/           # Formulaire contact
├── components/            # Composants React
│   └── ui/               # Composants UI réutilisables
├── lib/                   # Utilitaires
├── store/                 # Redux store
└── styles/               # CSS global
```

## 🔑 Features

- ✅ Pages: Home, Projects, Testimonials, Contact
- ✅ Auth: Login, Register (JWT)
- ✅ Admin: Dashboard protégé
- ✅ API: REST endpoints (projects, testimonials, contact)
- ✅ Database: Prisma + SQLite
- ✅ Responsive: Mobile-first design
- ✅ Animations: Framer Motion optimisées
- ✅ Accessibilité: WCAG AA

## 🛠️ Scripts

```bash
npm run dev      # Développement
npm run build    # Build production
npm run start    # Serveur production
npm run lint     # ESLint
```

## 📝 Variables d'environnement

Créer `.env` à la racine:

```env
DATABASE_URL="file:./src/config/dev.db"
JWT_SECRET="your-secret-key"
```

## 🎯 Composants UI

```jsx
import { Button, Card, Badge, Input, Container } from "@/components/ui";

// Button
<Button variant="primary|secondary|ghost" size="sm|md|lg">
  Click me
</Button>

// Card
<Card hover={true}>
  Content
</Card>

// Badge
<Badge variant="default|primary|success|error">
  Label
</Badge>

// Input
<Input label="Email" error="Error message" />

// Container
<Container size="sm|md|lg|xl">
  Content
</Container>
```

## 🚀 Déploiement

Le projet est optimisé pour Vercel:

```bash
npm run build
```

Ou déployer directement sur [Vercel](https://vercel.com).

## 📄 License

MIT

## 👤 Auteur

**Abdoulaye Diallo**
- Portfolio: [adiallo.dev](https://adiallo.dev)
- GitHub: [@abdoulayediallo](https://github.com/abdoulayediallo)
