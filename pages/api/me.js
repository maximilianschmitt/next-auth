/**
 * pages/api/me.js
 *
 * A demo API endpoint for getting the currently authenticated user.
 */
export default (req, res) => {
	const authToken = req.headers['auth-token']

	if (authToken === '123') {
		res.status(200).json({ email: 'admin@example.com' })
	} else if (!req.headers.authToken) {
		res.status(401).json({ error: 'Authentication required' })
	} else {
		res.status(403).json({ error: 'Not permitted' })
	}
}
