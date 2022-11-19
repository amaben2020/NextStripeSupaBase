import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head />
      <script src='https://js.pusher.com/5.0/pusher.min.js'></script>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
