import { useEffect } from 'react'

export const wrap = 'mx-auto max-w-[1240px] px-4 sm:px-8'
// display headings; <em> marks the accent words
export const display = 'font-body font-bold tracking-[-.045em] [&_em]:not-italic'

export function useTitle(title: string) {
  useEffect(() => {
    document.title = title
  }, [title])
}
