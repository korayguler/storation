import { CardProps } from './card.types'

export const Card = ({ children, title }: CardProps) => {
  return (
    <div className="relative mb-6 shadow-lg bg-white px-[15px] py-[18px]">
      {title && (
        <span className="text-xs -top-4 text-[#333333] left-0 absolute opacity-70 select-none">
          {title}
        </span>
      )}
      {children}
    </div>
  )
}
