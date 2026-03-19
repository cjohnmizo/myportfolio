"use client";

import Link from "next/link";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Send, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { SectionHeading } from "@/components/portfolio/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { PortfolioSnapshot } from "@/types/portfolio";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/validators/contact";

export function ContactSection({ snapshot }: { snapshot: PortfolioSnapshot }) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      const params = new URLSearchParams({
        subject: `Portfolio enquiry: ${values.subject}`,
        body: [
          `Name: ${values.name}`,
          `Email: ${values.email}`,
          "",
          values.message,
        ].join("\n"),
      });

      window.location.href = `mailto:${snapshot.profile.email}?${params.toString()}`;
      toast.success("Launching your email client.");
      form.reset();
    });
  });

  return (
    <section id="contact" className="py-18 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title={snapshot.settings.contactTitle}
          description={snapshot.settings.contactDescription}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="glass-panel h-full">
            <CardContent className="space-y-6 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Primary contact</p>
                <p className="mt-2 text-2xl font-semibold text-foreground">{snapshot.profile.email}</p>
              </div>
              <p className="text-sm leading-7 text-muted-foreground">
                Best for full-stack roles, contract builds, platform work, admin systems, and
                product-focused engineering conversations.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge>Full-stack roles</Badge>
                <Badge variant="secondary">Contract builds</Badge>
                <Badge variant="muted">Architecture consulting</Badge>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-200/90">
                If your email client does not open automatically, use the direct link below.
              </div>
              <Button asChild variant="outline">
                <Link href={`mailto:${snapshot.profile.email}`}>Email directly</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-6 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">Start with a clear brief</p>
                  <p className="text-sm text-muted-foreground">
                    A short brief helps me understand the product, the constraints, and where I can add the most value.
                  </p>
                </div>
              </div>

              <form className="grid gap-5" onSubmit={onSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" {...form.register("name")} />
                    <p className="text-xs text-rose-300">{form.formState.errors.name?.message}</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="you@example.com" {...form.register("email")} />
                    <p className="text-xs text-rose-300">{form.formState.errors.email?.message}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="What are you looking to build?"
                    {...form.register("subject")}
                  />
                  <p className="text-xs text-rose-300">{form.formState.errors.subject?.message}</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Share the problem, the timeline, and what success looks like."
                    {...form.register("message")}
                  />
                  <p className="text-xs text-rose-300">{form.formState.errors.message?.message}</p>
                </div>
                <Button type="submit" disabled={isPending}>
                  Send brief <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
