//should be force-dynamic
export const dynamic = "force-dynamic";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";

import { NextRequest } from "next/server";
import { prisma } from "@/prisma";

//handle webhooks here
export async function POST(req: NextRequest) {
  //verify webhook
  const webhook_secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhook_secret) {
    console.error("❌ Missing WEBHOOK_SECRET environment variable");
    return new Response("Server configuration error", { status: 500 });
  }
  const svix_id = req.headers.get("svix-id");
  const svix_timestamp = req.headers.get("svix-timestamp");
  const svix_signature = req.headers.get("svix-signature");
  console.log(svix_id);
  console.log(svix_timestamp);
  console.log(svix_signature);
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }
  const body = await req.text();

  const svix = new Webhook(webhook_secret);
  let event: WebhookEvent;

  try {
    event = svix.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }
  const eventType = event.type;
  if (eventType === "user.created") {
    const user = event.data;
    try {
      await prisma.user.create({
        data: {
          clerkId: user.id,
          name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
          email: user.email_addresses[0].email_address,
          image: user.image_url,
        },
      });
      console.log("👤 New user created:", user.id);
    } catch (err) {
      console.error("Database error:", err);
      return new Response("Database error", { status: 500 });
    }
  }
  return new Response("Webhook processed successfully", { status: 200 });
}
