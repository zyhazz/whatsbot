import axios from "axios";

const OLLAMA_HOST = process.env.OLLAMA_HOST ?? 'http://localhost:11434';
const STABLE_DIFFUSION_HOST = process.env.STABLE_DIFFUSION_HOST ?? 'http://localhost:7860';

export async function askOllama(question: string): Promise<string> {
    const {data} = await axios.post(`${OLLAMA_HOST}/api/generate`, {
        model: 'llama3',
        prompt: `Responda a questao a seguir em poucas palavras, em portugues do Brasil: ${question}`,
        stream: false,
    });
    return data.response ?? 'Não foi possível obter uma resposta';
}

export async function askLlava(question: string, image: string): Promise<string> {
    const {data} = await axios.post(`${OLLAMA_HOST}/api/generate`, {
        model: 'llava',
        prompt: `O que esta acontecendo na imagem a seguir? ${question}`,
        stream: false,
        images: [image],
    });
    return data.response ?? 'Não foi possível obter uma resposta';
}

export async function askStableDiffusion(text: string) {
    const {data} = await axios.post(`${STABLE_DIFFUSION_HOST}/sdapi/v1/txt2img`, {
        prompt: text,
        steps: 30,
    });
    return data
}
