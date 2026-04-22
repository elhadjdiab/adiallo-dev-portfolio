# 📝 Flow Témoignages - Spécification Complète

## 🎯 Vue d'ensemble

Système de témoignages avec deux côtés :
1. **Public** : Lecture des témoignages approuvés
2. **Admin** : Gestion complète (CRUD + modération)

---

## 📊 Modèle de Données Actuel

```prisma
model Testimonial {
  id        Int      @id @default(autoincrement())
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
}
```

### 🔄 Amélioration Suggérée

Ajouter un champ `status` pour la modération :

```prisma
model Testimonial {
  id        Int      @id @default(autoincrement())
  content   String
  status    String   @default("pending") // pending, approved, rejected
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
}
```

---

## 🔄 Flow Proposé

### Option 1 : Flow Simple (Sans Modération)

```
1. User connecté → Soumet témoignage
2. Témoignage créé → Visible immédiatement
3. Admin peut modifier/supprimer
```

**Avantages** :
- Simple à implémenter
- Pas de workflow complexe
- Utilisateurs de confiance

**Inconvénients** :
- Pas de contrôle avant publication
- Risque de spam/contenu inapproprié

### Option 2 : Flow avec Modération (Recommandé)

```
1. User connecté → Soumet témoignage
2. Témoignage créé avec status="pending"
3. Admin reçoit notification
4. Admin approuve/rejette
5. Si approuvé → Visible publiquement
6. Si rejeté → Pas visible
```

**Avantages** :
- Contrôle qualité
- Pas de spam
- Contenu vérifié

**Inconvénients** :
- Workflow plus complexe
- Admin doit modérer

---

## 🎨 Interface Proposée

### 1. Page Publique `/testimonials`

**Affichage** :
- Liste des témoignages approuvés
- Card par témoignage
- Nom + email de l'auteur
- Date de création
- Contenu

**Actions** :
- Bouton "Laisser un témoignage" (si connecté)
- Pagination si > 10 témoignages

**Layout** :
```jsx
<Container size="lg">
  <Header>
    <h1>Témoignages</h1>
    <p>Ce que disent mes clients</p>
    {isAuthenticated && (
      <Button href="/testimonials/new">
        Laisser un témoignage
      </Button>
    )}
  </Header>

  <TestimonialsList />
</Container>
```

---

### 2. Page Création `/testimonials/new`

**Accès** : Utilisateurs connectés uniquement

**Formulaire** :
- Textarea pour le contenu (requis, min 20 caractères)
- Note optionnelle (1-5 étoiles) ?
- Bouton "Soumettre"

**Validation** :
- Contenu requis
- Min 20 caractères
- Max 500 caractères

**Après soumission** :
- Message de confirmation
- "Votre témoignage est en attente de validation"
- Redirect vers `/testimonials`

---

### 3. Admin - Liste `/admin/testimonials`

**Affichage** :
- Tous les témoignages (pending, approved, rejected)
- Filtres par status
- Compteurs (X pending, Y approved, Z rejected)

**Colonnes** :
- ID
- Auteur (nom + email)
- Contenu (tronqué)
- Status (badge coloré)
- Date
- Actions (Approuver, Rejeter, Modifier, Supprimer)

**Layout** :
```jsx
<Container size="lg">
  <Header>
    <h1>Gestion des témoignages</h1>
    <Stats>
      <Badge variant="default">{pending} en attente</Badge>
      <Badge variant="success">{approved} approuvés</Badge>
      <Badge variant="error">{rejected} rejetés</Badge>
    </Stats>
  </Header>

  <Filters>
    <Button onClick={() => filter('all')}>Tous</Button>
    <Button onClick={() => filter('pending')}>En attente</Button>
    <Button onClick={() => filter('approved')}>Approuvés</Button>
    <Button onClick={() => filter('rejected')}>Rejetés</Button>
  </Filters>

  <TestimonialsList />
</Container>
```

---

### 4. Admin - Actions Rapides

**Approuver** :
```
PATCH /api/testimonials/[id]
Body: { status: "approved" }
→ Témoignage visible publiquement
```

**Rejeter** :
```
PATCH /api/testimonials/[id]
Body: { status: "rejected" }
→ Témoignage caché
```

**Modifier** :
```
Redirect → /admin/testimonials/[id]/edit
Formulaire pré-rempli
PUT /api/testimonials/[id]
Body: { content, status }
```

**Supprimer** :
```
Confirmation
DELETE /api/testimonials/[id]
→ Suppression définitive
```

---

## 🔌 API Endpoints

### GET /api/testimonials
**Public** : Oui  
**Retourne** : Témoignages approuvés uniquement

```javascript
// Modifier pour filtrer par status
const testimonials = await prisma.testimonial.findMany({
  where: { status: "approved" }, // Seulement approuvés
  include: { user: { select: { id: true, name: true, email: true } } },
  orderBy: { createdAt: "desc" },
});
```

### GET /api/testimonials/all
**Public** : Non (Admin uniquement)  
**Retourne** : Tous les témoignages

```javascript
const authUser = getAuthUser(request);
if (!authUser) return 401;

const testimonials = await prisma.testimonial.findMany({
  include: { user: { select: { id: true, name: true, email: true } } },
  orderBy: { createdAt: "desc" },
});
```

