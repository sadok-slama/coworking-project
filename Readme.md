#    Application de Gestion d’Espace de Coworking

##  Objectif
Application interne destinée à gérer un espace de coworking : réservation de packs, ventes, dépenses, statistiques, et gestion dynamique des produits et services.

---

##  Stack Technique

- **Frontend** : React.js (Vite)
- **Backend** : PHP (Vanilla PHP en REST API)
- **Base de données** : MySQL
- **Hébergement** :
  - Frontend : Local (Vite, port 5173)
  - Backend : Local (XAMPP / WAMP)

---

##  Fonctionnalités

-  Connexion / Inscription admin
-  Réservations liées à des packs définis (journée, mois, année)
-  Ventes rapides de produits (ex : carte, chaise, iPhone)
-  Enregistrement de dépenses avec catégorisation
-  Statistiques & tableaux de bord (revenus/dépenses, graphiques)
-  CRUD complet sur packs et produits

---

##  Installation locale

###  Prérequis
- Node.js + npm
- Serveur local (XAMPP, WAMP ou équivalent)
- MySQL
- Vite (déjà inclus avec React)

---

###  Backend (PHP)
1. Lancer XAMPP ou WAMP
2. Copier le dossier `backend/` dans `htdocs`
3. Créer une base de données nommée `coworking`
4. Importer le fichier `.sql` :
   - Aller sur `phpMyAdmin`
   - Cliquer sur la BDD `coworking`
   - Importer :  
     `D:\3A42-ESPRIT\coworking\coworking-backend\database\coworking.sql`
5. Vérifier la configuration de connexion dans `config.php` :
```php
$host = "localhost";
$dbname = "coworking";
$username = "root";
$password = "";
```

---

###  Frontend (React.js)
```bash
cd frontend
npm install
npm run dev
```

 Ouvrir dans le navigateur :  
http://localhost:5173/register
---

##  Routes principales (interface React)

| Page         | URL                          |
|--------------|-------------------------------|
| Connexion    | `/login`                      |
| Inscription  | `/register`                   |
| Dashboard    | `/dashboard`                  |
| Réservations | `/bookings`                   |
| Produits     | `/products`                   |
| Packs        | `/packs`                      |
| Ventes       | `/sales`                      |
| Dépenses     | `/expenses`                   |

---

##  Exemples de Packs

| Nom           | Contenu                            | Durée (j) | Prix (DT) |
|---------------|-------------------------------------|-----------|-----------|
| Pack Sport    | protéine - créatine - shaker       | 20        | 200.00    |
| Pack Football | Grimp - Ballon du CL               | 10        | 280.00    |
| Pack Étudiant | PC - KEYBOARD - NOTEBOOK           | 5         | 1000.00   |
| Pack ESPRIT   | dev web et mobile                  | 365       | 1200.00   |

---

##  Exemples de Produits

- Carte – 130.00 DT  
- Chaise – 40.00 DT  
- Chargeur – 80.85 DT  
- iPhone – 2500.00 DT  
- Stylo – 2.50 DT

---

##  Catégories de Dépenses

- Loyer
- Fournitures
- Maintenance
- Salaires
- Autre

---

##  Structure du projet

```
coworking-project/
├── frontend/         → Application React.js
├── backend/          → API PHP
│   └── config.php    → Connexion MySQL
├── database/
│   └── coworking.sql → Dump MySQL complet
├── README.md         → Fichier de documentation
```

---

##  Tableau de Bord

Statistiques affichées :
- Revenu et dépenses par période
- Moyenne journalière de réservations
- Solde net actuel
- Graphiques (camemberts / barres)

---

##  Données de connexion

- Tu définis l’admin au moment de l'inscription (`/register`)
- Authentification sécurisée avec mot de passe hashé en BDD

---

##  Vidéo démo
Non disponible pour le moment. *(à ajouter plus tard si besoin)*

---

##  État du projet

| Élément                             | État              |
|--------------------------------|--------------- |
|  Développement                | ✅ Terminé |
|  Responsive design           | ✅ OK         |
|  Tests manuels                   | ✅ Faits      |
|  Export BDD                     | ✅ Fait        |
|  Documentation                | ✅ Incluse   |
