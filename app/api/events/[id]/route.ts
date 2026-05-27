import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// The { params } object catches the dynamic [id] from the folder name!
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: params.id },
      include: { organizer: { select: { fullName: true, organizationName: true } } }
    });

    if (!event) throw new Error("Event not found");

    return NextResponse.json({ success: true, event }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 404 });
  }
}