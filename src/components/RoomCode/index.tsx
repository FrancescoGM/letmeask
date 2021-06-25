import copyImg from '../../assets/images/copy.svg'
import { RoomCodeContainer } from './styles'

interface RoomCodeProps {
  code: string
}

export function RoomCode({ code }: RoomCodeProps): JSX.Element {
  function copyRoomCodeToClipboard(): void {
    navigator.clipboard.writeText(code)
  }

  return (
    <RoomCodeContainer onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{code}</span>
    </RoomCodeContainer>
  )
}
