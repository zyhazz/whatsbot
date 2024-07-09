import {create} from 'venom-bot';
import {askLlava, askOllama, askStableDiffusion} from "./askModel";

create({
    session: 'bot',
    //headless: false,
    logQR: true,
    puppeteerOptions: {
        executablePath: undefined,
    }
}).then((client) => {
    console.log("client ready");
    client.onMessage(async (message) => {
        console.log("New message:", message.body, message.author, message.chatId, message.id);
        if (message?.body?.startsWith('!ping')) {
            client.reply(message.chatId, 'pong', message.id.toString()).then(() => {
                console.log("pong enviado");
            }).catch((error) => {
                console.error("erro ao enviar pong", error);
            });
            return;
        }
        if (message.type === 'image' && message.caption) {
            const caption = message.caption ?? '';
            if (!caption.startsWith('!')) {
                return;
            }
            const text = caption.slice(1);
            const buffer = await client.decryptFile(message);
            const media = {
                data: buffer.toString('base64'),
                mimetype: message.mimetype,
            };
            askLlava(text, media.data).then((response) => {
                console.log("resposta", response)
                client.reply(message.chatId, "🤖\n" + response, message.id.toString()).then(() => {
                    console.log("resposta enviada");
                }).catch((error) => {
                    console.error("erro ao enviar resposta", error);
                });
            });
            return;
        }
        if (message.body.startsWith('!')) {
            const text = message.body.slice(1);
            askOllama(text).then((response) => {
                console.log("resposta", response)
                client.reply(message.chatId, "🤖\n" + response, message.id.toString()).then(() => {
                    console.log("resposta enviada");
                }).catch((error) => {
                    console.error("erro ao enviar resposta", error);
                });
            });
        }
        if (message.body.startsWith('@')) {
            const text = message.body.slice(1);
            askStableDiffusion(text).then((response) => {
                const image = response.images[0] ?? '';
                if (!image) {
                    //message.reply("Não foi possível gerar uma imagem");
                    client.reply(message.chatId, "Não foi possível gerar uma imagem", message.id.toString()).then(() => {
                        console.log("resposta enviada");
                    }).catch((error) => {
                        console.error("erro ao enviar resposta", error);
                    });
                    return;
                }
                const b64 = `data:image/png;base64,${image}`
                client.sendImageFromBase64(message.chatId, b64, 'image.png', '🤖\n').then(() => {
                    console.log("imagem enviada");
                }).catch((error) => {
                    console.error("erro ao enviar imagem", error);
                });
            });
        }
    });

}).catch((error) => {
    console.error("erro ao criar cliente", error);
});

