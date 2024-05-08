import { Helmet } from "react-helmet";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page not found</title>
        <meta name="description" content="404 page not found." />
      </Helmet>
      <div className="h-screen w-full flex justify-center items-center bg-gray-950 flex-col">
        <h1 className="font-bold text-8xl text-white">404</h1>
        <h1 className="text-sky-300 text-xl mt-2">Page not found!</h1>
      </div>
    </>
  );
}
