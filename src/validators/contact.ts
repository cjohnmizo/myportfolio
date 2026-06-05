import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Tell me your name.")
    .max(80, "Keep the name under 80 characters."),
  email: z
    .string()
    .trim()
    .email("Enter a valid email.")
    .max(120, "Keep the email under 120 characters."),
  subject: z
    .string()
    .trim()
    .min(3, "Add a short subject.")
    .max(120, "Keep the subject under 120 characters."),
  message: z
    .string()
    .trim()
    .min(20, "Share a few more details so I can help.")
    .max(4000, "Keep the message under 4000 characters."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
