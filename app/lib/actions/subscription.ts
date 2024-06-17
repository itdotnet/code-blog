"use server"

import { number, string } from "zod"
import prisma from "../prisma";

export const saveSubscription = async ({ paymentId, planId, userId }: {
    paymentId: string;
    planId: number;
    userId: string;
}) => {
    try {
        await prisma.subscriptions.create({
            data: {
                paymentId: paymentId,
                user: {
                    connect: {
                        id: userId
                    }
                },
                plan: {
                    connect: {
                        id: planId
                    }
                }
            }
        });

        return {
            message: "Subscription Saved Successfully"
        }
    }
    catch (e: any) {
        return {
            message: e.message
        }
    }
};