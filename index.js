require('dotenv').config()
const { OpenAI } = require ('openai')
const express = require('express')

const app = express()

app.use(express.json())

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const openai = new OpenAI(OPENAI_API_KEY)

// POST /pergunte-ao-chatgpt
app.post('/pergunte-ao-chatgpt', async (req, res) => {

    const { prompt } = req.body

    // Escolha dos parâmetros
    const model = 'gpt-3.5-turbo'
    const role = 'user'
    const max_tokens = 50

    // Comunicação com o ChatGPT
    const completion = await openai.chat.completions.create({
        messages: [{ role: role, content: prompt}],
        model: model,
        max_tokens: max_tokens,
    })

    res.json({completion: completion.choices[0].message.content})
    })

app.post('/gerar-historia/:tema', async (req, res) => {

    const { tema } = req.params;

    // Configuração do prompt para a geração de texto
    const prompt = `Escreva uma história infantil sobre ${tema} com 150 palavras. Era uma vez...`
    const model = 'gpt-3.5-turbo'
    const role = 'user'
    const max_tokens = 200;

    try {
        // Solicitação para a API GPT-3
        const completion = await openai.chat.completions.create({
            messages: [{ role: role, content: prompt}],
            model: model,
            max_tokens: max_tokens,
        })

        // Retorna a parte gerada da história
        res.json({ completion: completion.choices[0].message.content })
    } catch (error) {
        console.error(error)
        res.status(500).send('Erro ao gerar história.')
    }
})

// Colocamos o servidor em execução na porta 4000
const PORT = 4000
app.listen(PORT, () => console.log(`Em execução na porta ${PORT}`))