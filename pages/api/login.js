/**
 * pages/api/login.js
 *
 * A demo API endpoint for logging in.
 */
export default (req, res) => {
	if (req.body.email === 'admin@example.com') {
		res.status(200).json({ authToken: '123' })
	} else {
		res.status(400).json({ error: 'Invalid credentials' })
	}
}
