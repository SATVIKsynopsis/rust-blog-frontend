import { LoginForm } from '../components/login-form';

export const metadata = {
  title: 'Sign In',
  description: 'Sign in to your account',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-background">
      <LoginForm />
    </main>
  );
}
