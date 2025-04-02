"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const zod_1 = require("zod");
const axios_1 = __importDefault(require("axios"));
// Use environment variable if available, otherwise default to localhost
const API_BASE = "http://localhost:3005/api";
console.error(`Using API at: ${API_BASE}`);
// Create server instance
const server = new mcp_js_1.McpServer({
    name: "user-api",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});
// Helper function for making API requests
function makeApiRequest(url_1) {
    return __awaiter(this, arguments, void 0, function* (url, method = "GET", body) {
        var _a, _b;
        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
        };
        try {
            console.error(`DEBUG: Making ${method} request to ${url}`);
            if (body) {
                console.error(`DEBUG: Request body:`, JSON.stringify(body));
            }
            let response;
            switch (method) {
                case "GET":
                    response = yield axios_1.default.get(url, { headers });
                    break;
                case "POST":
                    response = yield axios_1.default.post(url, body, { headers });
                    break;
                case "PUT":
                    response = yield axios_1.default.put(url, body, { headers });
                    break;
                case "DELETE":
                    yield axios_1.default.delete(url, { headers });
                    return {};
                default:
                    throw new Error(`Unsupported method: ${method}`);
            }
            console.error(`DEBUG: Request successful, status code: ${response.status}`);
            return response.data;
        }
        catch (error) {
            console.error(`Error making ${method} request to ${url}:`);
            if (axios_1.default.isAxiosError(error)) {
                console.error(`Status: ${((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) || 'unknown'}`);
                console.error(`Message: ${error.message}`);
                console.error(`Response data:`, (_b = error.response) === null || _b === void 0 ? void 0 : _b.data);
                console.error(`Is network error: ${error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND'}`);
                if (error.code === 'ECONNREFUSED') {
                    console.error(`DEBUG: Connection refused. The server at ${url} is not responding.`);
                    console.error(`DEBUG: Please make sure the API server is running at ${API_BASE}`);
                }
            }
            else {
                console.error('Non-Axios error:', error);
            }
            return null;
        }
    });
}
// Format user data
function formatUser(user) {
    return [
        `ID: ${user.id}`,
        `Name: ${user.firstName} ${user.lastName}`,
        `Age: ${user.age}`,
        `Role: ${user.role}`,
        "---",
    ].join("\n");
}
// Register user API tools
// 1. List all users
server.tool("list-users", "Get a list of all users", {}, () => __awaiter(void 0, void 0, void 0, function* () {
    console.error("DEBUG: Executing list-users tool");
    const usersUrl = `${API_BASE}/users`;
    console.error(`DEBUG: Fetching users from ${usersUrl}`);
    const users = yield makeApiRequest(usersUrl);
    console.error(`DEBUG: API response received: ${users ? `Found ${users.length} users` : 'No users (null response)'}`);
    if (!users) {
        console.error("DEBUG: Failed to retrieve users, returning error message");
        return {
            content: [
                {
                    type: "text",
                    text: "Failed to retrieve users",
                },
            ],
        };
    }
    if (users.length === 0) {
        console.error("DEBUG: Users array is empty");
        return {
            content: [
                {
                    type: "text",
                    text: "No users found",
                },
            ],
        };
    }
    console.error(`DEBUG: Processing ${users.length} users`);
    const formattedUsers = users.map(formatUser);
    const usersText = `Users:\n\n${formattedUsers.join("\n")}`;
    console.error("DEBUG: Successfully returning formatted user list");
    return {
        content: [
            {
                type: "text",
                text: usersText,
            },
        ],
    };
}));
// 2. Get user by ID
server.tool("get-user", "Get a user by ID", {
    id: zod_1.z.number().int().positive().describe("The ID of the user to retrieve"),
}, (_a) => __awaiter(void 0, [_a], void 0, function* ({ id }) {
    const userUrl = `${API_BASE}/users/${id}`;
    const user = yield makeApiRequest(userUrl);
    if (!user) {
        return {
            content: [
                {
                    type: "text",
                    text: `Failed to retrieve user with ID ${id}`,
                },
            ],
        };
    }
    const formattedUser = formatUser(user);
    return {
        content: [
            {
                type: "text",
                text: formattedUser,
            },
        ],
    };
}));
// 3. Create a new user
server.tool("create-user", "Create a new user", {
    firstName: zod_1.z.string().min(1).describe("The first name of the user"),
    lastName: zod_1.z.string().min(1).describe("The last name of the user"),
    age: zod_1.z.number().int().positive().describe("The age of the user"),
    role: zod_1.z.string().min(1).describe("The role of the user"),
}, (_a) => __awaiter(void 0, [_a], void 0, function* ({ firstName, lastName, age, role }) {
    const usersUrl = `${API_BASE}/users`;
    const userData = { firstName, lastName, age, role };
    const user = yield makeApiRequest(usersUrl, "POST", userData);
    if (!user) {
        return {
            content: [
                {
                    type: "text",
                    text: "Failed to create user",
                },
            ],
        };
    }
    const formattedUser = formatUser(user);
    return {
        content: [
            {
                type: "text",
                text: `User created successfully:\n\n${formattedUser}`,
            },
        ],
    };
}));
// 4. Update a user
server.tool("update-user", "Update an existing user", {
    id: zod_1.z.number().int().positive().describe("The ID of the user to update"),
    firstName: zod_1.z.string().optional().describe("The new first name (optional)"),
    lastName: zod_1.z.string().optional().describe("The new last name (optional)"),
    age: zod_1.z.number().int().positive().optional().describe("The new age (optional)"),
    role: zod_1.z.string().optional().describe("The new role (optional)"),
}, (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, firstName, lastName, age, role }) {
    const userUrl = `${API_BASE}/users/${id}`;
    // First check if the user exists
    const existingUser = yield makeApiRequest(userUrl);
    if (!existingUser) {
        return {
            content: [
                {
                    type: "text",
                    text: `User with ID ${id} not found`,
                },
            ],
        };
    }
    // Create update payload with only provided fields
    const updateData = {};
    if (firstName !== undefined)
        updateData.firstName = firstName;
    if (lastName !== undefined)
        updateData.lastName = lastName;
    if (age !== undefined)
        updateData.age = age;
    if (role !== undefined)
        updateData.role = role;
    const updatedUser = yield makeApiRequest(userUrl, "PUT", updateData);
    if (!updatedUser) {
        return {
            content: [
                {
                    type: "text",
                    text: `Failed to update user with ID ${id}`,
                },
            ],
        };
    }
    const formattedUser = formatUser(updatedUser);
    return {
        content: [
            {
                type: "text",
                text: `User updated successfully:\n\n${formattedUser}`,
            },
        ],
    };
}));
// 5. Delete a user
server.tool("delete-user", "Delete a user", {
    id: zod_1.z.number().int().positive().describe("The ID of the user to delete"),
}, (_a) => __awaiter(void 0, [_a], void 0, function* ({ id }) {
    const userUrl = `${API_BASE}/users/${id}`;
    // First check if the user exists
    const existingUser = yield makeApiRequest(userUrl);
    if (!existingUser) {
        return {
            content: [
                {
                    type: "text",
                    text: `User with ID ${id} not found`,
                },
            ],
        };
    }
    const result = yield makeApiRequest(userUrl, "DELETE");
    if (!result) {
        return {
            content: [
                {
                    type: "text",
                    text: `Failed to delete user with ID ${id}`,
                },
            ],
        };
    }
    return {
        content: [
            {
                type: "text",
                text: `User with ID ${id} deleted successfully`,
            },
        ],
    };
}));
// Add API status check tool
server.tool("check-api-status", "Check if the API server is running", {}, () => __awaiter(void 0, void 0, void 0, function* () {
    console.error("DEBUG: Checking API server status");
    const endpoints = [
        "/health",
        "/users",
        "/"
    ];
    let successResult = null;
    const errors = [];
    // Try multiple endpoints until one works
    for (const endpoint of endpoints) {
        try {
            console.error(`DEBUG: Attempting to connect to ${API_BASE}${endpoint}`);
            const response = yield axios_1.default.get(`${API_BASE}${endpoint}`, {
                timeout: 5000,
                validateStatus: () => true // Accept any status code
            });
            console.error(`DEBUG: API server responded with status: ${response.status} for ${endpoint}`);
            if (response.status >= 200 && response.status < 300) {
                successResult = {
                    endpoint,
                    status: response.status,
                    data: response.data
                };
                break; // Stop trying other endpoints if one succeeds
            }
            else {
                errors.push(`Endpoint ${endpoint}: Status ${response.status}`);
            }
        }
        catch (error) {
            console.error(`DEBUG: Error checking API server status for ${endpoint}`);
            if (axios_1.default.isAxiosError(error)) {
                console.error(`Error code: ${error.code}`);
                console.error(`Error message: ${error.message}`);
                errors.push(`Endpoint ${endpoint}: ${error.code} - ${error.message}`);
            }
            else {
                errors.push(`Endpoint ${endpoint}: ${error instanceof Error ? error.message : String(error)}`);
            }
        }
    }
    // Report success if any endpoint worked
    if (successResult) {
        return {
            content: [
                {
                    type: "text",
                    text: `API server is running at ${API_BASE}\nSuccessful endpoint: ${successResult.endpoint}\nStatus: ${successResult.status}\nResponse: ${JSON.stringify(successResult.data).substring(0, 200)}${JSON.stringify(successResult.data).length > 200 ? '...' : ''}`,
                },
            ],
        };
    }
    // All endpoints failed, report comprehensive error
    const connectionError = errors.some(e => e.includes('ECONNREFUSED') || e.includes('ENOTFOUND') || e.includes('ETIMEDOUT'));
    if (connectionError) {
        return {
            content: [
                {
                    type: "text",
                    text: `API server is not running or not accessible at ${API_BASE}.\n\nDetails:\n${errors.join('\n')}`,
                },
            ],
        };
    }
    else {
        return {
            content: [
                {
                    type: "text",
                    text: `API server at ${API_BASE} responded with errors for all endpoints.\n\nDetails:\n${errors.join('\n')}`,
                },
            ],
        };
    }
}));
// Start the server
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const transport = new stdio_js_1.StdioServerTransport();
        yield server.connect(transport);
        console.error("User API MCP Server running on stdio");
    });
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
