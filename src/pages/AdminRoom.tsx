import { useHistory, useParams } from 'react-router-dom'

import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'
import { useRoom } from '../hooks/useRoom'

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'

import '../styles/room.scss'
import { database } from '../services/firebase'

type RoomParams = {
  id: string
}

export function AdminRoom(): JSX.Element {
  const { id } = useParams<RoomParams>()
  const history = useHistory()
  const { questions, title } = useRoom(id)

  async function handleEndRoom(): Promise<void> {
    if (window.confirm('Tem certeza que você deseja encerrar está sala?')) {
      await database.ref(`rooms/${id}`).update({ endedAt: new Date() })
      history.push('/')
    }
  }

  async function handleDeleteQuestion(questionId: string): Promise<void> {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${id}/questions/${questionId}`).remove()
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={id} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(question => (
            <Question
              key={question.id}
              author={question.author}
              content={question.content}
            >
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="Remover pergunta" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  )
}
