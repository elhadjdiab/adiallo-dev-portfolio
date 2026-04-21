# 🎯 Plan de Refonte – Portfolio Minimaliste Futuriste Pro

## 📋 Vue d'ensemble

Transformation progressive du portfolio actuel (glassmorphism surchargé) vers un design **Minimaliste Futuriste Pro** type SaaS 2026.

**Stratégie**: Refonte par branches thématiques pour faciliter les tests et rollbacks.

---

## 🌳 Structure des Branches

```
main (production actuelle)
  ↓
redesign/base (fondations)
  ↓
redesign/components (composants de base)
  ↓
redesign/pages (pages principales)
  ↓
redesign/features (fonctionnalités avancées)
  ↓
redesign/final (polish + optimisations)
```

---

## 📦 Phase 1: Fondations Design System
**Branche**: `redesign/base`

### Objectifs
- Nouvelle palette de couleurs
- Variables CSS propres
- Suppression des effets lourds
- Utilitaires Tailwind simplifiés

### Fichiers à modifier
- ✅ `src/styles/globals.css` - Nouvelle palette + suppression mesh-background
- ✅ `tailwind.config.js` (créer si absent) - Configuration couleurs custom
- ✅ `src/app/layout.js` - Supprimer mesh-background div

### Livrables
```css
/* Nouvelle palette */
--bg-primary: #0B0F14
--bg-surface: #111827
--bg-surface-hover: #0F172A
--primary: #6366F1
--accent: #22C55E
--error: #EF4444
--text-primary: #F8FAFC
--text-secondary: #94A3B8
--border: #1E293B
```

### Critères de validation
- [ ] Pas de mesh-background visible
- [ ] Palette cohérente sur toutes les pages
- [ ] Contraste WCAG AA minimum

---

## 🧱 Phase 2: Composants de Base
**Branche**: `redesign/components`

### Objectifs
- Refonte des composants atomiques
- Animations simplifiées
- Design system cohérent

### Composants à refondre

#### 2.1 Navigation (`SiteNav.jsx`)
**Changements**:
- Background solide avec blur léger
- Active state clair (border-bottom indigo)
- Hover simple (200ms)
- Supprimer effets complexes

```jsx
// Nouveau style
<nav className="fixed top-0 z-50 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur-sm">
  <Link className="text-slate-400 hover:text-slate-100 transition-colors duration-200 
                   data-[active]:text-indigo-400 data-[active]:border-b-2 data-[active]:border-indigo-500">
```

#### 2.2 Cards (`cardInlay` → `Card.jsx`)
**Créer composant réutilisable**:
```jsx
// src/components/ui/Card.jsx
<div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg 
                hover:border-slate-700 hover:scale-[1.02] transition-all duration-200">
```

#### 2.3 Buttons
**Créer**: `src/components/ui/Button.jsx`

Variantes:
- `primary`: fond indigo plein
- `secondary`: outline slate
- `ghost`: transparent hover

```jsx
const variants = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-500",
  secondary: "border border-slate-700 text-slate-300 hover:border-slate-600",
  ghost: "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
}
```

