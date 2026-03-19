import { NextResponse } from "next/server";
import { AppError } from "@/src/server/shared/app-error";
import { submitContactMessage } from "@/src/server/contact/contact.service";

export async function POST(request) {
  try {
    const body = await request.json();
    const result = submitContactMessage(body);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }

    return NextResponse.json({ message: "Unexpected server error." }, { status: 500 });
  }
}
