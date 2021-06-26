import Modal, { Props as ModalProps } from 'react-modal'
import closeImg from '../../assets/images/close.svg'
import { Container } from './styles'

type CloseRoomModalProps = ModalProps & {
  onAccept: () => void
  onReject: () => void
}

export function CloseRoomModal({
  onAccept,
  onReject,
  ...rest
}: CloseRoomModalProps): JSX.Element {
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
        <img src={closeImg} alt="Imagem ilustrativa para fechar" />
        <h1>Encerrar sala</h1>
        <p>Tem certeza que você deseja encerrar esta sala?</p>
        <div>
          <button onClick={onReject} className="reject">
            Cancelar
          </button>
          <button onClick={onAccept} className="accept">
            Sim, encerrar
          </button>
        </div>
      </Container>
    </Modal>
  )
}
