# 🔧 Correction Erreur 401 - Authentification Admin

## 🐛 Problème Initial

### Symptôme
```
Failed to load resource: the server responded with a status of 401 (Unauthorized)
```

Lors de la création/modification/suppression d'un projet depuis l'interface admin.

### Cause
Les requêtes API (POST, PUT, DELETE) nécessitent un token JWT pour l'authentification, mais celui-ci n'était pas envoyé dans les headers.

---

## ✅ Solution Appliquée

### 1. Ajout du token dans les headers

**Fichiers modifiés** :
- `src/app/admin/projects/new/page.js` (création)
- `src/app/admin/projects/[id]/edit/page.js` (édition)
- `src/app/admin/projects/page.js` (suppression)

**Changement** :
```javascript
// AVANT
const res = await fetch("/api/projects", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});

// APRÈS
const token = localStorage.getItem("token");

const res = await fetch("/api/projects", {
  method: "POST",
  headers: { 
    "Content-Type": "application/json",
    ...(token && { "Authorization": `Bearer ${token}` })
  },
  body: JSON.stringify(data),
});
```

### 2. Helper API Client

**Nouveau fichier** : `src/lib/apiClient.js`

Centralise la gestion de l'authentification pour toutes les requêtes API.

**Fonctions disponibles** :
```javascript
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/apiClient";

// GET
const res = await apiGet("/api/projects");

// POST
const res = await apiPost("/api/projects", data);

// PUT
const res = await apiPut(`/api/projects/${id}`, data);

// DELETE
const res = await apiDelete(`/api/projects/${id}`);
```

**Avantages** :
- Token ajouté automatiquement
- Code plus propre
- Réutilisable partout
- Maintenance facilitée

---

## 🔄 Workflow Corrigé

### Création de projet

```
1. User connecté → Token stocké dans localStorage
2. Formulaire rempli → /admin/projects/new
3. Submit → POST /api/projects
4. Headers: { Authorization: "Bearer <token>" }
5. API vérifie token → ✅ Autorisé
6. Projet créé → Redirect /admin/projects
7. Projet visible sur /projects
```

### Édition de projet

```
1. Clic "Modifier" → /admin/projects/[id]/edit
2. Formulaire pré-rempli
3. Modifications → Submit
4. PUT /api/projects/[id] avec token
5. API vérifie token → ✅ Autorisé
6. Projet modifié → Redirect /admin/projects
```

### Suppression de projet

```
1. Clic "Supprimer" → Confirmation
2. DELETE /api/projects/[id] avec token
3. API vérifie token → ✅ Autorisé
4. Projet supprimé → Mise à jour liste
```

---

## 🔐 Sécurité

### Vérification côté API

**Fichier** : `src/app/api/projects/route.js`

```javascript
export async function POST(request) {
  // Vérification auth
  const authUser = getAuthUser(request);
  if (!authUser) {
    return NextResponse.json(
      { error: "Non autorise." }, 
      { status: 401 }
    );
  }
  
  // Suite du traitement...
}
```

### Stockage du token

**Où** : `localStorage` (clé: `token`)

**Quand** :
- Stocké lors du login (`/api/auth/login`)
- Utilisé pour toutes les requêtes authentifiées
- Supprimé lors du logout

**Sécurité** :
- Token JWT signé
- Expiration configurée
- Vérifié côté serveur

---

## 📊 Tests de Validation

### ✅ Checklist

- [x] Création projet → Fonctionne
- [x] Édition projet → Fonctionne
- [x] Suppression projet → Fonctionne
- [x] Token envoyé dans headers
- [x] API vérifie token
- [x] Erreur 401 si pas de token
- [x] Redirect login si non connecté

### Vérification manuelle

1. **Ouvrir DevTools** → Network tab
2. **Créer un projet** → /admin/projects/new
3. **Vérifier requête** POST /api/projects
4. **Onglet Headers** → Voir `Authorization: Bearer <token>`
5. **Onglet Response** → Voir projet créé (201)

---

## 🛠️ Commits

### 1. Correction auth
```
fix(admin): Ajout token JWT dans headers pour auth API
Commit: 785030b
```

**Changements** :
- Ajout récupération token localStorage
- Ajout Authorization header
- Correction erreur 401

### 2. Helper API
```
feat(lib): Ajout helper apiClient pour requêtes authentifiées
Commit: 1fda8f0
```

**Changements** :
- Création apiClient.js
- Fonctions apiGet, apiPost, apiPut, apiDelete
- Documentation troubleshooting

---

## 📝 Documentation

### Fichiers créés
- `TROUBLESHOOTING.md` - Guide dépannage complet
- `FIX_AUTH_SUMMARY.md` - Ce fichier

### Fichiers modifiés
- `src/app/admin/projects/new/page.js`
- `src/app/admin/projects/[id]/edit/page.js`
- `src/app/admin/projects/page.js`

### Fichiers ajoutés
- `src/lib/apiClient.js`

---

## 🚀 Utilisation Future

### Pour ajouter une nouvelle route protégée

**Option 1 : Utiliser apiClient**
```javascript
import { apiPost } from "@/lib/apiClient";

async function createTestimonial(data) {
  const res = await apiPost("/api/testimonials", data);
  return res.json();
}
```

**Option 2 : Manuel**
```javascript
const token = localStorage.getItem("token");

const res = await fetch("/api/testimonials", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` })
  },
  body: JSON.stringify(data),
});
```

---

## ✅ Résultat

### Avant
- ❌ Erreur 401 lors création projet
- ❌ Impossible de modifier
- ❌ Impossible de supprimer
- ❌ Admin non fonctionnel

### Après
- ✅ Création projet fonctionne
- ✅ Édition projet fonctionne
- ✅ Suppression projet fonctionne
- ✅ Admin 100% fonctionnel
- ✅ Token envoyé automatiquement
- ✅ Helper réutilisable

---

**Status** : 🎉 Problème résolu - Admin CRUD entièrement fonctionnel
