"use server";

export const handleLoginFormSubmit = async (
  prevState: any,
  formData: FormData
) => {
  const password = formData.get("password");

  if (password === "12345") {
    return {
      success: "Logged in!!",
    };
  } else {
    return {
      errors: ["Wrong password"],
    };
  }
};
