import { FormEvent, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import { Button } from '../components/Button'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import { PageAuthContainer } from '../styles/auth'

export function NewRoom(): JSX.Element {
  const { user } = useAuth()
  const history = useHistory()
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleCreateRoom(event: FormEvent): Promise<void> {
    event.preventDefault()
    const value = inputRef.current?.value
    if (value?.trim() !== '') {
      const roomRef = database.ref('rooms')

      const firebaseRoom = await roomRef.push({
        title: value,
        authorId: user?.id
      })

      history.push(`/admin/rooms/${firebaseRoom.key}`)
    }
  }

  return (
    <PageAuthContainer>
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as suas dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </PageAuthContainer>
  )
}
