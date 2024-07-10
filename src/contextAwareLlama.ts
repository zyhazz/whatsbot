import { Ollama } from "@langchain/community/llms/ollama";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history"; // TODO: store it in a database, maybe redis
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";

const messageHistories: Record<string, InMemoryChatMessageHistory> = {};

const prompt = ChatPromptTemplate.fromMessages([
    [
        "system",
        `Você é um assistente útil que lembra todos os detalhes que o usuário compartilha com você. Você prefere mensagens simples, claras e diretas.`,
    ],
    ["placeholder", "{chat_history}"],
    ["human", "{input}"],
]);

const ollama = new Ollama({
    baseUrl: "http://localhost:11434",
    model: "llama3",
});

const chain = prompt.pipe(ollama);

const withMessageHistory = new RunnableWithMessageHistory({
    runnable: chain,
    getMessageHistory: async (sessionId) => {
        if (messageHistories[sessionId] === undefined) {
            messageHistories[sessionId] = new InMemoryChatMessageHistory();
        }
        return messageHistories[sessionId];// TODO: return only the last n messages, to not overload the model
    },
    inputMessagesKey: "input",
    historyMessagesKey: "chat_history",
});

export default withMessageHistory;


