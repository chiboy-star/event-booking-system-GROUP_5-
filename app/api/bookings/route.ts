import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

const prisma = new PrismaClient();
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('sb-access-token')?.value;
    if (!token) throw new Error("Unauthorized");

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) throw new Error("Invalid session");

    const { eventId } = await request.json();

    // Link the Event to the User (Adjust 'attendedEvents' to match your schema's array name!)
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        events: { // <-- If your schema uses a different name for the relation, change this
          connect: { id: eventId }
        }
      }
    });

    return NextResponse.json({ success: true, message: "Ticket booked!" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}