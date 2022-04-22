import Footer from './footer'
import Meta from './meta'
import Navigation from './navbar'

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Navigation />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
