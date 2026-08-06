import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "visitor-count.json");
const INITIAL_COUNT = 0;

function getCount(): number {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(data);
      if (typeof parsed.count === "number" && !isNaN(parsed.count)) {
        return parsed.count;
      }
    }
  } catch (error) {
    console.error("Failed to read visitor count file:", error);
  }
  return INITIAL_COUNT;
}

function saveCount(count: number): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify({ count, lastUpdated: new Date().toISOString() }, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error("Failed to write visitor count file:", error);
  }
}

export async function GET() {
  const count = getCount();
  return NextResponse.json({ count });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    let count = getCount();

    if (body.isNewVisitor === true) {
      count += 1;
      saveCount(count);
    }

    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error updating visitor count:", error);
    const count = getCount();
    return NextResponse.json({ count }, { status: 500 });
  }
}
