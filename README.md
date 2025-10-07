# MyContacts
## Description
MyContacts est un projet étudiant réalisé dans le cadre du cours **Full Stack JS** à l’EFREI.  
L’application permet de gérer une liste de contacts (CRUD) avec authentification (JWT) et une interface React connectée à une API Express/MongoDB.

## Liens des consignes
- [Vue d’ensemble du module](https://my-contacts.notion.site/Vue-d-ensemble-Module-Fullstack-JS-2619d6f745f180af992ce3e1b08b24ec)
- [Projet fil rouge - MyContacts](https://my-contacts.notion.site/Projet-fil-rouge-MyContacts-2619d6f745f180a293a0c810791a698f)
- [Jour 1 - Authentification & Mise en place](https://my-contacts.notion.site/Jour-1-Authentification-Mise-en-place-2619d6f745f18059aa5be8005cfc74cd)
- [Jour 2 - CRUD Contacts](https://my-contacts.notion.site/Jour-2-CRUD-Contacts-2619d6f745f1809bb68cc82c1f7deda5)
- [Jour 3 - Frontend & Sécurité](https://my-contacts.notion.site/Jour-3-Frontend-S-curit-2619d6f745f180f5b450eb640394d331)
- [Jour 3 bis - Favoris](https://my-contacts.notion.site/Jour-3-bis-Favoris-2839d6f745f180789a9ad43bd0d106d7)
- [Jour 4 - Soutenance & Finalisation](https://my-contacts.notion.site/Jour-4-Soutenances-Finalisation-2619d6f745f180c6a106f8f5bdf8d64c)

## ⚙️ Installation
### 🖥️ Backend (Express + MongoDB)
1. **Installer les dépendances**
   ```bash
   cd server
   npm install

2. **Configurer les variables d’environnement (server/.env)**
   ```bash
    DATABASE_URL=your_mongodb
    SECRET=earth_is_flat

2. **Lancer le serveur**
   ```bash
    npm start

- API locale : http://localhost:3000
- Documentation Swagger : http://localhost:3000/swagger

### 🖥️ Frontend (Express + MongoDB)
1. **Installer les dépendances**
   ```bash
   cd client
   npm install

2. **Configurer les variables d’environnement (client/.env)**
   ```bash
    VITE_API_URL=http://localhost:3000
   
2. **Lancer le serveur**
   ```bash
    npm run dev

## 🧩 Travail effectué
### 🖥️ Backend
#### 🔗 Endpoints

- **POST /user** — Inscription d’un nouvel utilisateur avec hash du mot de passe.  
- **GET /user** — Récupère la liste de tous les utilisateurs.  
- **POST /user/login** — Authentifie un utilisateur et retourne un token.  
- **GET /contact** — Récupère les contacts de l’utilisateur connecté.  
- **POST /contact** — Ajoute un nouveau contact.  
- **PUT /contact/:id** — Met à jour un contact existant.  
- **DELETE /contact/:id** — Supprime un contact.  

#### 🛡️ Middleware
- **authMiddleware** — Vérifie la présence et la validité du token JWT pour sécuriser les endpoints liés aux contacts.

#### 📄 Documentation API (Swagger)
- **Swagger UI + swagger-jsdoc** — Mise en place de la documentation interactive pour tous les endpoints (`/user`, `/contact`) afin de faciliter les tests et la visualisation de l’API.

#### 🧪 Tests unitaires
- **Jest** — Création de tests unitaires pour les endpoints (`/user`, `/contact`) afin de vérifier les fonctionnalités CRUD et l’authentification.  
- **IA autorisée** — Utilisation d’outils d’IA pour générer rapidement des cas de tests représentatifs.

