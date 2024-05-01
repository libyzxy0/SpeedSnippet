"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Icon } from "@iconify/react";
import { supabase } from "@/lib/helper/supabase-client.ts";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username isn't valid.",
  }),
  password: z.string().min(1, {
    message: "Please enter your password.",
  }),
});

export default function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(user: z.infer<typeof formSchema>) {
    const { error } = await supabase.auth.signInWithPassword(
      {
        email: user.username,
        password: user.password,
      }
    );

    if (data && !error) {
      toast({
        title: "Successfully logged in!",
        description: "Redirecting you in 3 seconds...",
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      toast({
        title: "Login Failed!",
        description: "Invalid credentials",
      });
    }
  }

  const loginWithGoogle = async () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };
  const loginWithGithub = async () => {
    supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };

  return (
    <>
      <div className="h-screen bg-white dark:bg-gray-950 w-full">
        <header className="pt-14 mx-5">
          <h1 className="text-gray-700 dark:text-white font-bold text-3xl">
            Login | SpeedSnippet
          </h1>
          <p className="text-gray-700 text-md mt-3 dark:text-white text-gray-600">
            Connecting developers together 💙
          </p>
        </header>
        <div className="mx-5 mt-16">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="py-5"
                        placeholder="john.doe@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="py-5"
                        placeholder="password123"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full py-5 mt-4" type="submit">
                Login
              </Button>
            </form>
          </Form>
          <p className="text-gray-700 text-center text-md mt-3 dark:text-white text-gray-600 mt-5">
            OR
          </p>

          <div className="flex flex-col">
            <Button
              onClick={loginWithGoogle}
              className="w-full py-5 mt-3 bg-white shadow text-gray-700 hover:bg-gray-50"
              type="submit"
            >
              <Icon className="text-2xl mr-2" icon="flat-color-icons:google" />
              Continue with Google
            </Button>
            <Button
              onClick={loginWithGithub}
              className="w-full py-5 mt-3 bg-gray-800 shadow text-white hover:bg-gray-900"
              type="submit"
            >
              <Icon className="text-2xl mr-2" icon="mdi:github" />
              Continue with Github
            </Button>
          </div>

          <p className="text-gray-700 text-center text-md mt-3 dark:text-white text-gray-600 mt-5">
            Don't have an account?{" "}
            <a href="/signup" className="text-sky-300 hover:underline">
              Signup
            </a>
          </p>
        </div>
      </div>
      <Toaster />
    </>
  );
}
