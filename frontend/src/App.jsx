import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  const [alunos, setAlunos] = useState([])

  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [curso, setCurso] = useState("")

  const [editando, setEditando] = useState(false)
  const [idAtual, setidAtual] = useState(null)

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
      </form>
      <button type="submit">
        {editando ? "Atualizar" : "Cadastrar"}
      </button>
    </div>
  )
}

export default App