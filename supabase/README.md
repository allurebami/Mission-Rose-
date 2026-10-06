# Classement mondial Mission Rose

## 1. Créer la table

Dans Supabase, ouvre **SQL Editor**, colle le contenu de `mission-rose-leaderboard.sql`, puis exécute la requête.

La table garde le pseudo, le score et la date de chaque partie. La clé secrète n'est utilisée que par l'API Vercel; le navigateur ne se connecte jamais directement à cette table.

## 2. Ajouter les variables dans Vercel

Dans **Project → Settings → Environment Variables**, ajoute les variables pour **Production** (et Preview si nécessaire) :

- `SUPABASE_URL` : l'URL du projet Supabase, par exemple `https://<project-ref>.supabase.co`.
- `SUPABASE_SECRET_KEY` : une clé secrète `sb_secret_…` créée dans **Project Settings → API Keys**.

Pour un projet qui n'a que l'ancienne clé `service_role`, tu peux la mettre dans `SUPABASE_SERVICE_ROLE_KEY`; l'API prend aussi en charge ce nom.

Ne mets jamais la clé secrète dans `app.js`, dans une variable préfixée par `NEXT_PUBLIC_` ou `VITE_`, ni dans GitHub. Après l'ajout des variables, relance un déploiement Vercel.

## 3. Vérifier

- `GET /api/leaderboard` doit répondre avec `{ "leaders": [] }` au début.
- Après une partie, son score apparaît dans le Top 5 mondial.
- Un clic sur une catégorie de don après la partie met à jour la même entrée du classement.

Le classement V1 est public et les scores viennent du navigateur. Il convient pour le jeu et la campagne, mais ne constitue pas un classement inviolable contre les scores falsifiés.
