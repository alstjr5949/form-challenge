"use server";

import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email" })
    .endsWith("@zod.com", { message: "Email must end with @zod.com" }),
  id: z.string().min(5, { message: "ID must be at least 5 characters" }),
  password: z
    .string()
    .min(10, { message: "Password must be at least 10 characters" })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password must include a number",
    }),
});

export const handleLoginFormSubmit = async (
  prevState: any,
  formData: FormData
) => {
  const data = {
    email: formData.get("email"),
    id: formData.get("id"),
    password: formData.get("password"),
  };

  const result = loginSchema.safeParse(data);

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  } else {
    return { success: "Logged in!!" };
  }
};
