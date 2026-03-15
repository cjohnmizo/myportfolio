"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { signInAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  loginFormSchema,
  type LoginFormInput,
  type LoginFormValues,
} from "@/validators/admin";

export function AdminLoginForm({
  demoMode,
}: {
  demoMode: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<LoginFormInput, unknown, LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await signInAction(values);

      if (result.status === "error") {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.push("/admin/dashboard");
      router.refresh();
    });
  });

  return (
    <Card className="w-full glass-panel">
      <CardContent className="space-y-6 p-8">
        <div>
          <p className="section-kicker text-xs text-primary">Admin access</p>
          <h1 className="mt-3 text-3xl font-semibold text-foreground">Sign in to the CMS</h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Use your admin credentials to manage projects, profile content, SEO messaging, and media.
          </p>
        </div>

        {demoMode ? (
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm leading-7 text-muted-foreground">
            Demo mode is active because Supabase credentials are missing. The admin UI can be
            explored, but sign-in and mutations are disabled until the environment is connected.
          </div>
        ) : null}

        <form className="grid gap-5" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="admin@example.com" {...form.register("email")} />
            <p className="text-xs text-rose-300">{form.formState.errors.email?.message}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...form.register("password")}
            />
            <p className="text-xs text-rose-300">{form.formState.errors.password?.message}</p>
          </div>
          <Button type="submit" disabled={isPending || demoMode}>
            Sign in <LogIn className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
