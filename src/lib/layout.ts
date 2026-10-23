import { useEffect } from 'react'

export const wrap = 'mx-auto max-w-[1240px] px-4 sm:px-8'
export const serif = 'font-serif font-normal tracking-[-.02em]'

export function useTitle(title: string) {
  useEffect(() => {
    document.title = title
  }, [title])
}
