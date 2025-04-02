# Model Context Protocol (MCP) - Démonstration avec une API Utilisateurs

## 🚀 La révolution du MCP

Le Model Context Protocol (MCP) transforme les assistants IA comme Claude de simples générateurs de texte en véritables agents capables d'interagir avec vos systèmes informatiques.

Ce projet démontre concrètement cette révolution à travers une simple API de gestion d'utilisateurs, connectée à Claude via un serveur MCP.

## 💡 Pourquoi c'est révolutionnaire ?

Demandez simplement à Claude :
- "Crée un utilisateur nommé Jean Dupont, 42 ans, rôle administrateur"
- "Liste tous les utilisateurs dont l'âge est supérieur à 30 ans"
- "Mets à jour le rôle de l'utilisateur #3 en 'manager'"
- "Supprime l'utilisateur #5"

Et Claude exécutera ces actions instantanément, sans interface spécifique à développer !

## 🔧 Technologies utilisées

- **Backend** : TypeScript, Node.js, Express
- **Base de données** : TypeORM, SQLite
- **MCP** : Model Context Protocol SDK
- **Intégration** : Claude pour Desktop

## 🛠️ Architecture du projet

Le projet se compose de deux parties principales :

1. **API REST utilisateurs** : Gestion CRUD classique des utilisateurs
2. **Serveur MCP** : Pont entre Claude et l'API

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────┐
│                 │     │                 │     │             │
│  Claude/IA      │────▶│  Serveur MCP    │────▶│  API REST   │
│  Assistant      │◀────│                 │◀────│             │
│                 │     │                 │     │             │
└─────────────────┘     └─────────────────┘     └─────────────┘
```

## 🚀 Installation et démarrage

### Prérequis
- Node.js (v16+)
- npm (v7+)

### Installation
```bash
# Installer les dépendances
npm install

# Construire l'API
npm run build

# Construire le serveur MCP
npm run build:mcp
```

### Utilisation locale
```bash
# Démarrer l'API en développement
npm run dev

# Dans un autre terminal, démarrer le serveur MCP
npm run start:mcp

# Ou utiliser le script pour démarrer les deux serveurs en même temps
./start-servers.sh
```

## 🔌 Configuration de Claude Desktop

Modifiez le fichier de configuration de Claude (`~/Library/Application Support/Claude/claude_desktop_config.json`) :
```json
{
    "mcpServers": {
        "user-api": {
            "command": "node",
            "args": [
                "/CHEMIN/ABSOLU/VERS/PROJET/mcp-server/dist/mcp/index.js"
            ],
            "env": {
                "API_URL": "http://localhost:4000/api"
            }
        }
    }
}
```

Remplacez `/CHEMIN/ABSOLU/VERS/PROJET` par le chemin absolu vers le dossier du projet sur votre machine.

## 📚 API REST - Points d'accès

- `GET /api/users` - Obtenir tous les utilisateurs
- `GET /api/users/:id` - Obtenir un utilisateur par ID
- `POST /api/users` - Créer un nouvel utilisateur
- `PUT /api/users/:id` - Mettre à jour un utilisateur
- `DELETE /api/users/:id` - Supprimer un utilisateur

## 🧰 Outils MCP disponibles

- `list-users` - Lister tous les utilisateurs
- `get-user` - Obtenir un utilisateur par ID
- `create-user` - Créer un nouvel utilisateur
- `update-user` - Mettre à jour un utilisateur existant
- `delete-user` - Supprimer un utilisateur

## 💡 Possibilités d'extension

Ce projet n'est qu'un point de départ. Le MCP ouvre la voie à :

- Intégration avec des systèmes CRM complexes
- Automatisation de workflows multi-étapes
- Création d'agents IA spécialisés pour vos données
- Interfaces conversationnelles pour tous vos outils internes

## 📖 Documentation MCP

Pour en savoir plus sur le Model Context Protocol :
[Documentation officielle MCP](https://docs.anthropic.com/claude/docs/model-context-protocol)# mcp-exemple
