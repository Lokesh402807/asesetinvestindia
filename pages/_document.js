// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Fonts and icon CSS belong here */}
        <link
  rel="preload"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Poppins:wght@700;900&display=swap"
  as="style"
/>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Poppins:wght@700;900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <meta name="theme-color" content="#001f3f" />
        {/* NOTE: Do NOT put viewport meta in _document (Next.js warns about this). */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
