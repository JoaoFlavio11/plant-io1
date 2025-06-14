// app/api/postData/route.ts
import { sensorDataSchema } from "@/lib/models/SensorModel";
import { db } from "@/services/firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parse = sensorDataSchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json(
        { success: false, error: "Dados inválidos", issues: parse.error.format() },
        { status: 400 }
      );
    }

    const docRef = await addDoc(collection(db, "plant"), {
      ...parse.data,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error) {
    console.error("❌ Erro ao adicionar documento:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
