const mysql2 = require('mysql2')
const express = require('express');
const server = express();

server.use(express.json());

const { obterPlantios } = require('./repositorio/bancoDados')
const { incluirPlantios } = require('./repositorio/bancoDados')
const { obterTotalMudas } = require('./repositorio/bancoDados')
const { obterIrrigacao } = require('./repositorio/bancoDados')
const { incluirIrrigacao } = require('./repositorio/bancoDados')
const { obterColheita } = require('./repositorio/bancoDados')
const { incluirColheita } = require('./repositorio/bancoDados')

// GET em '/plantio'
// localhost:3000/plantios
server.get('/plantios', async (req, res) =>{
    // Guarda a função: 'aguardar até que obterPlantios'
    const plantios = await obterPlantios();
    // Retorna o 'plantios'
    res.json(plantios);
})

// POST em '/plantio'
// localhost:3000/registrarPlantio
server.post('/registrarPlantio', async (req, res)=>{

    // Manda as características do 'plantio' para o 'body'
    const {Variedade, Data_Plantio, Quantidade_Plantada, Localizacao} = req.body;
    
    // Chama a função e aplica os parâmetros
    const resposta = await incluirPlantios(Variedade, Data_Plantio, Quantidade_Plantada, Localizacao);
    
    // Se quando for iniciado o server e for afetado as 'rows', deu bom
    if(resposta.affectedRows > 0){
        res.json({msg: 'Atualizado!'})
    }else{
        res.json({msg: 'Deu ruim ;-;'})
    }
    
})



// GET em '/mudas'
// localhost:3000/mudas
server.get('/mudas', async (req, res) =>{
        try {
            const { total_mudas, data_atualizacao } = await obterTotalMudas();
    
            res.json({
                total_mudas: total_mudas || 0,
                data_atualizacao: data_atualizacao || null
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ erro: "Erro ao obter total de mudas" });
        }
    });










// GET em '/irrigacao'
// localhost:3000/irrigacao
server.get('/irrigacao', async (req, res) =>{
    const irrigacao = await obterIrrigacao();

    res.json(irrigacao);
})

// POST em '/registrarIrrigacao'
//localhost:3000/registrarIrrigacao
server.post('/registrarIrrigacao', async (req, res) =>{
    const {ID_Plantio, Horario_Inicial, Horario_Final} = req.body

    const resposta = await incluirIrrigacao(ID_Plantio, Horario_Inicial, Horario_Final);

    // Se quando for iniciado o server e for afetado as 'rows', deu bom
    if(resposta.affectedRows > 0){
        res.json({msg: 'Atualizado!'})
    }else{
        res.json({msg: 'Deu ruim ;-;'})
    }
})





// GET em '/Colheita'
// localhost:3000/colheita
server.get('/colheita', async (req, res) =>{
    const colheita = await obterColheita();

    res.json(colheita);
})



// POST em '/registrarColheita'
// localhost:3000/registrarColheita
server.post('/registrarColheita', async (req, res) =>{
    const {ID_Plantio, Data_Colheita, Quantidade_Colhida, Qualidade} = req.body

    const resposta = await incluirColheita(ID_Plantio, Data_Colheita, Quantidade_Colhida, Qualidade);

    // Se quando for iniciado o server e for afetado as 'rows', deu bom
    if(resposta.affectedRows > 0){
        res.json({msg: 'Atualizado!'})
    }else{
        res.json({msg: 'Deu ruim ;-;'})
    }
})







// Base da definição de função: ()=>{}
server.listen(3000, ()=>{
    console.log('Servidor OnLine!')
});
