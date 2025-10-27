import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { createUIResource } from '@mcp-ui/server';
import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import { readFileSync } from 'fs';

const remoteDom1 = readFileSync('./remote-dom-1.js', 'utf-8');
const remoteDom2 = readFileSync('./remote-dom-2.js', 'utf-8');

abstract class AbstractShopServer {
    protected server: McpServer;
    private app: express.Application;

    constructor(name: string, version: string) {
        this.server = new McpServer({
            name,
            version
        });
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json());
        this.setupRoutes();
    }

    private setupRoutes() {
        this.app.post('/mcp', async (req, res) => {
            const transport = new StreamableHTTPServerTransport({
                sessionIdGenerator: undefined,
                enableJsonResponse: true
            });

            res.on('close', () => {
                transport.close();
            });

            await this.server.connect(transport);
            await transport.handleRequest(req, res, req.body);
        });
    }

    public registerTool(
        name: string,
        schemas: {
            title: string;
            description: string;
            inputSchema: any;
            outputSchema: any;
        },
        handler: (input: any) => Promise<any>
    ) {
        this.server.registerTool(name, schemas, handler);
    }

    public listen(port: number) {
        this.app.listen(port, () => {
            console.log(`MCP Server running on http://localhost:${port}/mcp`);
        }).on('error', error => {
            console.error('Server error:', error);
            process.exit(1);
        });
    }
}

class Shop1Server extends AbstractShopServer {
    constructor() {
        super('shop1-server', '1.0.0');
        this.registerTool(
            'remote-dom',
            {
                title: 'Clothes finding tool for Shop 1',
                description: 'Clothes finding tool for Shop 1',
                inputSchema: {
                    type: z.string().optional(),
                    size: z.string().optional()
                },
                outputSchema: { result: z.string() }
            },
            async ({ type, size }) => {
                const uiResource = createUIResource({
                    uri: 'ui://remote-component/action-button',
                    content: {
                        type: 'remoteDom',
                        script: remoteDom2,
                        framework: 'react', // or 'webcomponents'
                    },
                    encoding: 'text',
                });

                return {
                    content: [uiResource],
                    structuredContent: { result: 'Hello from Shop 1 :)' }
                };
            }
        );
    }
}

class Shop2Server extends AbstractShopServer {
    constructor() {
        super('shop2-server', '1.0.0');
        this.registerTool(
            'find_electronics',
            {
                title: 'Electronics finding tool for Shop 2',
                description: 'Electronics finding tool for Shop 2',
                inputSchema: {
                    brand: z.string().optional(),
                    model: z.string().optional()
                },
                outputSchema: { result: z.string() }
            },
            async ({ brand, model }) => {
                const uiResource = createUIResource({
                    uri: 'ui://interactive/button',
                    content: {
                        type: 'remoteDom',
                        script: `
    const p = document.createElement('g-text');
    p.setAttribute('content', 'This is response from Shop 2 rendered in custom React Component.');
    root.appendChild(p);
    `,
                        framework: 'react',
                    },
                    encoding: 'text',
                });

                return {
                    content: [uiResource],
                    structuredContent: { result: 'Hello from Shop 2 :)' }
                };
            }
        );
    }
}

class Shop3Server extends AbstractShopServer {
    constructor() {
        super('shop3-server', '1.0.0');
        this.registerTool(
            'external-url-iframe',
            {
                title: 'Book finding tool for Shop 3',
                description: 'Book finding tool for Shop 3',
                inputSchema: {
                    author: z.string().optional(),
                    genre: z.string().optional()
                },
                outputSchema: { result: z.string() }
            },
            async ({ author, genre }) => {
                const uiResource = createUIResource({
                    uri: 'ui://raw-html-demo',
                    content: { type: 'externalUrl', iframeUrl: 'http://localhost:3001' },
                    encoding: 'text',
                    uiMetadata: {
                        "preferred-frame-size": ["800px", "600px"],
                    },
                });

                return {
                    content: [uiResource],
                    structuredContent: { result: 'Hello from Shop 3 :)' }
                };
            }
        );

        this.registerTool(
            'buy-item',
            {
                title: 'Buy item from Shop 3',
                description: 'Buy item from Shop 3',
                inputSchema: {
                    id: z.string(),
                },
                outputSchema: { result: z.string() }
            },
            async ({ id }) => {
                return {
                    structuredContent: { result: `User wants to buy Winter Jacket ${id}` }
                };
            }
        );
    }
}

const shop1 = new Shop1Server();
const shop2 = new Shop2Server();
const shop3 = new Shop3Server();

shop1.listen(8001);
shop2.listen(8002);
shop3.listen(8003);
