"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Github, Mail, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { SectionHeading } from "@/components/portfolio/section-heading";
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
  const [website, setWebsite] = useState("");
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
    if (website) {
      toast.error("Unable to send this brief.");
      return;
    }

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
      toast.success("Opening your email client with the project brief.");
      form.reset();
    });
  });

  return (
    <section
      id="contact"
      className="border-border relative border-t py-16 sm:py-24"
    >
      <div className="via-secondary/50 absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title={snapshot.settings.contactTitle}
          description={snapshot.settings.contactDescription}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Card className="border-primary/20 h-full shadow-none">
            <CardContent className="space-y-6 p-6">
              <div className="border-primary/25 bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-2xl border">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Email</p>
                <p className="text-foreground mt-2 text-2xl font-semibold break-words">
                  {snapshot.profile.email}
                </p>
              </div>
              <p className="text-muted-foreground text-sm leading-7">
                Have a school website, LMS, NGO system, dashboard, or mobile app
                idea? Send a short project brief and I will review it.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href={`mailto:${snapshot.profile.email}`}>
                    Email directly
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link
                    href={`https://github.com/${snapshot.profile.githubUsername}`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    GitHub <Github className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardContent className="space-y-6 p-6">
              <div>
                <h3 className="text-foreground text-xl font-semibold">
                  Send a project brief
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-7">
                  Share what you need, the timeline, and any existing links or
                  materials.
                </p>
              </div>

              <form className="grid gap-5" onSubmit={onSubmit}>
                <input
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                  name="website"
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      {...form.register("name")}
                    />
                    <p className="text-xs text-red-300">
                      {form.formState.errors.name?.message}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="you@example.com"
                      {...form.register("email")}
                    />
                    <p className="text-xs text-red-300">
                      {form.formState.errors.email?.message}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Website, LMS, dashboard, or app"
                    {...form.register("subject")}
                  />
                  <p className="text-xs text-red-300">
                    {form.formState.errors.subject?.message}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me what should be built and who will use it."
                    {...form.register("message")}
                  />
                  <p className="text-xs text-red-300">
                    {form.formState.errors.message?.message}
                  </p>
                </div>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Preparing brief..." : "Send Project Brief"}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
