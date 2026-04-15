import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    project: "L4rs0n",
    timestamp: new Date().toISOString(),
  });
}
