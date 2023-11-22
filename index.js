require('dotenv').config()
const { OpenAI } = require ('openai')
const express = require('express')
var cors = require('cors')

const app = express()

app.use(express.json())

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const openai = new OpenAI(OPENAI_API_KEY)

app.use(cors())

app.post('/gerar-historia/:tema', async (req, res) => {
    try {
        const { tema } = req.params;
        const prompt = `Escreva uma história infantil sobre ${tema} com 150 palavras. Era uma vez...`;
        const model = 'gpt-3.5-turbo';
        const role = 'user';
        const max_tokens = 500; // Aumente o número de tokens permitidos

        const completion = await openai.chat.completions.create({
            messages: [{ role: role, content: prompt }],
            model: model,
            max_tokens: max_tokens,
        });

        const generatedString = completion.choices[0].message.content;

        res.json({ completion: generatedString });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao gerar história.');
    }
});
    const PORT = 4000
    app.listen(PORT, () => console.log(`Em execução na porta ${PORT}`))