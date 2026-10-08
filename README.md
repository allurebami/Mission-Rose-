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

La base **Mission Rose Classement** de type TablesDB et son ID `6ac7f21e0034b245f8d7` sont créés dans le projet `6ac7bb78000880bd15bf` (endpoint `https://fra.cloud.appwrite.io/v1`).

La table **Scores Mission Rose** est créée avec l'ID `6ac7f26c002d71db0449`. Elle contient les colonnes suivantes :

- `pseudo` : colonne `varchar`, taille 24.
- `score` : colonne `integer`.
- Un index clé décroissant sur `score`.

Créer une clé API limitée aux scopes `rows.read` et `rows.write` dans le projet Appwrite. Dans les variables d'environnement du projet Vercel, définir :

- `APPWRITE_API_KEY` : la clé API secrète, uniquement côté serveur.

L'endpoint, l'ID projet, l'ID de la base et l'ID de la table sont préconfigurés par défaut dans la fonction serveur. Ils peuvent être remplacés avec `APPWRITE_ENDPOINT`, `APPWRITE_PROJECT_ID`, `APPWRITE_DATABASE_ID` et `APPWRITE_TABLE_ID`.

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
