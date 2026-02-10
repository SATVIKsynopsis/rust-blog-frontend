import { RegisterForm } from '../components/register-form';

export const metadata = {
  title: 'Sign Up',
  description: 'Create a new account',
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-background">
      <RegisterForm />
    </main>
  );
}
