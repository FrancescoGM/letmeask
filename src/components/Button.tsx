import { ButtonHTMLAttributes } from 'react'

import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>
export function Button({ ...rest }: ButtonProps): JSX.Element {
  return <button className="button" {...rest} />
}
