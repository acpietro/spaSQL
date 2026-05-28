import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  const [alunos, setAlunos] = useState([])

  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [curso, setCurso] = useState("")

  const [editando, setEditando] = useState(false)
  const [idAtual, setidAtual] = useState(null)

  async function buscarAlunos() {
    const resposts = await axios.get('https://ideal-disco-pjq59j4pw5w9h7x77-3001.app.github.dev/alunos');
    setAlunos(resposta.data)
  }

  useEffect(() => { buscarAlunos(); }, [])

  async function salvar(e) {
    e.preventDefault()
    const aluno = [nome, email, curso]

    if (editando) {
      await axios.put(`https://ideal-disco-pjq59j4pw5w9h7x77-3001.app.github.dev/alunos/${idAtual}`, aluno)
      setEditando(false)
      setidAtual(null)
    } else {
      await axios.post("https://ideal-disco-pjq59j4pw5w9h7x77-5173.app.github.dev/alunos", aluno)
      //     limparFormulario()
      //      buscarAlunos()
    }

    limparFormulario()
    buscarAlunos()
  }

  async function excluir(id) {
    await axios.delete(`https://ideal-disco-pjq59j4pw5w9h7x77-3001.app.github.dev/alunos${id}`)
    buscarAlunos()
  }

  function limparFormulario() {
    setNome('')
    setEmail('')
    setCurso('')
  }

  function editar(aluno) {
    setNome(aluno.nome)
    setEmail(aluno.email)
    setCurso(aluno.curso)
    setidAtual(aluno.id)
    setEditando(true)
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>CRUD De Alunos</h1>

      <form onSubmit={"salvar"}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(texto) => setNome(texto.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(texto) => setEmail(texto.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Curso"
          value={curso}
          onChange={(texto) => setCurso(texto.target.value)}
        />
        <button type="submit">
          {editando ? "Atualizar" : "Cadastrar"}
        </button>
      </form>

      <hr />

      {
        aluno.map((aluno) => (
          <div key={aluno.id}>
            <h3>{aluno.nome}</h3>
            <p>{aluno.email}</p>
            <p>{aluno.curso}</p>
            <button onClick={() => editar(aluno)}>Editar</button>
            <button onClick={() => excluir(aluno.id)}>Excluir</button>
          </div>
        ))
      }
    </div>
  )
}

export default App