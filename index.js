require('dotenv').config()
const { OpenAI } = require('openai')
const express = require('express')

const app = express()

app.use(express.json())

// POST /pergunte-ao-chatgpt
app.post('/pergunte-ao-chatgpt', async (req, res) => {

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY
    const openai = new OpenAI( OPENAI_API_KEY )

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
        temperature: 0.7
    })

    res.json({ completion: completion.choices[0].text })
})

app.get('/gerar-historia/:tema', async (req, res) => {

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY
    const openai = new OpenAI( OPENAI_API_KEY )
    const tema = req.params.tema;

    // Configuração do prompt para a geração de texto
    const prompt = `Escreva uma história infantil sobre ${tema} com no maximo 150 caracteres. Era uma vez...`
    const model = 'gpt-3.5-turbo'
    const role = 'user'

    try {
        // Solicitação para a API GPT-3
        const resposta = await openai.chat.completions.create({
            messages: [{ role: role, content: prompt}],
            model: model,
            max_tokens: 150,  // Ajuste conforme necessário
            temperature: 0.7  // Ajuste conforme necessário
        })

        // Retorna a parte gerada da história
        res.send(resposta.choices[0].text.trim())
    } catch (error) {
        console.error(error)
        res.status(500).send('Erro ao gerar história.')
    }
})

// Colocamos o servidor em execução na porta 4000
const PORT = 4000
app.listen(PORT, () => console.log(`Em execução na porta ${PORT}`))