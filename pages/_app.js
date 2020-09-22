import '../styles/styles.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Next.js Authentication with HTTP-Onlly Cookies</title>
			</Head>
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
