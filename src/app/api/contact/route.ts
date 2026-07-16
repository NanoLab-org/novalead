import { PrismaClient } from "@/generated/prisma";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { NextRequest, NextResponse } from "next/server";

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "novalead",
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const contact = await prisma.contact.create({
      data: {
        type: body.type,
        prenom: body.prenom || null,
        nom: body.nom || null,
        email: body.email,
        telephone: body.telephone || null,
        formation: body.formation || null,
        entreprise: body.entreprise || null,
        secteur: body.secteur || null,
        nbPersonnes: body.nbPersonnes || null,
        domaine: body.domaine || null,
        message: body.message,
      },
    });
    return NextResponse.json({ success: true, id: contact.id });
  } catch (error) {
    console.error("PRISMA ERROR:", error);
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 });
  }
}