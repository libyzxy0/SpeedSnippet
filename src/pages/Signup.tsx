"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { supabase } from "@/lib/helper/supabase-client.ts";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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
  name: z.string().min(1, {
    message: "Please enter your last name",
  }),
  email: z.string().min(1, {
    message: "Please enter your email",
  }),
  username: z.string().min(1, {
    message: "Please enter your desured username",
  }),
  password: z.string().min(1, {
    message: "Please enter your password.",
  }),
  confirmpassword: z.string().min(1, {
    message: "Please confirm your password.",
  }),
});

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      confirmpassword: "",
    },
  });

  async function onSubmit(user: z.infer<typeof formSchema>) {
    if (user.password !== user.confirmpassword) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please confirm your password correctly!",
      });
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: {
          display_name: user.name,
          username: user.username,
        },
      },
    });
    console.log(data);
    if (data && !error) {
      toast({
        title: "Account created!",
        description: "Redirecting you in 3 seconds...",
      });
      setLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else {
      toast({
        title: "Something went wrong",
        description: "There's an error while creating your account.",
      });
      setLoading(false);
    }
  }
  return (
    <>
      <div className="h-full bg-white dark:bg-gray-950 w-full pb-20">
        <header className="pt-24 mx-5">
          <h1 className="dark:text-white font-bold text-3xl text-gray-700">
            Signup | SpeedSnippet
          </h1>
          <p className="text-gray-700 text-md mt-3 dark:text-white text-gray-600">
            Connecting developers together 💙
          </p>
        </header>
        <div className="mx-5 mt-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="py-5"
                        placeholder="John Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="py-5"
                        placeholder="john.doe@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="py-5"
                        placeholder="iamjohndoe"
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
                        placeholder="mypassword123"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="py-5"
                        placeholder="mypassword123"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full py-5 mt-4" type="submit">
                {loading ? "Loading..." : "Create Account"}
              </Button>
            </form>
          </Form>

          <p className="text-gray-700 text-center text-md mt-3 dark:text-white text-gray-600 mt-5">
            Already have an account?{" "}
            <a href="/login" className="text-sky-300 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
      <Toaster />
    </>
  );
}
