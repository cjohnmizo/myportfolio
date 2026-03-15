import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Tell me your name."),
  email: z.string().email("Enter a valid email."),
  subject: z.string().min(3, "Add a short subject."),
  message: z.string().min(20, "Share a few more details so I can help."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
