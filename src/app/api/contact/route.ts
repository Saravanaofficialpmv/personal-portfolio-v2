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
  senderName?: string;
  senderEmail?: string;
  senderPhone?: string;
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
    const { message, senderName, senderEmail, senderPhone } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message content is required" },
        { status: 400 }
      );
    }

    const newMessage: MessageItem = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      message: message.trim(),
      senderName: senderName?.trim() || "Portfolio Visitor",
      senderEmail: senderEmail?.trim() || "Not provided",
      senderPhone: senderPhone?.trim() || "",
      createdAt: new Date().toISOString(),
    };

    console.log("--------------------------------------------------");
    console.log("📩 NEW PORTFOLIO CONTACT MESSAGE RECEIVED!");
    console.log("From:", newMessage.senderName);
    console.log("Contact:", newMessage.senderEmail, newMessage.senderPhone);
    console.log("Message:", newMessage.message);
    console.log("Time:", newMessage.createdAt);
    console.log("--------------------------------------------------");

    // 1. Save to local storage inbox
    saveMessageLocally(newMessage);

    const emailSubject = `⚡ New Portfolio Message from ${newMessage.senderName} (${newMessage.senderEmail})`;
    const emailHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e0e0e0;">
        <div style="border-bottom: 2px solid #E8342A; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #171717; margin: 0; font-size: 20px;">⚡ New Portfolio Inquiry for Saravana S</h2>
        </div>
        
        <div style="background-color: #f8f9fa; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
          <p style="margin: 0 0 8px 0; font-size: 14px; color: #555555;"><strong>From:</strong> ${newMessage.senderName}</p>
          <p style="margin: 0 0 8px 0; font-size: 14px; color: #555555;"><strong>Email / Contact:</strong> ${newMessage.senderEmail}</p>
          ${newMessage.senderPhone ? `<p style="margin: 0; font-size: 14px; color: #555555;"><strong>Phone:</strong> ${newMessage.senderPhone}</p>` : ""}
        </div>

        <div style="margin-bottom: 24px;">
          <p style="font-size: 14px; color: #555555; margin-bottom: 8px;"><strong>Message Details:</strong></p>
          <div style="background-color: #171717; color: #ffffff; border-left: 4px solid #E8342A; padding: 18px; border-radius: 8px; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">
${newMessage.message}
          </div>
        </div>

        <div style="border-top: 1px solid #eeeeee; padding-top: 16px; font-size: 12px; color: #888888;">
          Received from Portfolio Contact Modal on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} (IST)
        </div>
      </div>
    `;

    // 2. Dispatch via Resend API if API Key is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: DESTINATION_EMAIL,
          subject: emailSubject,
          html: emailHtml,
        });
      } catch (emailErr) {
        console.error("Resend email send error:", emailErr);
      }
    } else if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      // 3. Dispatch via SMTP Nodemailer if SMTP credentials are set
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
          subject: emailSubject,
          html: emailHtml,
        });
      } catch (smtpErr) {
        console.error("SMTP email send error:", smtpErr);
      }
    } else {
      // 4. Dispatch via FormSubmit HTTP API direct to saravanapmvofficial@gmail.com
      try {
        const fsRes = await fetch(`https://formsubmit.co/ajax/${DESTINATION_EMAIL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
            Referer: "https://saravanapmvofficial.dev",
          },
          body: JSON.stringify({
            name: newMessage.senderName,
            email: newMessage.senderEmail,
            phone: newMessage.senderPhone || "N/A",
            message: newMessage.message,
            _subject: emailSubject,
            _template: "table",
          }),
        });
        const fsData = await fsRes.json();
        console.log("FormSubmit dispatch status:", fsData);
      } catch (fsErr) {
        console.error("FormSubmit send error:", fsErr);
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
