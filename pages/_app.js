import App, { Container } from 'next/app'
import NProgress from 'nprogress'
import Router from 'next/router'
import { ToastContainer } from 'react-toastify'

import Content from 'components/Content'
import Header from 'components/Header'

import RouterEvents from 'constants/routerEvents'

import Project from 'containers/Project'

import 'balloon-css/balloon.min.css'
import 'nprogress/nprogress.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'tachyons/css/tachyons.min.css'

Router.events.on(RouterEvents.COMPLETE, () => NProgress.done())
Router.events.on(RouterEvents.ERROR, () => NProgress.done())
Router.events.on(RouterEvents.START, () => NProgress.start())

export default class extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Content>
          <Header />

          <Project.Provider>
            <ToastContainer />
            <Component {...pageProps} />
          </Project.Provider>
        </Content>

        <style global jsx>
          {`
            *,
            * > * {
              background: none;
              border: none;
              box-sizing: border-box;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
                'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
                'Noto Color Emoji';
              font-size: 16px;
              font-weight: 400;
              line-height: 1.5;
              margin: 0;
              outline: none;
              padding: 0;
              vertical-align: baseline;
            }

            .transparent {
              color: transparent;
            }

            .not-allowed {
              cursor: not-allowed;
            }
          `}
        </style>
      </Container>
    )
  }
}
