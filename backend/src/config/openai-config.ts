import { Configuration } from "openai";
import { env } from "process";

export const configurationOpenAI = () => {
    const config = new Configuration({
        apiKey: process.env.OPEN_AI_SECRET,
        organization: process.env.OPENAI_ORGANISATION_ID
    })
    return config;
}