import { ReactElement } from "react"

export type NavItemProps = TLink & {
  twStyle?: string
}

export type TLink = {
  id: number
  icon: ReactElement
  text: string
  to: string
}
