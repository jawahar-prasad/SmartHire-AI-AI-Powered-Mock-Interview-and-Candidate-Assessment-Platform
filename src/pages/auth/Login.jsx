import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = await login({ email, password });
    if (!result.success) {
      // Map Firebase errors to user-friendly messages
      const code = result.error?.code;
      let message = 'Login failed. Please try again.';
      if (code === 'auth/user-not-found') message = 'No account found with that email.';
      else if (code === 'auth/wrong-password') message = 'Incorrect password.';
      else if (code === 'auth/too-many-requests') message = 'Too many attempts. Try again later.';
      setError(message);
    }
    setSubmitting(false);
  };

  // If globally loading (auth init) show spinner
  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">SmartHire AI – Login</h2>
        {error && <p className="text-red-600 mb-3">{error}</p>}
        <form onSubmit={handleSubmit}>
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
          <Button type="submit" disabled={submitting} className="w-full mt-4">
            {submitting ? 'Logging in…' : 'Login'}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          <Link to="/forgot-password" className="text-blue-600 hover:underline mr-2">Forgot password?</Link>
          <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

