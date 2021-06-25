import { ReactNode } from 'react'
import { QuestionContainer } from './styles'

type QuestionProps = {
  children?: ReactNode
  content: string
  author: {
    name: string
    avatar: string
  }
  isHighlighted?: boolean
  isAnswered?: boolean
}

export function Question({
  children,
  content,
  author,
  isAnswered = false,
  isHighlighted = false
}: QuestionProps): JSX.Element {
  return (
    <QuestionContainer
      isAnswered={isAnswered}
      isHighlighted={isHighlighted && !isAnswered}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </QuestionContainer>
  )
}
