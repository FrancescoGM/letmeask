import { ButtonHTMLAttributes } from 'react'
import { Button as StyledButton } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
}
export function Button({ ...rest }: ButtonProps): JSX.Element {
  return <StyledButton {...rest} />
}
