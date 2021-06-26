import Modal, { Props as ModalProps } from 'react-modal'
import deleteImg from '../../assets/images/close.svg'
import { Container } from '../CloseRoomModal/styles'

type DeleteQuestionModalProps = ModalProps & {
  onAccept: () => void
  onReject: () => void
}

export function DeleteQuestionModal({
  onAccept,
  onReject,
  ...rest
}: DeleteQuestionModalProps): JSX.Element {
  return (
    <Modal
      style={{
        content: {
          width: '100%',
          height: '100%',
          maxWidth: 590,
          maxHeight: 360,
          backgroundColor: '#F8F8F8',
          borderRadius: 8,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        },
        overlay: {
          backgroundColor: 'rgba(5, 2, 6, 0.8)'
        }
      }}
      {...rest}
    >
      <Container>
        <img src={deleteImg} alt="Imagem ilustrativa para deletar" />
        <h1>Excluir pergunta</h1>
        <p>Tem certeza que você deseja excluir esta pergunta?</p>
        <div>
          <button onClick={onReject} className="reject">
            Cancelar
          </button>
          <button onClick={onAccept} className="accept">
            Sim, excluir
          </button>
        </div>
      </Container>
    </Modal>
  )
}
