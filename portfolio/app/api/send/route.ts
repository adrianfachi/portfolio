import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const response = await fetch(
    "https://formsubmit.co/ajax/adrianfachidev@gmail.com",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        message: body.message,
      }),
    },
  );

  const result = await response.json();
  return NextResponse.json(result);
}
