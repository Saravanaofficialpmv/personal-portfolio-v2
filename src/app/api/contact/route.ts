import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Resend } from "resend";
import nodemailer from "nodemailer";

const DATA_DIR = path.join(process.cwd(), "data");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");
const DESTINATION_EMAIL = "saravanapmvofficial@gmail.com";

interface MessageItem {
  id: string;
  message: string;
  senderEmail?: string;
  createdAt: string;
}

function saveMessageLocally(messageObj: MessageItem) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    let existing: MessageItem[] = [];
    if (fs.existsSync(MESSAGES_FILE)) {
      const content = fs.readFileSync(MESSAGES_FILE, "utf-8");
      existing = JSON.parse(content);
    }
    existing.unshift(messageObj);
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(existing, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save message locally:", err);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, senderEmail } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message content is required" },
        { status: 400 }
      );
    }

    const newMessage: MessageItem = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      message: message.trim(),
      senderEmail: senderEmail || "Anonymous visitor",
      createdAt: new Date().toISOString(),
    };

    // 1. Save to local storage inbox
    saveMessageLocally(newMessage);

    // 2. Attempt real-time email dispatch via Resend if API Key is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: "Portfolio Inquiry <onboarding@resend.dev>",
          to: DESTINATION_EMAIL,
          subject: `⚡ New Portfolio Message from ${senderEmail || "Visitor"}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; background-color: #f7f7f7; color: #171717;">
              <h2 style="color: #E8342A; border-bottom: 2px solid #E0E0E0; padding-bottom: 10px;">
                New Inquiry for Saravana S
              </h2>
              <p style="font-size: 15px; line-height: 1.6; margin-top: 15px;">
                <strong>Message:</strong>
              </p>
              <div style="background-color: #ffffff; border-left: 4px solid #E8342A; padding: 15px; font-size: 15px; margin: 15px 0;">
                "${message.trim()}"
              </div>
              <p style="font-size: 13px; color: #5C5C5C; margin-top: 20px;">
                Sender: ${senderEmail || "Anonymous Portfolio Visitor"}<br/>
                Received: ${new Date().toLocaleString()}
              </p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("Resend email send error:", emailErr);
      }
    } else if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      // 3. Fallback to SMTP Nodemailer if SMTP details are configured
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
          to: DESTINATION_EMAIL,
          subject: `⚡ New Portfolio Message from ${senderEmail || "Visitor"}`,
          text: `New Portfolio Inquiry:\n\n${message.trim()}\n\nFrom: ${senderEmail || "Visitor"}`,
        });
      } catch (smtpErr) {
        console.error("SMTP email send error:", smtpErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Message delivered successfully!",
      savedId: newMessage.id,
    });
  } catch (error) {
    console.error("Error processing contact message:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const content = fs.readFileSync(MESSAGES_FILE, "utf-8");
      const messages = JSON.parse(content);
      return NextResponse.json({ count: messages.length, messages });
    }
    return NextResponse.json({ count: 0, messages: [] });
  } catch {
    return NextResponse.json({ count: 0, messages: [] });
  }
}
