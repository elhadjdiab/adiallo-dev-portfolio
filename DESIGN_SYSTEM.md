# 🎨 Design System - Portfolio Minimaliste Futuriste Pro

## 📋 Vue d'ensemble

Design system minimaliste inspiré des SaaS modernes (Vercel, Linear, Stripe).

**Principes**:
- Clarté > Esthétique
- Contenu > Décoration
- Performance > Effets
- Accessibilité = Priorité

---

## 🎨 Palette de Couleurs

### Backgrounds
```css
--bg-primary: #0B0F14       /* Background principal */
--bg-surface: #111827       /* Cards, surfaces */
--bg-surface-hover: #0F172A /* Hover states */
```

### Colors
```css
--primary: #6366F1          /* Indigo - Actions principales */
--primary-hover: #4F46E5    /* Hover state */
--accent: #22C55E           /* Green - Success */
--error: #EF4444            /* Red - Errors */
```

### Text
```css
--text-primary: #F8FAFC     /* Titres, texte important */
--text-secondary: #94A3B8   /* Texte normal */
--text-muted: #64748B       /* Texte secondaire */
```

### Borders
```css
--border: #1E293B           /* Borders normales */
--border-hover: #334155     /* Hover state */
```

---

## 🧱 Composants

### Button

**Variantes**: `primary`, `secondary`, `ghost`  
**Tailles**: `sm`, `md`, `lg`

```jsx
import Button from "@/components/ui/Button";

// Primary (action principale)
<Button variant="primary" size="md">
  Voir les projets
</Button>

// Secondary (action secondaire)
<Button variant="secondary" size="md">
  En savoir plus
</Button>

// Ghost (action tertiaire)
<Button variant="ghost" size="sm">
  Annuler
</Button>

// Avec lien
<Button href="/projects" variant="primary">
  Projets
</Button>
```

**Styles**:
- Transition: 200ms
- Active scale: 0.95
- Border radius: 0.5rem (rounded-lg)

---

### Card

**Props**: `hover` (boolean), `className`

```jsx
import Card from "@/components/ui/Card";

<Card>
  <h3>Titre</h3>
  <p>Contenu de la card</p>
</Card>

// Sans effet hover
<Card hover={false}>
  <p>Card statique</p>
</Card>
```

**Styles**:
- Background: `#111827` (slate-900)
- Border: `#1E293B` (slate-800)
- Hover: scale 1.02 + border lighter
- Padding: 1.5rem (p-6)
- Border radius: 0.75rem (rounded-xl)

---

### Badge

**Variantes**: `default`, `primary`, `success`, `error`

```jsx
import Badge from "@/components/ui/Badge";

<Badge variant="primary">Disponible</Badge>
<Badge variant="success">Actif</Badge>
<Badge variant="error">Erreur</Badge>
```

**Styles**:
- Font size: 0.75rem (text-xs)
- Padding: 0.5rem × 0.625rem
- Border radius: 0.375rem (rounded-md)

---

## ✨ Animations

### Principes
- Durée max: 500ms (préférer 200-300ms)
- Easing: ease ou cubic-bezier naturel
- Respecter `prefers-reduced-motion`

### Framer Motion - Configurations

**Fade simple**:
```jsx
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 }
};
```

**Slide up léger**:
```jsx
const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" }
};
```

**Stagger (liste)**:
```jsx
const container = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};
```

---

## 📐 Spacing & Layout

### Container
```jsx
<div className="max-w-6xl mx-auto px-6">
  {/* Contenu */}
</div>
```

**Breakpoints**:
- `max-w-4xl`: Contenu texte (hero, articles)
- `max-w-6xl`: Grids, listes
- `max-w-7xl`: Layout complet

### Spacing vertical
```jsx
<section className="py-16">      {/* Sections */}
<section className="py-24">      {/* Hero */}
<div className="space-y-6">      {/* Stack vertical */}
<div className="gap-6">          {/* Grid gap */}
```

---

## 🎯 Typographie

### Fonts
- **Sans**: Inter (variable)
- **Mono**: Geist Mono (variable)

### Échelle
```jsx
<h1 className="text-5xl font-bold">        {/* Hero */}
<h2 className="text-3xl font-semibold">    {/* Section */}
<h3 className="text-xl font-semibold">     {/* Card title */}
<p className="text-base text-slate-400">   {/* Body */}
<span className="text-sm text-slate-500">  {/* Caption */}
```

### Line height
- Titres: `leading-tight` (1.25)
- Body: `leading-relaxed` (1.625)

---

## 🎨 Patterns Communs

### Hero Section
```jsx
<section className="max-w-4xl mx-auto px-6 py-24 text-center">
  <Badge variant="primary">Disponible</Badge>
  <h1 className="text-5xl font-bold mt-6">Titre Principal</h1>
  <p className="text-xl text-slate-400 mt-4">Description</p>
  <div className="flex gap-4 justify-center mt-8">
    <Button variant="primary">CTA Principal</Button>
    <Button variant="secondary">CTA Secondaire</Button>
  </div>
</section>
```

### Grid de Cards
```jsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <Card key={item.id}>
      <h3 className="text-xl font-semibold">{item.title}</h3>
      <p className="text-slate-400 mt-2">{item.description}</p>
    </Card>
  ))}
</div>
```

### Form
```jsx
<form className="space-y-6">
  <div>
    <label className="block text-sm font-medium mb-2">
      Email
    </label>
    <input
      type="email"
      className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg 
                 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 
                 transition-colors duration-200"
    />
  </div>
  <Button type="submit" variant="primary" className="w-full">
    Envoyer
  </Button>
</form>
```

---

## ♿ Accessibilité

### Contraste
- Texte principal sur background: 15:1 (AAA)
- Texte secondaire sur background: 7:1 (AA)
- Borders visibles: minimum 3:1

### Focus States
```jsx
className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
```

### ARIA
- Utiliser `aria-label` pour icônes seules
- `aria-hidden` pour décorations
- `role` approprié pour composants custom

---

## 📱 Responsive

### Mobile First
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
```

### Breakpoints Tailwind
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

## 🚫 À Éviter

### ❌ Effets lourds
- Pas de mesh background
- Pas de grid overlay
- Pas de spotlight cursor
- Pas de blur excessif

### ❌ Animations
- Pas d'animations > 500ms
- Pas d'effets "wow"
- Pas de parallax

### ❌ Complexité
- Pas de glassmorphism
- Pas de shadows complexes
- Pas de gradients partout

---

## ✅ Checklist Composant

Avant de créer un nouveau composant:

- [ ] Utilise la palette définie
- [ ] Animations < 300ms
- [ ] Accessible (WCAG AA minimum)
- [ ] Responsive (mobile first)
- [ ] Props documentées
- [ ] Variantes cohérentes avec le système

---

## 📚 Ressources

### Inspiration
- [Vercel Design](https://vercel.com)
- [Linear](https://linear.app)
- [Stripe](https://stripe.com)
- [Tailwind UI](https://tailwindui.com)

### Documentation
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref)
