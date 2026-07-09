import { useState } from 'react';
import './App.css';

const API_URL = 'http://localhost:5000';

function App() {
  const [username, setUsername] = useState('alice');
  const [password, setPassword] = useState('1234');
  const [token, setToken] = useState(null);
  const [profileMessage, setProfileMessage] = useState('');
  const [error, setError] = useState('');

  // Log in: send credentials, store the returned JWT
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setProfileMessage('');

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      setToken(data.token); // save the wristband
    } catch (err) {
      setError('Could not reach the server.');
    }
  };

  // Call the protected route, attaching the token in the Authorization header
  const handleFetchProfile = async () => {
    setError('');

    try {
      const res = await fetch(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      setProfileMessage(data.message);
    } catch (err) {
      setError('Could not reach the server.');
    }
  };

  const handleLogout = () => {
    setToken(null);
    setProfileMessage('');
    setError('');
  };

  return (
    <div className="app">
      <h1>JWT Demo</h1>

      {!token ? (
        <form onSubmit={handleLogin} className="card">
          <label>
            Username
            <input value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Log In</button>
        </form>
      ) : (
        <div className="card">
          <p className="token-box">Token: {token.slice(0, 30)}...</p>
          <button onClick={handleFetchProfile}>Get Protected Profile</button>
          <button onClick={handleLogout} className="secondary">Log Out</button>
          {profileMessage && <p className="success">{profileMessage}</p>}
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;