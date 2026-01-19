import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Lock, User, Sun, Moon,Eye, EyeOff } from 'lucide-react';
import { useMeta } from '@/hooks/useMeta';
import { useTheme } from '@/contexts/ThemeContext';
import userLoginBG from "@/assets/admin-login.jpg"; // use any image you want
import { swalError, swalSuccess } from '@/lib/swal';
import { confirmSwal } from '@/lib/ConfirmSwal';
import { useUserLogin } from '@/hooks/user/useUserLogin';
const UserLogin = () => {
  useMeta({ title: 'User Login - Matka' });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const { setUserSession } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const mutation = useUserLogin();




  
  const remainingDays = 29; // You can fetch this dynamically from user data if available





  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!username || !password) {
      swalError("Missing Fields", "Please fill in all fields");
      return;
    }
  
    try {
      const resp = await mutation.mutateAsync({ username, password });
      setUserSession(resp.data.user);
      const confirmed = await confirmSwal({
        title: "Login Successful!",
        text: `Welcome ${resp.data.user.username}`,
        confirmText: "OK",
        cancelText: "Stay",
        icon: "success",
      });
      if (confirmed) {
        navigate('/user/upload-result');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed";
      swalError("Invalid Credentials", message);
    }
  };
  
  
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative">

      {/* LEFT SIDE — Login Box with mobile/tablet background */}
      <div className="relative flex items-center justify-center px-4 min-h-screen bg-background lg:bg-none">

        {/* Background image for mobile & tablet */}
        <img 
          src={userLoginBG}
          alt="User Login BG"
          className="
            absolute inset-0 w-full h-full object-cover 
            opacity-40 animate-slowPanZoom
            lg:hidden
          "
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-background/40 lg:hidden" />

        {/* LOGIN CARD */}
        <div className="relative w-full max-w-md">
          <div className=" space-y-6 backdrop-blur-[2px]">

            <div className="text-center space-y-2">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary-accent rounded-full flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">User Login</h1>
              <p className="text-muted-foreground">Enter your credentials to access your dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

            <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                  <Input
                    id="password"
                    type={showPass ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                  />

                  {/* Show/Hide Toggle Icon */}
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>


              <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-primary-foreground" disabled={mutation.isPending}>
                Login
              </Button>
            </form>

          
          </div>
        </div>
      </div>

      {/* RIGHT SIDE — Only for Desktop */}
      <div className="hidden lg:block relative overflow-hidden">
        <img 
          src={userLoginBG}
          alt="User Login Visual"
          className="w-full h-full object-cover animate-slowPanZoom"
        />

        <div className="absolute inset-0 bg-gradient-to-t 
          from-background/60 via-background/30 to-transparent
          dark:from-background/70 dark:via-background/40" 
        />
      </div>

      {/* THEME TOGGLE */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="fixed bottom-6 right-6 rounded-full bg-card text-foreground shadow-lg border border-border hover:text-white"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </Button>
    </div>
  );
};

export default UserLogin;
