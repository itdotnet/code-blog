import prisma from "@/app/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";


export async function GET(){
    const {getUser}=await getKindeServerSession();
    const user=await getUser();

    if(!user || user===null || !user.id)
        throw new Error("something went wrong with authentication" + user);

    const dbUser=await prisma.user.findUnique({
        where:{
            id:user.id
        }
    });

    if(!dbUser){
        await await prisma.user.create({
            data:{
                id:user.id,
                firstName:user.given_name??"",
                lastName:user.family_name??"",
                email:user.email??""
            }
        });

    }

    return NextResponse.redirect("http://localhost:3000/");
}