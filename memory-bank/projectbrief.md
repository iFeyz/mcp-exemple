# Project Brief: MCP-Server

## Overview
MCP-Server is a REST API for managing users with CRUD operations, integrated with Model Context Protocol (MCP) support. The project provides both a standard Express-based API and an MCP server that allows AI assistants like Claude to interact with the user data.

## Core Requirements
1. Provide a REST API for user management (CRUD operations)
2. Implement MCP server to allow AI assistants to interact with the API
3. Support deployment options for both local and remote API access
4. Store user data in SQLite database

## Goals
- Create a simple but functional user management API
- Demonstrate integration of REST API with Model Context Protocol
- Enable Claude for Desktop to interact with the API through MCP
- Provide clear documentation for setup and usage

## Project Structure
The project consists of two main components:
1. User API (Express.js REST API)
2. MCP Server (Model Context Protocol implementation)

## Technical Stack
- TypeScript
- Node.js
- Express
- TypeORM
- SQLite
- Model Context Protocol SDK (@modelcontextprotocol/sdk)

## Out of Scope
- Authentication/Authorization
- Complex data relationships
- Production-grade security features
- Frontend UI 