import Link from 'next/link'

const Header = React.memo(() => (
  <header className="bb b--black-20 tc ">
    <Link prefetch href="/">
      <span className="f2 b pointer dim">Tek</span>
    </Link>
  </header>
))

export default Header
