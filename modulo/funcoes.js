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

    let status = false
    listaAlunos.forEach(function(aluno){
        aluno.curso.forEach(function(curso){
            if(curso.sigla == siglaCurso){
                status = true
                lista.alunos.push(aluno)
            }
        })
    })
    
    if(status != true){
        lista = false
    }

    return lista
}

function getAlunosStatus(status){
    lista = {}

    lista.status = status
    lista.alunos = []

    let statusUtils = false

    listaAlunos.forEach(function(aluno){
        if(aluno.status == status){
            statusUtils = true
            lista.alunos.push(aluno)
        }
    })

    if(statusUtils != true){
        lista = false
    }

    return lista
}

function getAlunosCursoStatus(status, siglaCurso){
    lista = {}

    lista.status = status
    lista.curso = siglaCurso
    lista.alunos = []

    let statusUtils = false
    listaAlunos.forEach(function(aluno){
        aluno.curso.forEach(function(curso){
            if(curso.sigla == siglaCurso){
                statusAluno = false
                listaAluno = {}
                listaAluno.foto = aluno.foto
                listaAluno.nome = aluno.nome
                listaAluno.matricula = aluno.matricula
                listaAluno.sexo = aluno.sexo
                listaAluno.disciplinas = []
                curso.disciplinas.forEach(function(disciplina){
                    if(disciplina.status == status){
                        statusAluno = true
                        statusUtils = true
                        listaAluno.disciplinas.push(disciplina)       
                    }
                })

                if(statusAluno == true){
                    lista.alunos.push(listaAluno)
                }
            }
        })
    })

    if(statusUtils != true){
        lista = false
    }

    return lista
}

function getAlunosCursoAno(ano, siglaCurso){
    lista = {}

    lista.anoConclusao = ano
    lista.curso = siglaCurso
    lista.alunos = []

    let status = false

    listaAlunos.forEach(function(aluno){
        aluno.curso.forEach(function(curso){
            if(curso.sigla == siglaCurso){
                if(curso.conclusao == ano){
                    status = true
                    lista.alunos.push(aluno)
                }
            }
        })
    })

    if(status != true){
        lista = false
    }

    return lista
}

// console.log(getListaCursos())
// console.log(getListaAlunos())
// console.log(getAluno('20151001018'))
// console.log(getAlunosCurso('DS'))
// console.log(getAlunosStatus('Finalizado'))
// console.log(getAlunosCursoStatus('Reprovado', 'DS'))
// console.log(getAlunosCursoAno('2018', 'DS'))

module.exports = {
    getAluno,
    getAlunosCurso,
    getAlunosCursoAno,
    getAlunosCursoStatus,
    getAlunosStatus,
    getListaAlunos,
    getListaCursos
}