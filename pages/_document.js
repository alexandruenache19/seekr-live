import React from "react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";

class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta content="width=device-width, initial-scale=1" />
          <meta title="Polymore" />
          <link rel="icon" sizes="96x96" href="/favicon.ico" />
          <meta name="theme-color" content="#319795" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css"
            rel="stylesheet"
          />
        </Head>

        <body
          style={{ overscrollBehavior: "none", backgroundColor: "#FFFEF3" }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
