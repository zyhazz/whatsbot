// @ts-ignore
import qrcode from 'qrcode-terminal';
import Whatsapp from 'whatsapp-web.js'
const { Client, LocalAuth } = Whatsapp
import axios from 'axios';

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Cliente está pronto!');
});

client.on('message', async (message) => {
    if (message.body.startsWith('!ping')) {
        message.reply('pong');
    }
    if (message.body.startsWith('!ai')) {
        const text = message.body.slice(4);
        askOllama(text).then((response) => {
            console.log("resposta", response)
            message.reply(response);
        });
    }
    if (message.body.startsWith('!')) {
        //remove only the first ! from the message
        const text = message.body.slice(1);
        if (message.hasMedia) {
            const media = await message.downloadMedia();
            askLlava(text, media.data).then((response) => {
                console.log("resposta", response)
                message.reply("🤖👀\n" + response);
            });
        }else {
            askOllama(text).then((response) => {
                console.log("resposta", response)
                message.reply("🤖\n" + response);
            });
        }
    }
    console.log("mensagem recebida", message.body);
});

async function askOllama(question: string): Promise<string> {
    const { data } = await axios.post('http://localhost:11434/api/generate', {
        model: 'llama3',
        prompt: "Responda a questao a seguir em poucas palavras, em portugues do Brasil: " + question,
        stream: false,
    });
    return data.response ?? 'Não foi possível obter uma resposta';
}

async function askLlava(question: string, image: string): Promise<string> {
    const {data} = await axios.post('http://localhost:11434/api/generate', {
        model: 'llava',
        //prompt: "Responda a questao a seguir em poucas palavras, em portugues do Brasil: " + question,
        prompt: "O que esta acontecendo na imagem a seguir? " + question,
        stream: false,
        images: [image],
    });
    return data.response ?? 'Não foi possível obter uma resposta';
}

client.initialize();
