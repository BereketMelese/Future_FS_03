import { AppError } from "@/src/server/shared/app-error";

export function submitContactMessage(payload) {
  if (!payload?.name || !payload?.email || !payload?.message) {
    throw new AppError("Please complete all fields.", 400);
  }

  return { message: "Your message has been queued. We will reply shortly." };
}
