import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "visitor-count.json");
const COUNTER_API_URL = "https://api.counterapi.dev/v1/saravana_portfolio_v2/visitors/";
const COUNTER_API_UP_URL = "https://api.counterapi.dev/v1/saravana_portfolio_v2/visitors/up";

function getLocalCount(): number {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(data);
      if (typeof parsed.count === "number" && !isNaN(parsed.count)) {
        return parsed.count;
      }
    }
  } catch {
    // Ignore read errors on serverless environments
  }
  return 0;
}

function saveLocalCount(count: number): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify({ count, lastUpdated: new Date().toISOString() }, null, 2),
      "utf-8"
    );
  } catch {
    // Ignore write errors on read-only serverless filesystems (e.g. Vercel)
  }
}

async function fetchFromCounterApi(url: string): Promise<number | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(url, {
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (typeof data?.count === "number") {
        return data.count;
      }
    }
  } catch (error) {
    console.error("Counter API error:", error);
  }
  return null;
}

export async function GET() {
  const remoteCount = await fetchFromCounterApi(COUNTER_API_URL);
  if (remoteCount !== null) {
    saveLocalCount(remoteCount);
    return NextResponse.json({ count: remoteCount });
  }

  const localCount = getLocalCount();
  return NextResponse.json({ count: localCount });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const isNewVisitor = body.isNewVisitor === true;

    if (isNewVisitor) {
      const remoteCount = await fetchFromCounterApi(COUNTER_API_UP_URL);
      if (remoteCount !== null) {
        saveLocalCount(remoteCount);
        return NextResponse.json({ count: remoteCount });
      }

      const newLocalCount = getLocalCount() + 1;
      saveLocalCount(newLocalCount);
      return NextResponse.json({ count: newLocalCount });
    } else {
      const remoteCount = await fetchFromCounterApi(COUNTER_API_URL);
      if (remoteCount !== null) {
        saveLocalCount(remoteCount);
        return NextResponse.json({ count: remoteCount });
      }

      const localCount = getLocalCount();
      return NextResponse.json({ count: localCount });
    }
  } catch (error) {
    console.error("Error handling visitor count request:", error);
    const localCount = getLocalCount();
    return NextResponse.json({ count: localCount }, { status: 500 });
  }
}

