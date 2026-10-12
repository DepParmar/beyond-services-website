import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

// A deliberately small client router: history.pushState + popstate, a <Link>, and
// a path matcher. The site is multi-page but every page other than the home
// hero is a lightweight placeholder for now, so a full routing library would be
// more weight than the architecture needs. Internal links route client-side;
// anything external, hash-only, or opened with a modifier key is left to the browser.

const RouterContext = createContext({ path: '/', navigate: () => {} })

function currentPath() {
  if (typeof window === 'undefined') return '/'
  return window.location.pathname || '/'
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(currentPath)

  useEffect(() => {
    const onPop = () => setPath(currentPath())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((to, { replace = false } = {}) => {
    if (to === window.location.pathname) return
    if (replace) window.history.replaceState({}, '', to)
    else window.history.pushState({}, '', to)
    setPath(to)
    // New page starts at the top, matching a real navigation.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in document.documentElement.style ? 'instant' : 'auto' })
  }, [])

  const value = useMemo(() => ({ path, navigate }), [path, navigate])
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useRouter() {
  return useContext(RouterContext)
}

/** Current pathname, normalised without a trailing slash (except root). */
export function usePath() {
  const { path } = useRouter()
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1)
  return path
}

function isModified(event) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0
}

/**
 * Internal navigation link. External URLs, hash fragments and new-tab clicks
 * fall through to a normal anchor.
 * @param {import('react').ComponentPropsWithoutRef<'a'> & { to: string }} props
 */
export function Link({ to, onClick, children, ...props }) {
  const { navigate } = useRouter()
  const internal = typeof to === 'string' && to.startsWith('/')

  const handleClick = (event) => {
    onClick?.(event)
    if (!internal || event.defaultPrevented || isModified(event) || props.target === '_blank') return
    event.preventDefault()
    navigate(to)
  }

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
