import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, sendOtp, verifyOtp } from '../api/mockApi';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  
  const [view, setView] = useState('otp'); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    console.log("Admin login clicked!");
    setLoading(true);
    setError('');
    try {
      const { user } = await login(username, password);
      onLoginSuccess(user);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    console.log("Send OTP button clicked!");
    setLoading(true);
    setError('');
    try {
      await sendOtp(phone);
      setOtpSent(true);
    } catch (err) {
      setError('Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    console.log("Verify OTP clicked!");
    setLoading(true);
    setError('');
    try {
      const { user } = await verifyOtp(otp);
      onLoginSuccess(user);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid OTP.');
    } finally {
      setLoading(false);
    }
  };

  const switchView = (newView) => {
    setView(newView);
    setError('');
  };

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          
          {view === 'otp' ? (
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">User Login</CardTitle>
                <CardDescription>Enter your phone number to receive an OTP.</CardDescription>
              </CardHeader>
              {/* We now wrap CardContent in a <form> tag */}
              <form onSubmit={!otpSent ? handleSendOtp : handleVerifyOtp}>
                <CardContent className="space-y-4">
                  {!otpSent ? (
                    <div className="space-y-4">
                      <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" required />
                      <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Sending...' : 'Send OTP'}</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm text-center text-muted-foreground">Enter the code sent to {phone}. (Hint: 123456)</p>
                      <Input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="6-digit OTP" required />
                      <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Verifying...' : 'Verify & Login'}</Button>
                    </div>
                  )}
                  {error && <p className="text-sm text-destructive text-center">{error}</p>}
                  <Button variant="link" type="button" className="w-full" onClick={() => switchView('admin')}>
                    Admin Login
                  </Button>
                </CardContent>
              </form>
            </Card>
          ) : (
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Admin Login</CardTitle>
                <CardDescription>Enter your administrator credentials below.</CardDescription>
              </CardHeader>
              {/* We do the same for the Admin form */}
              <form onSubmit={handleAdminLogin}>
                <CardContent className="space-y-4">
                  <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username (e.g., nurse)" required />
                  <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password (pass123)" required />                  
                  {error && <p className="text-sm text-destructive text-center">{error}</p>}
                  <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
                  <Button variant="link" type="button" className="w-full" onClick={() => switchView('otp')}>
                    User OTP Login
                  </Button>
                </CardContent>
              </form>
            </Card>
          )}

        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <div className="h-full w-full bg-gray-200" />
      </div>
    </div>
  );
}

export default Login;