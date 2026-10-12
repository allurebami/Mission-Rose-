# Mission Rose

Mini-jeu web Octobre Rose soutenu par ellegagne.com.

## Fonctionnalités

- 5 niveaux et 3 difficultés, avec un contenu distinct par difficulté.
- Cumul des difficultés : maximum de **43 880 points de jeu** pour une partie parfaite complète.
- Réponses et progression validées par le serveur, avec effets visuels et sonores.
- Classement mondial Top 5 contenant uniquement des parties vérifiées.
- Identité anonyme protégée par un cookie HttpOnly, sans inscription ni code à saisir.
- Photo finale, partage WhatsApp et dons Chariow.

## Sécurité du classement (version 2)

Le navigateur demande une partie à `POST /api/game`, puis envoie uniquement des actions (`answer`, `next`, `bonus`, `finish`) avec un jeton chiffré. Il ne déclare jamais les points à enregistrer. Le serveur fournit les choix, contrôle leur identifiant, calcule les points et vérifie la progression.

Les jetons AES-256-GCM sont liés au joueur, expirent après deux heures et protègent l’état de la partie. Chaque transition utilise une ligne Appwrite créée avec un identifiant unique : une réponse différente ou une action concurrente sur la même étape est rejetée. Une requête identique après une perte de connexion peut être rejouée sans ajouter de points.

`GET /api/leaderboard` lit seulement des résultats signés côté serveur. Les anciennes écritures `POST` et `PATCH` sont fermées. `POST /api/referrals` est retiré ; les récompenses de parrainage sont liées à une partie vérifiée. Les signatures du classement sont vérifiées à chaque lecture, y compris après une éventuelle modification directe de la base ou via une ancienne version du site.

Les anciennes lignes `p_` restent en base comme historique, mais ne sont plus admises dans le classement vérifié. Les joueurs doivent terminer une nouvelle partie pour apparaître dans le Top 5. Aucune ancienne ligne n’est supprimée.

Les bonus sont bornés côté serveur :

- Bonus quotidien : 50 points, une fois par jour (Africa/Douala) et par identité anonyme.
- Catégories de soutien : 50, 100, 200 et 300 points, une fois par catégorie et par partie ; le bonus récompense le clic, sans certifier un paiement.
- Parrainage : un invité reçoit 100 points après au moins une difficulté complète ; son parrain reçoit 250 points. Un invité ne peut récompenser qu’un parrain une fois. Le bonus cumulé d’un parrain dans le classement est limité à 20 invitations (5 000 points).
- Maximum du classement, tous bonus autorisés inclus : **49 680 points**. Un score de 999 999 ne peut pas être enregistré par la nouvelle API.

Les démarrages sont limités par identité et par IP. Cette validation empêche de fabriquer des points ; elle ne prouve pas qu’un humain, plutôt qu’un programme, a choisi les réponses, ni qu’une personne possède un seul appareil.

## Configuration Appwrite / Vercel

La configuration utilise la table Appwrite existante avec uniquement `pseudo` (varchar 24) et `score` (integer). Aucun changement de schéma ni nouvelle variable n’est nécessaire.

- Endpoint : `https://fra.cloud.appwrite.io/v1`
- Projet : `6ac7bb78000880bd15bf`
- Base TablesDB : `6ac7f21e0034b245f8d7`
- Table : `6ac7f26c002d71db0449`
- Variable serveur obligatoire : `APPWRITE_API_KEY` (scopes `rows.read`, `rows.write`).
- Surcharges facultatives : `APPWRITE_ENDPOINT`, `APPWRITE_PROJECT_ID`, `APPWRITE_DATABASE_ID`, `APPWRITE_TABLE_ID`.

La clé reste exclusivement côté serveur. Les clés de chiffrement et de signature sont dérivées de cette clé avec des domaines distincts. Sa rotation invalide les sessions et les signatures déjà émises ; une rotation nécessite une migration contrôlée du classement.

Les préfixes internes séparent les résultats, preuves, propriétaires, transitions, limites et récompenses. Les lignes ont des permissions vides ; les permissions publiques de la table doivent également interdire la création, la modification et la suppression. Les limites IP sont hachées et aucune IP brute n’est stockée dans la table.

`lib/game-data.js` contient les questions, traductions et barèmes faisant autorité. Le navigateur ne télécharge que la question courante. Une connexion est nécessaire pour valider les réponses et afficher le classement.

## Vérification

```bash
node --test tests/security.test.js
node --check app.js
node --check api/game.js
```

Les tests couvrent les écritures falsifiées, l’usurpation d’identité, les jetons modifiés/expirés, les réponses concurrentes, les pertes de connexion, les limites de bonus, les parrainages, la signature des résultats et le cumul exact des trois difficultés.
