'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export default async function deleteTodo(FormData){
    const id = parseInt(FormData.get('id'));
    try {
        await prisma.todo.delete({
            where:{id}
        })
    }
    catch(e){
        console.error(e);
    }
}