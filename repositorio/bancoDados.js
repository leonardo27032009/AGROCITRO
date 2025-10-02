const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'agrocitro',
    password:''
});

async function obterPlantios(){
    sql = 'select * from plantio';
    const [rows, fields] = await connection.execute(sql);

    return rows;
}

async function incluirPlantios(Variedade, Data_Plantio, Quantidade_Plantada, Localizacao){
    const sql = 'insert into plantio (Variedade, Data_Plantio, Quantidade_Plantada, Localizacao) values (?, ?, ?, ?)';
    const [result] = await connection.execute(sql, [Variedade, Data_Plantio, Quantidade_Plantada, Localizacao]);
    return result;
}

async function obterTotalMudas() {
    const sql = 'SELECT SUM(Quantidade_Plantada) AS total_mudas, MAX(Data_Plantio) AS data_atualizacao FROM plantio';
    const [rows] = await connection.execute(sql);
    return rows[0]; 
}





async function obterIrrigacao() {
    sql = 'select * from irrigacao';
    const [rows, fields] = await connection.execute(sql);

    return rows;
}

async function incluirIrrigacao(ID_Plantio, Horario_Inicial, Horario_Final) {
    const sql = 'insert into irrigacao (ID_Plantio, Horario_Inicial, Horario_Final) values (?, ?, ?)';
    const [result] = await connection.execute(sql, [ID_Plantio, Horario_Inicial, Horario_Final]);
    return result;
}







async function obterColheita(){
    sql = 'select * from colheita';
    const [rows, fields] = await connection.execute(sql);

    return rows;
}

async function incluirColheita(ID_Plantio, Data_Colheita, Quantidade_Colhida, Qualidade) {
    const sql = 'insert into colheita (ID_Plantio, Data_Colheita, Quantidade_Colhida, Qualidade) values (?, ?, ?, ?)';
    const [result] = await connection.execute(sql, [
        ID_Plantio ?? null,
        Data_Colheita ?? null,
        Quantidade_Colhida ?? null,
        Qualidade ?? null
    ]);
    return result;
}






module.exports = {
    obterPlantios,
    incluirPlantios,
    obterTotalMudas,
    obterIrrigacao,
    incluirIrrigacao,
    obterColheita,
    incluirColheita
}
