# 📚 Guide d'Administration - Gestion des Projets

## 🎯 Vue d'ensemble

L'interface d'administration permet de gérer les projets du portfolio avec un CRUD complet (Create, Read, Update, Delete).

---

## 🔐 Accès

### 1. Connexion
```
URL: /login
Email: votre@email.com
Password: votre-mot-de-passe
```

### 2. Dashboard Admin
```
URL: /admin
```

Après connexion, vous accédez au dashboard avec 3 sections :
- ✅ **Projets** (fonctionnel)
- 🚧 Témoignages (à venir)
- 🚧 Messages (à venir)

---

## 📁 Gestion des Projets

### Liste des projets
```
URL: /admin/projects
```

**Features** :
- Vue d'ensemble de tous les projets
- Compteur total
- Actions : Modifier, Supprimer
- Bouton "Nouveau projet"

### Créer un projet
```
URL: /admin/projects/new
```

**Champs** :
- **Titre** (requis) : Nom du projet
- **Description** (requis) : Description détaillée
- **URL image** (optionnel) : Lien vers une image
- **URL GitHub** (optionnel) : Lien vers le repo
- **URL démo** (optionnel) : Lien vers la démo live
- **Technologies** : Liste de technologies (ajout multiple)

**Workflow** :
1. Remplir le formulaire
2. Ajouter des technologies (Enter ou bouton +)
3. Cliquer "Créer le projet"
4. Redirection vers la liste

### Modifier un projet
```
URL: /admin/projects/[id]/edit
```

**Workflow** :
1. Depuis la liste, cliquer "Modifier"
2. Modifier les champs souhaités
3. Ajouter/supprimer des technologies
4. Cliquer "Enregistrer les modifications"
5. Redirection vers la liste

### Supprimer un projet
**Workflow** :
1. Depuis la liste, cliquer "Supprimer"
2. Confirmer la suppression
3. Le projet est supprimé immédiatement

---

## 🎨 Affichage Public

### Page Projets
```
URL: /projects
```

Les projets créés s'affichent automatiquement sur la page publique :
- Grid responsive (1/2/3 colonnes)
- Card par projet
- Technologies en badges
- Liens démo + GitHub
- Lien vers détail

### Page Détail
```
URL: /projects/[id]
```

Affichage complet d'un projet :
- Titre + description
- Technologies
- Image (si disponible)
- Liens démo + GitHub
- Date de création

---

## 📊 Structure des Données

### Modèle Project (Prisma)
```prisma
model Project {
  id           Int                  @id @default(autoincrement())
  title        String
  description  String
  imageUrl     String?
  githubUrl    String?
  liveUrl      String?
  createdAt    DateTime             @default(now())
  technologies ProjectTechnology[]
}
```

### API Endpoints

**GET /api/projects**
- Liste tous les projets
- Public

**GET /api/projects/[id]**
- Détail d'un projet
- Public

**POST /api/projects**
- Créer un projet
- Body: { title, description, imageUrl?, githubUrl?, liveUrl?, technologies[] }

**PUT /api/projects/[id]**
- Modifier un projet
- Body: { title, description, imageUrl?, githubUrl?, liveUrl?, technologies[] }

**DELETE /api/projects/[id]**
- Supprimer un projet

---

## 💡 Conseils d'Utilisation

### Technologies
- Appuyer sur **Enter** pour ajouter rapidement
- Cliquer sur **X** pour supprimer
- Exemples : React, Next.js, Tailwind CSS, Prisma, Redux

### URLs
- Toujours inclure `https://`
- GitHub : `https://github.com/username/repo`
- Démo : `https://demo.example.com`
- Image : `https://example.com/image.jpg`

### Description
- Soyez concis mais informatif
- 2-3 phrases suffisent
- Évitez le jargon marketing

---

## 🔄 Workflow Complet

### Ajouter un nouveau projet

1. **Connexion**
   ```
   /login → /admin
   ```

2. **Accéder à la gestion**
   ```
   Dashboard → Projets → Nouveau projet
   ```

3. **Remplir le formulaire**
   ```
   Titre: "Portfolio Next.js"
   Description: "Portfolio moderne avec Next.js et Tailwind CSS"
   GitHub: "https://github.com/username/portfolio"
   Démo: "https://portfolio.example.com"
   Technologies: Next.js, React, Tailwind CSS, Prisma
   ```

4. **Créer**
   ```
   Bouton "Créer le projet"
   ```

5. **Vérifier**
   ```
   /projects → Le projet apparaît dans la liste
   ```

---

## 🐛 Dépannage

### Le projet ne s'affiche pas
- Vérifier que le titre et la description sont remplis
- Rafraîchir la page `/projects`
- Vérifier la console pour les erreurs

### Erreur lors de la création
- Vérifier la connexion à la base de données
- Vérifier que tous les champs requis sont remplis
- Vérifier les URLs (format valide)

### Impossible de supprimer
- Vérifier que vous êtes connecté
- Rafraîchir la page et réessayer
- Vérifier la console pour les erreurs

---

## 🎯 Prochaines Étapes

### Améliorations possibles
- [ ] Upload d'images (au lieu d'URLs)
- [ ] Drag & drop pour réorganiser
- [ ] Filtres et recherche
- [ ] Prévisualisation avant publication
- [ ] Statistiques (vues, clics)

### Autres sections admin
- [ ] Gestion des témoignages
- [ ] Consultation des messages
- [ ] Paramètres du site

---

## 📝 Notes

- Les projets sont publics dès leur création
- Pas de système de brouillon pour le moment
- Les modifications sont instantanées
- La suppression est définitive (pas de corbeille)

---

**Besoin d'aide ?** Consultez la documentation technique dans `README.md`