### POST /api/testimonials
**Public** : Non (Auth requise)  
**Crée** : Nouveau témoignage avec status="pending"

```javascript
const testimonial = await prisma.testimonial.create({
  data: {
    content: content.trim(),
    status: "pending", // Par défaut en attente
    userId: authUser.id,
  },
});
```

### PATCH /api/testimonials/[id]
**Public** : Non (Admin uniquement)  
**Modifie** : Status ou contenu

```javascript
const testimonial = await prisma.testimonial.update({
  where: { id: parseInt(id) },
  data: { status, content },
});
```

### PUT /api/testimonials/[id]
**Public** : Non (Admin uniquement)  
**Modifie** : Contenu complet

### DELETE /api/testimonials/[id]
**Public** : Non (Admin uniquement)  
**Supprime** : Témoignage définitivement

---

## 🗂️ Structure Fichiers à Créer

```
src/app/
├── testimonials/
│   ├── page.js                    ✅ Existe (à modifier)
│   └── new/
│       └── page.js                ➕ À créer
├── admin/
│   └── testimonials/
│       ├── page.js                ➕ À créer (liste)
│       └── [id]/
│           └── edit/
│               └── page.js        ➕ À créer (édition)
└── api/
    └── testimonials/
        ├── route.js               ✅ Existe (à modifier)
        ├── all/
        │   └── route.js           ➕ À créer (admin)
        └── [id]/
            └── route.js           ➕ À créer (PATCH, PUT, DELETE)
```

---

## 🎯 Workflow Recommandé

### Phase 1 : Migration DB (Ajouter status)

```bash
# 1. Modifier schema.prisma
# 2. Créer migration
cd src/config
npx prisma migrate dev --name add_testimonial_status
npx prisma generate
```

### Phase 2 : API Routes

1. Modifier `GET /api/testimonials` (filtrer approved)
2. Créer `GET /api/testimonials/all` (admin)
3. Modifier `POST /api/testimonials` (status=pending)
4. Créer `PATCH /api/testimonials/[id]` (changer status)
5. Créer `PUT /api/testimonials/[id]` (modifier contenu)
6. Créer `DELETE /api/testimonials/[id]` (supprimer)

### Phase 3 : Pages Publiques

1. Modifier `/testimonials` (afficher approved)
2. Créer `/testimonials/new` (formulaire)

### Phase 4 : Pages Admin

1. Créer `/admin/testimonials` (liste + filtres)
2. Créer `/admin/testimonials/[id]/edit` (édition)

### Phase 5 : Composants

1. Créer `TestimonialCard` (affichage)
2. Créer `TestimonialForm` (création/édition)
3. Créer `TestimonialFilters` (filtres admin)

---

## 💡 Fonctionnalités Bonus

### Notifications
- Email à l'admin quand nouveau témoignage
- Email à l'user quand approuvé/rejeté

### Notes/Étoiles
- Ajouter champ `rating` (1-5)
- Afficher étoiles sur la page publique

### Statistiques
- Nombre total de témoignages
- Taux d'approbation
- Moyenne des notes

### Filtres Avancés
- Par date
- Par auteur
- Par note

---

## 🎨 Design Cohérent

Utiliser les mêmes composants que pour les projets :
- `Container` pour layouts
- `Card` pour témoignages
- `Badge` pour status
- `Button` pour actions
- `Input`/`Textarea` pour formulaires

**Status Badges** :
```jsx
<Badge variant="default">En attente</Badge>
<Badge variant="success">Approuvé</Badge>
<Badge variant="error">Rejeté</Badge>
```

---

## 🔐 Sécurité

### Validation
- Contenu requis (min 20, max 500 caractères)
- Sanitization du HTML
- Rate limiting (max 1 témoignage/user/jour)

### Permissions
- Création : User connecté
- Lecture : Public (approved uniquement)
- Modération : Admin uniquement
- Suppression : Admin uniquement

---

## ✅ Checklist Implémentation

### DB
- [ ] Ajouter champ `status` au modèle
- [ ] Créer migration
- [ ] Régénérer Prisma client

### API
- [ ] Modifier GET (filtrer approved)
- [ ] Créer GET /all (admin)
- [ ] Modifier POST (status=pending)
- [ ] Créer PATCH (changer status)
- [ ] Créer PUT (modifier)
- [ ] Créer DELETE

### Pages Publiques
- [ ] Modifier /testimonials
- [ ] Créer /testimonials/new

### Pages Admin
- [ ] Créer /admin/testimonials
- [ ] Créer /admin/testimonials/[id]/edit

### Composants
- [ ] TestimonialCard
- [ ] TestimonialForm
- [ ] TestimonialFilters

---

## 🚀 Prêt à Commencer ?

**Je recommande** : Option 2 (avec modération)

**Ordre d'implémentation** :
1. Migration DB (5 min)
2. API Routes (30 min)
3. Page publique (20 min)
4. Page création (20 min)
5. Admin liste (30 min)
6. Admin édition (20 min)

**Total estimé** : ~2h

Dis-moi quelle option tu préfères et on commence ! 🚀
