# WhatsApp Chatbot with Ollama Responses

This project is a WhatsApp chatbot built using TypeScript, leveraging the `whatsapp-web.js` library for WhatsApp integration and `axios` for HTTP requests. It utilizes the Ollama for model execution to generate intelligent responses for messages starting with `!`.

## Features

- **QR Code Authentication**: Easily authenticate your WhatsApp Web session by scanning a QR code.
- **Auto-Response**: The bot automatically responds to messages. Custom commands (`!ping` and `!ai`) trigger specific actions.
- **Ollama Integration**: Uses the Ollama model to generate intelligent responses for messages starting with `!`.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js installed on your machine.
- A WhatsApp account to link the chatbot.
- [Ollama](https://github.com/ollama/ollama) installed with llama3 model.

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:zyhazz/whatsbot.git
   ```
2. Navigate to the project directory:
   ```bash
   cd whatsbot
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

To start the chatbot, run:
```bash
npm start
```
Scan the QR code displayed in your terminal with your WhatsApp mobile app to authenticate.

## Commands

- `!ping`: The bot replies with "pong".
- `!ai <query>`: Generates a response using the Ollama model for the given query.
- `!<query>`: Similar to `!ai`, but works with any command starting with `!`.

## Contributing

Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
