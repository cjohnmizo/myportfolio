"use client";

import Link from "next/link";
import { useTransition } from "react";
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
      toast.success("Opening your email client.");
      form.reset();
    });
  });

  return (
    <section
      id="contact"
      className="border-border border-t bg-white py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title={snapshot.settings.contactTitle}
          description={snapshot.settings.contactDescription}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Card className="h-full shadow-none">
            <CardContent className="space-y-6 p-6">
              <div className="bg-muted text-secondary flex h-11 w-11 items-center justify-center rounded-lg">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Email</p>
                <p className="text-foreground mt-2 text-2xl font-semibold break-words">
                  {snapshot.profile.email}
                </p>
              </div>
              <p className="text-muted-foreground text-sm leading-7">
                Best for website work, dashboards, LMS projects, mobile apps,
                school or NGO tools, and development opportunities.
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
                  Send a short brief
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-7">
                  Share what you need, the timeline, and any existing links or
                  materials.
                </p>
              </div>

              <form className="grid gap-5" onSubmit={onSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      {...form.register("name")}
                    />
                    <p className="text-xs text-red-700">
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
                    <p className="text-xs text-red-700">
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
                  <p className="text-xs text-red-700">
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
                  <p className="text-xs text-red-700">
                    {form.formState.errors.message?.message}
                  </p>
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
