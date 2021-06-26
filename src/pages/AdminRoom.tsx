import { useHistory, useParams } from 'react-router-dom'

import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'

import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

import {
  PageRoomContainer,
  PageRoomHeader,
  PageRoomTitle
} from '../styles/room'
import { useState } from 'react'
import { CloseRoomModal } from '../components/CloseRoomModal'
import { DeleteQuestionModal } from '../components/DeleteQuestionModal'

type RoomParams = {
  id: string
}

export function AdminRoom(): JSX.Element {
  const { id } = useParams<RoomParams>()
  const history = useHistory()
  const [questionSelectedToDelete, setQuestionSelectedToDelete] = useState('')
  const [modalCloseRoomIsOpen, setModalCloseRoomIsOpen] = useState(false)
  const [modalDeleteQuestionIsOpen, setModalDeleteQuestionIsOpen] =
    useState(false)
  const { questions, title } = useRoom(id)

  async function handleEndRoom(): Promise<void> {
    await database.ref(`rooms/${id}`).update({ endedAt: new Date() })
    history.push('/')
  }

  async function handleDeleteQuestion(): Promise<void> {
    await database
      .ref(`rooms/${id}/questions/${questionSelectedToDelete}`)
      .remove()
    handleCloseModalDeleteQuestion()
  }

  async function handleCheckQuestionAsAnswered(
    questionId: string
  ): Promise<void> {
    await database
      .ref(`rooms/${id}/questions/${questionId}`)
      .update({ isAnswered: true })
  }

  function handleOpenModalDeleteQuestion(questionId: string): void {
    setQuestionSelectedToDelete(questionId)
    setModalDeleteQuestionIsOpen(true)
  }

  function handleCloseModalDeleteQuestion(): void {
    setQuestionSelectedToDelete('')
    setModalDeleteQuestionIsOpen(false)
  }

  async function handleHighlightQuestion(questionId: string): Promise<void> {
    await database
      .ref(`rooms/${id}/questions/${questionId}`)
      .update({ isHighlighted: true })
  }

  return (
    <>
      <PageRoomContainer>
        <PageRoomHeader>
          <div className="content">
            <img src={logoImg} alt="Letmeask" />
            <div>
              <RoomCode code={id} />
              <Button isOutlined onClick={() => setModalCloseRoomIsOpen(true)}>
                Encerrar sala
              </Button>
            </div>
          </div>
        </PageRoomHeader>

        <main>
          <PageRoomTitle>
            <h1>Sala {title}</h1>
            {questions.length > 0 && (
              <span>{questions.length} pergunta(s)</span>
            )}
          </PageRoomTitle>

          <div className="question-list">
            {questions.map(question => (
              <Question
                key={question.id}
                author={question.author}
                content={question.content}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img
                        src={checkImg}
                        alt="Marcar pergunta como respondida"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar destaque à pergunta" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleOpenModalDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            ))}
          </div>
        </main>
      </PageRoomContainer>
      <CloseRoomModal
        isOpen={modalCloseRoomIsOpen}
        onAccept={handleEndRoom}
        onReject={() => setModalCloseRoomIsOpen(false)}
        onRequestClose={() => setModalCloseRoomIsOpen(false)}
      />
      <DeleteQuestionModal
        isOpen={modalDeleteQuestionIsOpen}
        onAccept={handleDeleteQuestion}
        onReject={handleCloseModalDeleteQuestion}
        onRequestClose={handleCloseModalDeleteQuestion}
      />
    </>
  )
}
