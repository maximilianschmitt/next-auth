/**
 * pages/index.js
 *
 * A demo login page.
 */
import axios from 'axios'
import { useEffect, useState } from 'react'

// Get the actual API_URL as an environment variable. For real
// applications, you might want to get it from 'next/config' instead.
const API_URL = process.env.API_URL

// The following getInitialProps function demonstrates how to make
// API requests from the server. We basically take the auth-token cookie
// and from it create an HTTP header, just like the API Proxy does.
// For real applications you might want to create reusable function that returns
// a correctly configured axios instance depending on whether it gets called
// from the server or from the browser.
async function getInitialProps({ req, res }) {
	if (!process.browser) {
		try {
			const Cookies = require('cookies')
			const cookies = new Cookies(req, res)
			const authToken = cookies.get('auth-token') || ''

			const { email } = await axios
				.get(`${API_URL}/me`, { headers: { 'auth-token': authToken } })
				.then((response) => response.data)

			return { initialLoginStatus: `Logged in as ${email}` }
		} catch (err) {
			return { initialLoginStatus: 'Not logged in' }
		}
	}

	return {}
}

export default function Homepage({ initialLoginStatus }) {
	const [loginStatus, setLoginStatus] = useState(initialLoginStatus || 'Loading...')

	async function getLoginStatus() {
		setLoginStatus('Loading...')

		try {
			const { email } = await axios.get('/api/proxy/me').then((response) => response.data)

			setLoginStatus(`Logged in as ${email}`)
		} catch (err) {
			setLoginStatus('Not logged in')
		}
	}

	async function onSubmit(e) {
		e.preventDefault()

		const email = e.target.querySelector('[name="email"]').value
		const password = e.target.querySelector('[name="password"]').value

		try {
			await axios.post('/api/proxy/login', { email, password })

			getLoginStatus()
		} catch (err) {
			console.error('Request failed:' + err.message)
			getLoginStatus()
		}
	}

	useEffect(() => {
		if (!initialLoginStatus) {
			getLoginStatus()
		}
	}, [initialLoginStatus])

	return (
		<>
			<div className="Homepage">
				<p className="login-status">
					{loginStatus} (<a href="/logout">Logout</a>)
				</p>

				<form className="login-form" onSubmit={onSubmit}>
					<label>
						<span>Email</span>
						<input name="email" type="email" required />
					</label>

					<label>
						<span>Password</span>
						<input name="password" type="password" required />
					</label>

					<button type="submit">Log in!</button>
				</form>

				<p>
					<small>To emulate successful login, use "admin@example.com" and any password.</small>
				</p>

				<hr />
				<p>
					<small>
						Blog post:{' '}
						<a href="https://maxschmitt.me/posts/next-js-http-only-cookie-auth-tokens/">
							Next.js: Using HTTP-Only Cookies for Secure Authentication
						</a>
					</small>
				</p>
			</div>
		</>
	)
}

Homepage.getInitialProps = getInitialProps
