# 📦 StockFlow

**StockFlow** est une application web de gestion de stock en temps réel pour les entreprises, développée avec **Next.js 15**, **React 19**, **TypeScript**, et **Prisma**.  
Elle permet la gestion des entreprises, des employés, des produits, des catégories et des droits d’accès selon les rôles.

---

## 🚀 Fonctionnalités

- ✅ Authentification sécurisée (inscription / connexion)
- 🏢 Gestion des entreprises et des employés
- 📦 CRUD Produits avec affectation à des catégories
- 🗃️ Association produits ↔ catégories (relation N:N)
- 🔄 Suivi des stocks en temps réel avec WebSockets (optionnel)
- 💡 Interface moderne avec Shadcn UI + TailwindCSS
- 🧪 Tests unitaires et fonctionnels avec Vitest

---

## 🛠️ Stack technique

| Technologie     | Utilisation                          |
| --------------- | ------------------------------------ |
| **Next.js 15**  | Framework fullstack + App Router     |
| **Prisma**      | ORM avec PostgreSQL                  |
| **React 19**    | Composants interactifs               |
| **TailwindCSS** | Style rapide et responsive           |
| **Shadcn UI**   | Composants UI modernes & accessibles |
| **Zod**         | Validation de schémas côté serveur   |
| **React Query** | Fetch & cache côté client            |
| **Zustand**     | Gestion d’état légère et performante |
| **Vitest**      | Tests unitaires                      |
| **Socket.io**   | Temps réel (optionnel)               |

---

## 🧑‍💻 Installation & Lancement

> 💡 Ces étapes partent du principe que vous clonez le projet depuis GitHub.

### 1. 📥 Cloner le dépôt

```bash
git clone https://github.com/Ykolo/StockFlow.git
cd stockflow
```

### 2. Installer pnpm

```bash
npm install -g pnpm
```

### 3. Installer les dépendances

```bash
pnpm install
```

### 4. ⚙️ Configurer les variables d’environnement

Copiez le fichier `.env` et remplissez les variables d’environnement. Créer la base de données PostgreSQL et l’initialiser.

### 5. Remplir la base de données PostgreSQL

```bash
node prisma/seed.js
```

### En cas de problème vous pouvez supprimer la base de données et la réinitialiser

```bash
node prisma/reset.js
```

### 6. Lancer l’application

```bash
pnpm dev
```

### Pour les tests unitaires

```bash
pnpm test
```
