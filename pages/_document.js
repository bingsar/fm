import { Html, Head, Main, NextScript } from 'next/document'
import Script from "next/script";

export default function Document() {
    return (
        <Html>
            <Head>
                <meta name="mailru-domain" content="IuEA45GarpEPCj0h" />
            </Head>
            <body>
            <Main />
            <NextScript />
            <Script
                id="bitrix"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            (function(w,d,u){
                let s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/60000|0);
                let h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
            })(window,document,'https://cdn-ru.bitrix24.ru/b23611804/crm/tag/call.tracker.js');
          `,
                }}
            />
            <Script
                id="bitrix__loader"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            (function(w,d,u){
                let s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/60000|0);
                let h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
            })(window,document,'https://cdn-ru.bitrix24.ru/b23611804/crm/site_button/loader_2_vanamy.js');
          `,
                }}
            />
            </body>
        </Html>
    )
}