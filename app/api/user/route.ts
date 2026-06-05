import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export async function GET() {
  try {
    // 1. Grab the secure cookie
    const cookieStore = await cookies();
    const token = cookieStore.get('sb-access-token')?.value;

    if (!token) throw new Error("Not logged in");

    // 2. Ask Supabase to verify the token and get the user's secure ID
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) throw new Error("Invalid token");

    // 3. Fetch their full profile from Prisma
    // Inside app/api/user/route.ts, update the Prisma query to this:
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: { 
        events: true, // If this is what you named your "created events" or "booked events"
        // If you have a separate relation for booked tickets, add it here, e.g., attendedEvents: true 
      } 
    });

    return NextResponse.json({ success: true, user: dbUser }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 401 });
  }
}