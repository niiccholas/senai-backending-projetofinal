let arquivoCursos = require('./cursos')
let arquivoAlunos = require('./alunos')

var listaCursos = arquivoCursos.cursos
var listaAlunos = arquivoAlunos.alunos

function getListaCursos(){
    lista = {}

    lista.cursos = []

    listaCursos.forEach(function(curso){
        let status = false
        if(curso.nome != undefined && curso.sigla != undefined && curso.icone != undefined && curso.carga != undefined){
            status = true
        }
        if(status == true){
            lista.cursos.push(curso)
        }
    })

    return lista
}

function getListaAlunos(){
    lista = {}

    lista.alunos = []

    listaAlunos.forEach(function(aluno){
        let status = false
        if(aluno.curso != undefined && aluno.foto != undefined && aluno.matricula != undefined && aluno.nome && aluno.sexo != undefined
            && aluno.status != undefined){
                status = true
            }
        if(status == true){
            lista.alunos.push(aluno)
        }
    })

    return lista
}

function getAluno(matricula){
    lista = {}
    
    let status = false
    listaAlunos.forEach(function(aluno){
        if(aluno.matricula == matricula){
            status = true
            lista.foto = aluno.foto
            lista.nome = aluno.nome
            lista.matricula = matricula
            lista.sexo = aluno.sexo
            lista.curso = aluno.curso
            lista.status = aluno.status
            }
        if(!lista.foto || !lista.nome || !lista.matricula || !lista.sexo ||
            !lista.curso || !lista.status
        ){
            status = false
        }
        })

    if(status != true){
        lista = false
    }

    return lista
}

function getAlunosCurso(siglaCurso){
    lista = {}

    lista.curso = siglaCurso
    lista.alunos = []

    listaAlunos.forEach(function(aluno){
        aluno.curso.forEach(function(cursinho){
            if(cursinho.sigla == siglaCurso){
                aluno.curso = siglaCurso
                lista.alunos.push(aluno)
            }
        })
    }) // tem que fazer coisa de true ou false ainda

    return lista
}

// console.log(getListaCursos())
// console.log(getListaAlunos())
// console.log(getAluno('20151001016'))
console.log(getAlunosCurso('DS'))