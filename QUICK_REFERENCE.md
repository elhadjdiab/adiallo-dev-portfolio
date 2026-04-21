# 🚀 Référence Rapide - Portfolio Admin

## 📍 URLs Importantes

```
Public:
/                    → Home
/projects            → Liste projets
/projects/[id]       → Détail projet
/testimonials        → Témoignages
/contact             → Contact

Auth:
/login               → Connexion
/register            → Inscription

Admin (protégé):
/admin               → Dashboard
/admin/projects      → Liste projets admin
/admin/projects/new  → Créer projet
/admin/projects/[id]/edit → Modifier projet
```

---

## 🔑 Authentification

### Login
```javascript
// Stocke automatiquement le token
POST /api/auth/login
Body: { email, password }
→ Token stocké dans localStorage
```

### Utiliser le token
```javascript
// Option 1: Helper (recommandé)
import { apiPost } from "@/lib/apiClient";
await apiPost("/api/projects", data);

// Option 2: Manuel
const token = localStorage.getItem("token");
fetch(url, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

---

## 📝 CRUD Projets

### Créer
```
1. /admin/projects → "Nouveau projet"
2. Remplir formulaire
3. Ajouter technologies (Enter ou +)
4. Submit → Projet créé
```

### Modifier
```
1. /admin/projects → "Modifier"
2. Modifier champs
3. Submit → Projet modifié
```

### Supprimer
```
1. /admin/projects → "Supprimer"
2. Confirmer → Projet supprimé
```

---

## 🛠️ Commandes Utiles

```bash
# Développement
npm run dev

# Build
npm run build

# Base de données
cd src/config
npx prisma studio        # Interface DB
npx prisma generate      # Régénérer client
npx prisma migrate dev   # Migrations

# Debug
# DevTools → Console (erreurs JS)
# DevTools → Network (erreurs API)
# DevTools → Application → localStorage (token)
```

---

## 🐛 Dépannage Rapide

### Erreur 401
```
→ Vérifier token dans localStorage
→ Se reconnecter si absent/expiré
```

### Projet ne s'affiche pas
```
→ Vérifier console pour erreurs
→ Vérifier /api/projects retourne data
→ Rafraîchir la page
```

### Warning React
```
→ Redirections doivent être dans useEffect
→ Pas de setState pendant render
```

---

## 📊 Structure Composants UI

```javascript
import { 
  Button,    // primary, secondary, ghost
  Card,      // hover={true|false}
  Badge,     // default, primary, success, error
  Input,     // label, error
  Textarea,  // label, error, rows
  Container  // size: sm, md, lg, xl
} from "@/components/ui";
```

---

## 🎨 Design Tokens

```css
Background: #0B0F14
Surface:    #111827
Primary:    #6366F1 (indigo)
Accent:     #22C55E (green)
Error:      #EF4444 (red)

Animation:  400ms, easeOut
```

---

## ✅ Checklist Déploiement

- [ ] `npm run build` → Succès
- [ ] Pas d'erreurs console
- [ ] Pas de warnings React
- [ ] Auth fonctionne
- [ ] CRUD fonctionne
- [ ] Variables env configurées
- [ ] Base de données migrée

---

## 📚 Documentation Complète

- `README.md` - Documentation projet
- `DESIGN_SYSTEM.md` - Guide design
- `ADMIN_GUIDE.md` - Guide admin
- `TROUBLESHOOTING.md` - Dépannage
- `CORRECTIONS_FINALES.md` - Corrections

---

**Version**: 1.0.0 - Admin CRUD Complet
