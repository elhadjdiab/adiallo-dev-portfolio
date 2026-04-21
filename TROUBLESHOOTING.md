# 🔧 Guide de Dépannage

## Erreurs Courantes et Solutions

---

## 🔐 Erreur 401 Unauthorized

### Symptôme
```
Failed to load resource: the server responded with a status of 401 (Unauthorized)
```

### Cause
Le token JWT n'est pas envoyé dans les headers de la requête API.

### Solution
✅ **Corrigé** - Le token est maintenant automatiquement récupéré depuis `localStorage` et ajouté aux headers.

### Vérification
1. Ouvrir DevTools → Application → Local Storage
2. Vérifier que `token` existe
3. Si absent, se reconnecter via `/login`

---

## 🔑 Token Expiré

### Symptôme
- Erreur 401 après un certain temps
- Déconnexion automatique

### Cause
Le token JWT a une durée de vie limitée.

### Solution
```javascript
// Se reconnecter
1. Aller sur /login
2. Entrer identifiants
3. Le nouveau token sera stocké
```

---

## 📝 Erreur lors de la création de projet

### Symptôme
```
Erreur lors de la création
```

### Causes possibles
1. **Champs requis manquants**
   - Titre vide
   - Description vide

2. **Problème de connexion DB**
   - Base de données non accessible
   - Prisma non configuré

3. **Token invalide**
   - Token expiré
   - Token corrompu

### Solutions

#### 1. Vérifier les champs
```javascript
// Titre et description sont REQUIS
title: "Mon projet"        // ✅ OK
description: "Description"  // ✅ OK

title: ""                  // ❌ Erreur
description: ""            // ❌ Erreur
```

#### 2. Vérifier la base de données
```bash
# Vérifier que la DB existe
ls src/config/dev.db

# Si absent, recréer
cd src/config
npx prisma migrate dev
npx prisma generate
```

#### 3. Se reconnecter
```
/login → Entrer identifiants → Réessayer
```

---

## 🗄️ Base de données

### Erreur: "Cannot find module '@prisma/client'"

**Solution**:
```bash
cd src/config
npm install
npx prisma generate
cd ../..
```

### Erreur: "Database not found"

**Solution**:
```bash
cd src/config
npx prisma migrate dev
cd ../..
```

---

## 🔄 Projets ne s'affichent pas

### Sur /projects (page publique)

**Vérifications**:
1. Ouvrir DevTools → Network
2. Vérifier requête `GET /api/projects`
3. Vérifier réponse (doit être un array)

**Solutions**:
```bash
# Vérifier la DB
cd src/config
npx prisma studio

# Vérifier qu'il y a des projets
# Si vide, créer via /admin/projects/new
```

### Sur /admin/projects (admin)

**Vérifications**:
1. Vérifier connexion (token présent)
2. Vérifier console pour erreurs
3. Vérifier Network tab

**Solution**:
```javascript
// Se reconnecter si nécessaire
/login → /admin/projects
```

---

## 🎨 Styles ne s'appliquent pas

### Symptôme
- Composants sans style
- Layout cassé

### Cause
- Tailwind CSS non compilé
- Classes manquantes

### Solution
```bash
# Redémarrer le serveur
npm run dev

# Vérifier globals.css
cat src/styles/globals.css
```

---

## 🔄 Animations ne fonctionnent pas

### Symptôme
- Pas d'animations
- Transitions instantanées

### Cause
- Framer Motion non installé
- prefers-reduced-motion activé

### Solution
```bash
# Vérifier installation
npm list framer-motion

# Si absent
npm install framer-motion

# Vérifier préférences système
# macOS: Préférences Système → Accessibilité → Affichage
# Décocher "Réduire les animations"
```

---

## 📱 Responsive cassé

### Symptôme
- Layout cassé sur mobile
- Débordements

### Vérification
```javascript
// Ouvrir DevTools
// Toggle device toolbar (Cmd+Shift+M)
// Tester différentes tailles
```

### Solution
```bash
# Vérifier Tailwind config
# Redémarrer serveur
npm run dev
```

---

## 🚀 Build échoue

### Symptôme
```
npm run build
Error: ...
```

### Solutions courantes

#### 1. Erreur TypeScript
```bash
# Vérifier diagnostics
# Corriger erreurs signalées
```

#### 2. Erreur Prisma
```bash
cd src/config
npx prisma generate
cd ../..
npm run build
```

#### 3. Erreur dépendances
```bash
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

---

## 🔍 Debug Mode

### Activer les logs détaillés

```javascript
// Dans les pages admin, ajouter:
console.log("Token:", localStorage.getItem("token"));
console.log("Response:", await res.json());
```

### Vérifier les requêtes API

```javascript
// DevTools → Network
// Filtrer: Fetch/XHR
// Cliquer sur requête
// Onglet Headers: vérifier Authorization
// Onglet Response: vérifier réponse
```

---

## 📞 Support

### Checklist avant de demander de l'aide

- [ ] Vérifier console (erreurs JS)
- [ ] Vérifier Network tab (erreurs API)
- [ ] Vérifier token (localStorage)
- [ ] Vérifier base de données (Prisma Studio)
- [ ] Redémarrer serveur
- [ ] Vider cache navigateur

### Informations à fournir

1. Message d'erreur exact
2. Screenshot console
3. Screenshot Network tab
4. Étapes pour reproduire
5. Navigateur et version

---

## 🛠️ Commandes Utiles

```bash
# Redémarrer serveur
npm run dev

# Vérifier DB
cd src/config && npx prisma studio

# Régénérer Prisma
cd src/config && npx prisma generate

# Migrations
cd src/config && npx prisma migrate dev

# Build production
npm run build

# Vérifier diagnostics
# (via IDE ou outils)

# Vider cache
rm -rf .next
npm run dev
```

---

## ✅ Tout fonctionne ?

Si tout est OK, vous devriez pouvoir :
- ✅ Se connecter via /login
- ✅ Accéder à /admin
- ✅ Créer un projet via /admin/projects/new
- ✅ Voir le projet sur /projects
- ✅ Modifier le projet
- ✅ Supprimer le projet

---

**Dernière mise à jour**: Après correction erreur 401
