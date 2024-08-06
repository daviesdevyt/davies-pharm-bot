import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ToastContainer />
    </QueryClientProvider>
  );
}

const ToastContainer: React.FC = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          maxWidth: "1000px",
          fontSize: "1rem",
        },
        duration: 1500,
      }}
    />
  );
};
