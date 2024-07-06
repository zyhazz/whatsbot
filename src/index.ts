// @ts-ignore
import qrcode from 'qrcode-terminal';
import Whatsapp from 'whatsapp-web.js'
const { Client, LocalAuth } = Whatsapp
import axios from 'axios';

const wwebVersion = '2.2408.1';

const client = new Client({
    authStrategy: new LocalAuth(),
    // webVersionCache: {
    //     type: 'remote',
    //     remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`,
    // },
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Cliente está pronto!');
});

client.on('message', (message) => {
    if (message.body.startsWith('!ping')) {
        message.reply('pong');
    }
    if (message.body.startsWith('!ai')) {
        const text = message.body.replace('!ai', '');
        askOllama(text).then((response) => {
            message.reply(response);
        });
    }
    console.log("mensagem recebida", message.body);
});

async function askOllama(question: string): Promise<string> {
    const { data } = await axios.post('https://localhost:11434/api/generate', {
        model: 'ollama',
        prompt: question,
        stream: false,
    });
    return data;
}

client.initialize();