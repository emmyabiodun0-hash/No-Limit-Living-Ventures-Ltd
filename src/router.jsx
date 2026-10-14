import { useEffect, useState } from 'react'

// Tiny built-in router (History API). The project had no router, and this
// avoids adding a dependency just for one extra page.

export function getCurrentPath() {
  const path = window.location.pathname.replace(/\/+$/, '')
  return path === '' ? '/' : path
}

export function usePathname() {
  const [pathname, setPathname] = useState(getCurrentPath)

  useEffect(() => {
    const onChange = () => setPathname(getCurrentPath())
    window.addEventListener('popstate', onChange)
    return () => window.removeEventListener('popstate', onChange)
  }, [])

  return pathname
}

export function navigate(to) {
  if (to !== window.location.pathname) {
    window.history.pushState({}, '', to)
  }
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo(0, 0)
}

// Drop-in replacement for <a> that changes page without a full reload.
// Ctrl/Cmd-click, middle-click and target="_blank" still behave normally.
export function Link({ to, onClick, children, ...rest }) {
  function handleClick(event) {
    if (onClick) onClick(event)
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      rest.target === '_blank'
    ) {
      return
    }
    event.preventDefault()
    navigate(to)
  }

  return (
    <a {...rest} href={to} onClick={handleClick}>
      {children}
    </a>
  )
}
