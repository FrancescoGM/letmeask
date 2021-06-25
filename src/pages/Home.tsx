import { FormEvent, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/Button'
import { database } from '../services/firebase'

import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import illustrationImg from '../assets/images/illustration.svg'

import { ButtonCreateRoom, PageAuthContainer, Separator } from '../styles/auth'

export function Home(): JSX.Element {
  const { user, signInWithGoogle } = useAuth()
  const inputRef = useRef<HTMLInputElement>(null)
  const history = useHistory()

  async function handleCreateRoom(): Promise<void> {
    if (!user) {
      await signInWithGoogle()
    }
    history.push('/rooms/new')
  }

  async function handleJoinRoom(event: FormEvent): Promise<void> {
    event.preventDefault()

    const value = inputRef.current?.value

    if (value?.trim() !== '') {
      const roomRef = await database.ref(`rooms/${value}`).get()

      if (!roomRef.exists()) {
        return alert('Room does not exists.')
      }

      if (roomRef.val().endedAt) {
        return alert('Room already closed.')
      }

      history.push(`/rooms/${roomRef.key}`)
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
          <ButtonCreateRoom onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o google
          </ButtonCreateRoom>
          <Separator>ou entre em uma sala</Separator>
          <form onSubmit={handleJoinRoom}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </PageAuthContainer>
  )
}
