export function getServerSideProps({ req, res }) {
	const Cookies = require('cookies')
	const cookies = new Cookies(req, res)

	// Delete the cookie by not setting a value
	cookies.set('auth-token')

	res.writeHead(307, { Location: '/' })
	res.end()

	return { props: {} }
}

function Logout() {
	return (
		<div>
			<a href="/logout">Logout</a>
		</div>
	)
}

export default Logout
