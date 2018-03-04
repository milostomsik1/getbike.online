import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet, injectGlobal } from 'styled-components'
import { COLORS } from '../variables';

injectGlobal`
  body {
    font-family: 'Raleway', sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: ${COLORS.charcoal};
    user-select: none;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }
`;

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render () {
    return (
      <html>
        <Head>
          <link href="https://fonts.googleapis.com/css?family=Raleway:100,200,300,400&amp;subset=latin-ext" rel="stylesheet"/>
          <title>GetBike.online</title>
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
