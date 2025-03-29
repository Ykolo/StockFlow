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
git clone https://github.com/<votre-utilisateur>/stockflow.git
cd stockflow
```
