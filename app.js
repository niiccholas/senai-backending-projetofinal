/*****************************************************
 * Objetivo: Manipular dados de uma escola de informática 'Lion School'
 * Data: 29/11/2024
 * Autor: Nicolas
 * Versão: 1.0
 *****************************************************/

//Import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Inicializando o express através do objeto app
const app = express()

const funcoes = require('./modulo/funcoes.js')

app.use((request, response, next) => {
    //Permissão de qual ou quais máquinas irão acessar a API
    response.header('Access-Control-Allow-Origin', '*')  // Pode trocar o asterisco pelo IP da máquina liberada para fazer requisições da API. Normalmente para uso empresarial (apenas empresa pode usar)
    //Permissão de quais verbos poderão ser utilizados na API
    response.header('Access-Control-Allow-Methods', 'GET')

    app.use(cors())

    next() //next obrigatório, parecido com o return
})

app.get('/v1/lion-school/cursos', cors(), async function(request, response){

    let dadosCursos = funcoes.getListaCursos()

    if(dadosCursos){
        response.status(200)
        response.json(dadosCursos)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foram encontrados dados para retornar'})
    }
})

app.get('/v1/lion-school/alunos', cors(), async function(request, response){

    let dadosAlunos = funcoes.getListaAlunos()

    if(dadosAlunos){
        response.status(200)
        response.json(dadosAlunos)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foram encontrados dados para retornar'})
    }
})

app.get('/v1/lion-school/alunos/filtro', cors(), async function(request, response){

    let statusAlunos = request.query.status
    let statusDisciplina = request.query.statusDisciplina
    let anoConclusao = request.query.anoConclusao
    let curso = request.query.curso

    if(statusAlunos != undefined){
        let dadosAlunos = funcoes.getAlunosStatus(statusAlunos)

        if(dadosAlunos){
            response.status(200)
            response.json(dadosAlunos)
        }else{
            response.status(404)
            response.json({'status': 404, 'message': 'Não foram encontrados dados para retornar'})
        }
    }else if(curso != undefined && statusDisciplina != undefined){
        let dadosAlunos = funcoes.getAlunosCursoStatus(statusDisciplina, curso)

        if(dadosAlunos){
            response.status(200)
            response.json(dadosAlunos)
        }else{
            response.status(404)
            response.json({'status': 404, 'message': 'Não foram encontrados dados para retornar'})
        }
    }else{
        let dadosAlunos = funcoes.getAlunosCursoAno(anoConclusao, curso)

        if(dadosAlunos){
            response.status(200)
            response.json(dadosAlunos)
        }else{
            response.status(404)
            response.json({'status': 404, 'message': 'Não foram encontrados dados para retornar'})
        }
    }

})

app.get('/v1/lion-school/alunos/:matricula', cors(), async function(request, response){
    
    let matriculaAluno = request.params.matricula

    let dadosAluno = funcoes.getAluno(matriculaAluno)

    if(dadosAluno){
        response.status(200)
        response.json(dadosAluno)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foram encontrados dados para retornar'})
    }
})

app.get('/v1/lion-school/alunos/cursos/:curso', cors(), async function(request, response){

    let alunosCurso = request.params.curso

    let dadosAlunos = funcoes.getAlunosCurso(alunosCurso)

    if(dadosAlunos){
        response.status(200)
        response.json(dadosAlunos)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foram encontrados dados para retornar'})
    }
})

app.get('')


//Permite deixar a API aguardando novas requisições
app.listen('8080', function(){ 
    console.log('API aguardando novas requisições...')
})