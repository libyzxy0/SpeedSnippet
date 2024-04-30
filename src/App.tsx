import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider"

/* Pages */
import Explore from "@/pages/Explore";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route index element={<Explore />} />
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </ThemeProvider>
    </>
  )
}