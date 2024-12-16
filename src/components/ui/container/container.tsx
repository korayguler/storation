import { ContainerProps } from './container.types'

export const Container = ({ children }: ContainerProps) => {
  return <div className="max-w-7xl mx-auto w-full xl:px-0 px-4">{children}</div>
}
