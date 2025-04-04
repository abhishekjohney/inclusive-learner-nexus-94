
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthForm from "@/components/auth/AuthForm";

const AuthTabs = () => {
  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">Welcome to EduAccess</h1>
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-xl font-medium">Sign In to Your Account</h2>
              <p className="text-sm text-muted-foreground">
                Enter your credentials to access your account
              </p>
            </div>
            <AuthForm type="login" />
          </div>
        </TabsContent>
        <TabsContent value="register">
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-xl font-medium">Create an Account</h2>
              <p className="text-sm text-muted-foreground">
                Fill in your information to get started
              </p>
            </div>
            <AuthForm type="register" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthTabs;
