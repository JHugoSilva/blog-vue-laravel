export function myDebounce(func: any, delay: number) {
  let debounceTimer: any | undefined

  return function (...args: any[]) {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => func(...args), delay)
  }
}

export function openModal(element: string, postId: number) {
  return new Promise<number>((resolve) => {
    const modal = document.getElementById(element) as HTMLElement
    if (modal) {
      setTimeout(() => {
        modal.classList.add('fade', 'show')
        modal.style.display = 'block'
        modal.classList.add('in')
      }, 500)

      document.body.classList.add('modal-open')

      const modalBackdrop = document.createElement('div')
      modalBackdrop.className = 'modal-backdrop fade show'
      document.body.appendChild(modalBackdrop)
    }
    resolve(postId)
  })
}

export function closeModal(element: string) {
  const modal = document.getElementById(element) as HTMLElement
  const modalBackdrop = document.querySelector('.modal-backdrop')
  if (modal) {
    modal.classList.remove('in', 'show', 'fade')
    modal.style.display = ''

    document.body.classList.remove('modal-open')

    if (modalBackdrop) {
      document.body.removeChild(modalBackdrop)
    }
  }
}
