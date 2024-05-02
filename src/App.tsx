import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/AuthContext";
import Explore from "@/pages/Explore";
import CreatePost from "@/pages/CreatePost";
import ViewPost from "@/pages/ViewPost";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

const Message = () => (
  <header className="relative top-0 w-full bg-sky-400">
    <p className="py-2 flex items-center justify-center text-sm text-center">Development in progress, there might be imperfections.</p>
  </header>
);

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
      <Message />
        <Routes>
          <Route index element={<Explore />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="create" element={<CreatePost />} />
          <Route path="/post/:postID" element={<ViewPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}
