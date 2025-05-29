// app/api/postData/route.ts
import { db } from "@/services/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { sensorDataSchema } from "@/lib/models/SensorModel";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ✅ Validação dos dados recebidos
    const parse = sensorDataSchema.safeParse(body);

    if (!parse.success) {
      return NextResponse.json(
        { success: false, error: "Dados inválidos", issues: parse.error.format() },
        { status: 400 }
      );
    }

    const docRef = await addDoc(collection(db, "hortela"), parse.data);

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error) {
    console.error("❌ Erro ao adicionar documento:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}

 