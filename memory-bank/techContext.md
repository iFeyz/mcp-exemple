# Technical Context

## Technologies Used

### Backend Framework
- **Node.js**: JavaScript runtime for server-side execution
- **Express.js**: Web framework for handling HTTP requests and routing
- **TypeScript**: Typed superset of JavaScript for improved developer experience

### Database
- **SQLite**: File-based SQL database
- **TypeORM**: Object-Relational Mapping library for TypeScript
  - Entity definitions
  - Repository pattern
  - Migration support

### API Integration
- **Model Context Protocol (MCP) SDK**: Library for implementing MCP servers
- **Axios**: HTTP client for making API requests from the MCP server
- **Zod**: Schema validation library

### Development Tools
- **ts-node**: TypeScript execution environment
- **npm**: Package manager for Node.js

## Development Setup

### Prerequisites
- Node.js (v16+)
- npm (v7+)

### Installation
```bash
# Install dependencies
npm install

# Build the API
npm run build

# Build the MCP server
npm run build:mcp
```

### Running Locally
```bash
# Run API in development mode
npm run dev

# Run API in production mode
npm start

# Run MCP server
npm run start:mcp
```

### Environment Configuration
The project uses environment variables for configuration, which can be set in:
1. Process environment
2. Command line arguments
3. Script files

The main environment variables:
- `API_URL`: URL of the API server (default: http://localhost:4000/api)
- `PORT`: Port for the API server (default: 4000)
- `MCP_PORT`: Port for the MCP server (default: 8999)

## Technical Constraints

### Database
- Simple schema focusing on the User entity
- Limited to basic CRUD operations
- No complex relationships or advanced queries

### API
- RESTful design with standard HTTP methods
- JSON response format
- Basic error handling
- No authentication/authorization
- Limited to user management functionality

### MCP Server
- Tool-based approach for API integration
- Limited to predefined actions (list, get, create, update, delete)
- No streaming or real-time updates
- Synchronous request/response model

## Dependencies

### Core Dependencies
- `@modelcontextprotocol/sdk`: ^1.8.0
- `axios`: ^1.8.4
- `cors`: ^2.8.5
- `express`: ^4.21.2
- `morgan`: ^1.10.0
- `reflect-metadata`: ^0.2.2
- `sqlite3`: ^5.1.7
- `typeorm`: ^0.3.21
- `zod`: ^3.24.2

### Development Dependencies
- `@types/cors`: ^2.8.17
- `@types/express`: ^4.17.21
- `@types/morgan`: ^1.9.9
- `@types/node`: ^22.13.17
- `ts-node`: ^10.9.2
- `typescript`: ^5.8.2 