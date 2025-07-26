
import express from 'express';
import fetch from 'node-fetch';

const app = express();

app.get('/cep/:codigo', async (req, res) => {
    const cep = req.params.codigo;
    console.log("Iniciando o fetch..")

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        console.log("Status da resposta:", response.status)
        const data = await response.json();

        console.log(data);

        if(data.erro) {
            return res.status(404).json({erro: 'CEP não encontrado'});
        }

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(data);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar CEP' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy rodando em http://localhost:${PORT}`);
});