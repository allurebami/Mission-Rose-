# Mission Rose V1

Mini-jeu web Octobre Rose soutenu par ellegagne.com.

## Fonctionnalités

- 5 niveaux de sensibilisation et 3 difficultés.
- Score avec multiplicateur selon la difficulté.
- Classement mondial Top 5 via Appwrite (pseudo et score uniquement).
- Photo finale avec badge et score.
- Partage WhatsApp.
- Bouton de don pour soutenir 5 femmes dans le besoin.

## Configuration du classement Appwrite

Le navigateur envoie les scores à `/api/leaderboard`. La clé Appwrite reste uniquement dans les variables d'environnement serveur de Vercel.

Dans le projet Appwrite `6ac7bb78000880bd15bf` sur `https://fra.cloud.appwrite.io/v1` :

1. Dans **Databases**, créer une base de type **DocumentsDB**.
2. Dans cette base, créer une collection. DocumentsDB est schemaless : il n'est pas nécessaire de déclarer les champs à l'avance.
3. Dans la collection, créer un index clé en ordre décroissant sur l'attribut `score`.
4. Créer une clé API limitée aux autorisations `documentsdb.documents.read` et `documentsdb.documents.write`.

Dans les variables d'environnement du projet Vercel, définir :

- `APPWRITE_API_KEY` : la clé API secrète, uniquement côté serveur.
- `APPWRITE_DATABASE_ID` : l'identifiant de la base créée.
- `APPWRITE_COLLECTION_ID` : l'identifiant de la collection créée.

L'endpoint et l'ID du projet ont déjà leurs valeurs par défaut dans la fonction serveur. Ils peuvent aussi être définis explicitement avec `APPWRITE_ENDPOINT` et `APPWRITE_PROJECT_ID`.

Ne jamais placer `APPWRITE_API_KEY` dans `app.js`, `index.html` ou une variable publique `VITE_*`.

## Lancer le jeu

Ouvrir `index.html` dans un navigateur moderne.

Pour tester le site statique localement :

```bash
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000`. Le classement mondial nécessite la fonction serveur déployée sur Vercel et sa configuration Appwrite.

## Autres évolutions envisagées

- Ajouter un prestataire de paiement pour suivre les dons.
- Créer une page d'administration pour valider les bénéficiaires et publier le résumé de transparence.
- Ajouter les logos officiels des partenaires et un domaine dédié.