#### 2.4 Supprimer/Simplifier
- ❌ `PageSpotlight.jsx` - Supprimer complètement
- ✅ `TerminalBadge.jsx` - Simplifier (pas d'animation)
- ✅ `ProjectsGridSkeleton.jsx` - Design plus simple

### Fichiers
- `src/components/SiteNav.jsx`
- `src/components/ui/Card.jsx` (nouveau)
- `src/components/ui/Button.jsx` (nouveau)
- `src/components/TerminalBadge.jsx`
- Supprimer `src/components/PageSpotlight.jsx`

### Critères de validation
- [ ] Tous les composants utilisent la nouvelle palette
- [ ] Animations < 300ms
- [ ] Pas d'effet spotlight/grid visible
- [ ] Composants réutilisables documentés

---

## 📄 Phase 3: Pages Principales
**Branche**: `redesign/pages`

### 3.1 Home (`src/app/page.js`)

**Structure simplifiée**:
```jsx
<main className="min-h-screen bg-[#0B0F14]">
  {/* Hero Section */}
  <section className="max-w-4xl mx-auto px-6 py-24">
    <Badge>Disponible · Stage Full-Stack</Badge>
    <h1 className="text-5xl font-bold mt-6">Abdoulaye Diallo</h1>
    <p className="text-xl text-slate-400 mt-4">
      Full-Stack Developer · Next.js & SwiftUI
    </p>
    <div className="flex gap-4 mt-8">
      <Button variant="primary">Voir les projets</Button>
      <Button variant="secondary">Contact</Button>
    </div>
  </section>

  {/* Services - 3 cards simples */}
  <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
    {services.map(service => (
      <Card key={service.id}>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
      </Card>
    ))}
  </section>
</main>
```

**Changements**:
- ❌ Supprimer grid background
- ❌ Supprimer PageSpotlight
- ✅ Hero centré, clair
- ✅ CTA évidents
- ✅ Animations fade simple (0.3s)

### 3.2 Projects (`src/app/projects/page.js`)

**Structure**:
```jsx
<main>
  {/* Header simple */}
  <header className="max-w-6xl mx-auto px-6 py-16">
    <h1>Projets</h1>
    <p>Sélection de travaux récents</p>
  </header>

  {/* Grid propre */}
  <section className="max-w-6xl mx-auto px-6 pb-24">
    <ProjectsList /> {/* Refonte dans composants */}
  </section>
</main>
```

### 3.3 Contact (`src/app/contact/page.js`)

**Simplifier**:
- Form centré, max-w-2xl
- Inputs avec border claire
- Validation visible
- Success state simple

### 3.4 Auth Pages

**Login/Register**:
- Card centrée
- Form minimal
- Error states clairs
- Pas de décoration

### Fichiers
- `src/app/page.js`
- `src/app/projects/page.js`
- `src/app/contact/page.js`
- `src/app/(auth)/login/page.js`
- `src/app/(auth)/register/page.js`
- `src/components/ProjectsList.jsx`
- `src/components/ContactForm.jsx`

### Critères de validation
- [ ] Hiérarchie visuelle claire
- [ ] Pas d'effets distrayants
- [ ] Mobile responsive
- [ ] Temps de chargement < 2s

---

## 🚀 Phase 4: Features Avancées
**Branche**: `redesign/features`

### 4.1 Admin Dashboard (`src/app/admin/page.js`)

**Design type SaaS**:
```jsx
<div className="min-h-screen bg-[#0B0F14]">
  <Sidebar /> {/* Navigation verticale */}
  
  <main className="ml-64 p-8">
    {/* Stats cards */}
    <div className="grid grid-cols-4 gap-6 mb-8">
      <StatCard title="Projets" value={12} />
      <StatCard title="Messages" value={5} />
      {/* ... */}
    </div>

    {/* Tables */}
    <Card>
      <Table>
        <TableHeader />
        <TableBody />
      </Table>
    </Card>
  </main>
</div>
```

**Composants à créer**:
- `src/components/admin/Sidebar.jsx`
- `src/components/admin/StatCard.jsx`
- `src/components/ui/Table.jsx`

### 4.2 Testimonials (`src/app/testimonials/page.js`)

**Simplifier**:
- Liste simple
- Card par testimonial
- Auth pour actions (edit/delete)
- Pas d'effets fancy

### 4.3 Project Detail (nouveau)

**Créer**: `src/app/projects/[id]/page.js`

**Structure**:
```jsx
<article className="max-w-4xl mx-auto px-6 py-16">
  <Badge>{project.category}</Badge>
  <h1>{project.title}</h1>
  
  <section>
    <h2>Problème</h2>
    <p>{project.problem}</p>
  </section>
  
  <section>
    <h2>Solution</h2>
    <p>{project.solution}</p>
  </section>
  
  <section>
    <h2>Technologies</h2>
    <TechStack items={project.technologies} />
  </section>
  
  <div className="flex gap-4">
    <Button href={project.liveUrl}>Démo</Button>
    <Button href={project.githubUrl}>Code</Button>
  </div>
</article>
```

### Fichiers
- `src/app/admin/page.js`
- `src/app/testimonials/page.js`
- `src/app/projects/[id]/page.js` (nouveau)
- `src/components/admin/*` (nouveaux)
- `src/components/TestimonialsList.jsx`

### Critères de validation
- [ ] Admin dashboard fonctionnel
- [ ] CRUD opérationnel
- [ ] Auth protège les routes sensibles
- [ ] UX claire et rapide

---

## ✨ Phase 5: Polish & Optimisations
**Branche**: `redesign/final`

### Objectifs
- Performance
- Accessibilité
- SEO
- Tests finaux

### Tâches

#### 5.1 Performance
- [ ] Lazy loading images
- [ ] Code splitting
- [ ] Optimiser bundle size
- [ ] Lighthouse score > 90

#### 5.2 Accessibilité
- [ ] Contraste WCAG AA
- [ ] Navigation clavier
- [ ] ARIA labels
- [ ] Focus states visibles

#### 5.3 Animations finales
- [ ] Vérifier toutes < 500ms
- [ ] Respecter prefers-reduced-motion
- [ ] Smooth scroll

#### 5.4 Responsive
- [ ] Mobile (320px+)
- [ ] Tablet (768px+)
- [ ] Desktop (1024px+)
- [ ] Large (1440px+)

#### 5.5 Documentation
- [ ] README mis à jour
- [ ] Composants documentés
- [ ] Guide de style

### Fichiers
- Tous les fichiers (revue complète)
- `README.md`
- `DESIGN_SYSTEM.md` (nouveau)

---

## 🎯 Checklist Globale

### Design
- [ ] Palette cohérente (#0B0F14, #111827, #6366F1)
- [ ] Pas de mesh/grid/spotlight
- [ ] Animations < 500ms
- [ ] Contraste élevé

### Composants
- [ ] Card simplifié
- [ ] Button (3 variantes)
- [ ] Navigation claire
- [ ] Forms accessibles

### Pages
- [ ] Home épuré
- [ ] Projects grid simple
- [ ] Contact fonctionnel
- [ ] Admin type SaaS
- [ ] Auth minimaliste

### Technique
- [ ] Next.js App Router OK
- [ ] Redux fonctionne
- [ ] API routes OK
- [ ] Auth JWT OK
- [ ] Prisma migrations OK

### Performance
- [ ] Lighthouse > 90
- [ ] Bundle optimisé
- [ ] Images optimisées
- [ ] Pas de layout shift

---

## 🚦 Workflow Git

```bash
# Phase 1
git checkout -b redesign/base
# ... travail ...
git commit -m "feat(design): nouvelle palette + suppression effets lourds"
git push origin redesign/base
# PR + Review + Merge

# Phase 2
git checkout redesign/base
git checkout -b redesign/components
# ... travail ...
git commit -m "feat(components): refonte Card, Button, Nav"
git push origin redesign/components
# PR + Review + Merge

# Phase 3
git checkout redesign/components
git checkout -b redesign/pages
# ... etc ...
```

---

## 📊 Timeline Estimée

| Phase | Durée | Priorité |
|-------|-------|----------|
| Phase 1: Fondations | 2-3h | 🔴 Critique |
| Phase 2: Composants | 4-6h | 🔴 Critique |
| Phase 3: Pages | 6-8h | 🟡 Important |
| Phase 4: Features | 4-6h | 🟢 Normal |
| Phase 5: Polish | 3-4h | 🟢 Normal |

**Total**: ~20-27h de développement

---

## 🎨 Références Design

### Inspiration
- Vercel Dashboard
- Linear App
- Stripe Dashboard
- Resend UI
- Tailwind UI

### Principes
1. **Clarté > Esthétique**
2. **Contenu > Décoration**
3. **Performance > Effets**
4. **Accessibilité = Priorité**

---

## 📝 Notes Importantes

### À garder
- ✅ Framer Motion (simplifié)
- ✅ Redux Toolkit
- ✅ Structure Next.js
- ✅ Prisma + SQLite

### À supprimer
- ❌ PageSpotlight
- ❌ Mesh background
- ❌ Grid overlay
- ❌ Effets blur complexes
- ❌ Animations > 500ms

### À simplifier
- 🔄 Cards (glass → solid)
- 🔄 Buttons (effets → simple)
- 🔄 Navigation (scroll effect léger)
- 🔄 Animations (durée réduite)

---

## 🤝 Prêt à commencer ?

**Prochaine étape**: Phase 1 - Fondations Design System

Commande pour démarrer:
```bash
git checkout -b redesign/base
```

Dis-moi quand tu es prêt et on attaque la Phase 1 ! 🚀
