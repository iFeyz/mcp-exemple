# System Patterns

## System Architecture
The MCP-Server project follows a layered architecture consisting of two main components:

1. **User API (Express REST API)**:
   - Standard HTTP-based REST API
   - Follows MVC-like pattern with routes, controllers, and entities
   - Uses TypeORM for database interaction
   - SQLite as the database backend

2. **MCP Server (Model Context Protocol)**:
   - Standalone server exposing API functionality via MCP
   - Acts as a bridge between AI assistants and the API
   - Translates natural language intents to API calls
   - Returns structured data to AI assistants

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────┐
│                 │     │                 │     │             │
│  Claude/AI      │────▶│  MCP Server     │────▶│  User API   │
│  Assistant      │◀────│                 │◀────│             │
│                 │     │                 │     │             │
└─────────────────┘     └─────────────────┘     └─────────────┘
```

## Key Technical Decisions

### API Implementation
- **Express.js**: Lightweight and flexible Node.js web application framework
- **TypeScript**: For type safety and better developer experience
- **TypeORM**: ORM to handle database operations with a clean abstraction
- **SQLite**: Simple, file-based database for ease of setup and demonstration

### MCP Integration
- **Model Context Protocol SDK**: Official SDK for implementing MCP servers
- **Tool-based Approach**: API endpoints exposed as discrete tools through MCP
- **JSON Schema**: Used to define the structure of tool parameters and responses
- **Standalone Server**: MCP server runs independently from the main API

## Design Patterns

### Repository Pattern
- Entity classes represent database tables
- TypeORM repositories handle database operations
- Controllers use repositories to interact with the database

### Controller Pattern
- Controllers handle the business logic
- Each controller is responsible for a specific entity (e.g., UserController)
- Controllers parse requests, call appropriate services, and format responses

### Route Pattern
- Routes define the API endpoints
- Each route is connected to a specific controller method
- Routes handle HTTP method mapping and parameter extraction

### Adapter Pattern
- MCP Server acts as an adapter between the AI assistant and the API
- Translates MCP tool calls to API requests
- Formats API responses into MCP-compatible formats

## Component Relationships

### User API Flow
```
Request → Routes → Controllers → TypeORM Repositories → SQLite Database
Response ← Routes ← Controllers ← TypeORM Repositories ← SQLite Database
```

### MCP Server Flow
```
Tool Call → MCP Handler → API Client → User API
Tool Response ← MCP Handler ← API Client ← User API
```

## Error Handling
- HTTP status codes for REST API errors
- Structured error responses for both API and MCP
- MCP error schema compliance for AI-friendly error messages 