// app/api/events/[id]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    
    const resolvedParams = await params;

    const event = await prisma.event.findUnique({
      where: { id: resolvedParams.id },
      include: { organizer: { select: { fullName: true, organizationName: true } } }
    });

    if (!event) throw new Error("Event not found");

    return NextResponse.json({ success: true, event }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 404 });
  }
}