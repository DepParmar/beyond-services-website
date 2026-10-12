import Header from '../components/Header/Header'
import Footer from '../components/layout/Footer'
import RoutePlaceholder from './RoutePlaceholder'

/**
 * Shell for every route that does not have its own page yet. The header is
 * pinned solid (there is no hero behind it) and the footer is the same global
 * one, so a placeholder page still belongs to the site rather than reading as
 * a dead end.
 */
export default function SitePage({ title, known }) {
  return (
    <>
      <Header pinned />
      <main id="main" tabIndex={-1}>
        <RoutePlaceholder title={title} known={known} />
      </main>
      <Footer />
    </>
  )
}
