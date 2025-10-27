import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import {
  UIResourceRenderer,
  UIActionResult,
    basicComponentLibrary,
  remoteTextDefinition,
  remoteButtonDefinition,
  remoteStackDefinition,
  remoteImageDefinition
} from '@mcp-ui/client';
import { createClient } from './mcp-client.js';
import { Button } from 'components-library';
import { gLibrary } from 'components-library';
import { gElements } from 'components-library';

const remoteElements = [
  remoteTextDefinition,
  remoteButtonDefinition,
  remoteStackDefinition,
  remoteImageDefinition,
];

function App() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [lastAction, setLastAction] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    const connectToMcps = async () => {
      const urls = ['http://localhost:8001/mcp', 'http://localhost:8002/mcp', 'http://localhost:8003/mcp'];
      const clients = await Promise.all(urls.map(async (url) => {
        try {
          const client = await createClient(url);
          const availableTools = await client.listTools();
          const name = client.serverInfo?.name || url;
          return { url, name, client, tools: availableTools.tools };
        } catch (error) {
          console.error('Failed to connect to MCP:', error);
          return null;
        }
      }));
      setClientData(clients.filter(Boolean));
    };
    connectToMcps();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = async (message) => {
    const messageToSend = message || inputValue;
    if (messageToSend.trim() !== '') {
      const newMessages = [...messages, { text: messageToSend, sender: 'user' }];
      setMessages(newMessages);

      let tool, client;
      for (const data of clientData) {
        tool = data.tools.find(t => t.name === messageToSend.trim());
        if (tool) {
          client = data.client;
          break;
        }
      }

      if (tool && client) {
        try {
          const result = await client.callTool({
            name: tool.name,
            arguments: {}
          });
          console.log('Tool result:', result);
          const mcpUIContent = result.content[0];
          if (mcpUIContent.type === 'resource' && mcpUIContent.resource.uri?.startsWith('ui://')) {
            setMessages([...newMessages, { type: 'ui', resource: mcpUIContent.resource, sender: 'bot' }]);
          } else {
            const resultText = result.structuredContent.result;
            setMessages([...newMessages, { text: resultText, sender: 'bot' }]);
          }
        } catch (error) {
          console.error('Error calling tool:', error);
          setMessages([...newMessages, { text: `Error: ${error.message}`, sender: 'bot' }]);
        }
      }

      setInputValue('');
    }
  };

  const handleToolClick = (toolName) => {
    handleSendMessage(toolName);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleGenericMcpAction = async (result: UIActionResult) => {
    if (result.type === 'tool') {
      console.log(`Action received in host app - Tool: ${result.payload.toolName}, Params:`, result.payload.params);
      setLastAction({ tool: result.payload.toolName, params: result.payload.params });

      if (result.payload.toolName === 'buy-item') {
        let tool, client;
        for (const data of clientData) {
          tool = data.tools.find(t => t.name === 'buy-item');
          if (tool) {
            client = data.client;
            break;
          }
        }

        if (tool && client) {
          try {
            const mcpResponse = await client.callTool({
              name: tool.name,
              arguments: {id: result.payload.params.item}
            });
            console.log('Tool result:', mcpResponse);
            setMessages([...messages, { text: mcpResponse.structuredContent.result, sender: 'bot' }]);
          } catch (error) {
            console.error('Error calling tool:', error);
            setMessages([...messages, { text: `Error: ${error.message}`, sender: 'bot' }]);
          }
        }
      }

    } else if (result.type === 'prompt') {
      console.log(`Prompt received in host app:`, result.payload.prompt);
      setLastAction({ prompt: result.payload.prompt });
    } else if (result.type === 'link') {
      console.log(`Link received in host app:`, result.payload.url);
      setLastAction({ url: result.payload.url });
    } else if (result.type === 'intent') {
      console.log(`Intent received in host app:`, result.payload.intent);
      setLastAction({ intent: result.payload.intent });
    } else if (result.type === 'notify') {
      console.log(`Notification received in host app:`, result.payload.message);
      setLastAction({ message: result.payload.message });
    }
    return {
      status: 'Action handled by host application',
    };
  };

  return (
    <div className="App container-fluid">
      <div className="row vh-100">
        <div className="col-md-3 sidebar">
          <h2>Tools</h2>
          {clientData.map((data, index) => (
            <details key={index} className="server-details" open>
              <summary>{data.name}</summary>
              <div className="server-details-content">
                <p className="server-url">{data.url}</p>
                {data.tools.map((tool, toolIndex) => (
                  <button key={toolIndex} className="btn btn-primary w-100 mb-2" onClick={() => handleToolClick(tool.name)}>
                    {tool.name}
                  </button>
                ))}
              </div>
            </details>
          ))}
        </div>
        <div className="col-md-9 chat-container d-flex flex-column">
          <div className="message-list flex-grow-1">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                {message.type === 'ui' ? (
                  <UIResourceRenderer
                    resource={message.resource}
                    onUIAction={handleGenericMcpAction}
                    remoteDomProps={{
                      library: gLibrary,
                      remoteElements: gElements,
                    }}
                  />
                ) : (
                  message.text
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="input-container p-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                placeholder="Type your message..."
              />
              <button className="btn btn-primary" onClick={() => handleSendMessage()}>Send</button>
              <button className="btn btn-danger" onClick={handleClearChat}>Clear</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
