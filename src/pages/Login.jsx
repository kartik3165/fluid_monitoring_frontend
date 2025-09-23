import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Use react-router-dom's Link
import { login, sendOtp, verifyOtp } from '../api/mockApi';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FluidMonitorLogo } from '../components/FluidMonitorLogo'; // Import your new logo

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  
  // We keep all the state and handlers from our previous login page
  const [view, setView] = useState('otp'); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // --- Handlers (copied from our previous version) ---
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { user } = await login(username, password);
      onLoginSuccess(user);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password.');
    } finally { setLoading(false); }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await sendOtp(phone);
      setOtpSent(true);
    } catch (err) {
      setError('Failed to send OTP.');
    } finally { setLoading(false); }
  };
  
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { user } = await verifyOtp(otp);
      onLoginSuccess(user);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid OTP.');
    } finally { setLoading(false); }
  };

  const switchView = (newView) => {
    setView(newView);
    setError('');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 bg-card">
          <CardHeader className="space-y-6 pb-8">
            <div className="flex justify-center">
              <FluidMonitorLogo />
            </div>
            <div className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold text-balance">
                {view === 'admin' ? 'Admin Sign In' : 'Welcome'}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {view === 'admin' ? 'Sign in to the healthcare dashboard' : 'Enter your phone number to continue'}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {view === 'otp' ? (
              // --- OTP Form ---
              <form onSubmit={!otpSent ? handleSendOtp : handleVerifyOtp} className="space-y-4">
                {!otpSent ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    <Button type="submit" className="w-full h-11 font-medium" disabled={loading}>
                      {loading ? 'Sending...' : 'Send OTP'}
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-center text-muted-foreground">Enter the code sent to {phone}. (Hint: 123456)</p>
                    <div className="space-y-2">
                      <Label htmlFor="otp">One-Time Password</Label>
                      <Input id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                    </div>
                    <Button type="submit" className="w-full h-11 font-medium" disabled={loading}>
                      {loading ? 'Verifying...' : 'Verify & Login'}
                    </Button>
                  </>
                )}
                <div className="text-center">
                  <Button type="button" variant="link" onClick={() => switchView('admin')} className="text-sm font-medium">
                    Admin Login
                  </Button>
                </div>
              </form>
            ) : (
              // --- Admin Form ---
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="nurse" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="pass123" required />
                </div>
                <Button type="submit" className="w-full h-11 font-medium" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
                <div className="text-center">
                  <Button type="button" variant="link" onClick={() => switchView('otp')} className="text-sm font-medium">
                    User OTP Login
                  </Button>
                </div>
              </form>
            )}
            {error && <p className="text-center text-sm text-destructive mt-4">{error}</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Login;