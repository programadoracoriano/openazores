import bcrypt from 'bcryptjs';
import prisma from '~/lib/prisma';


const db = prisma;

type UserPayload = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export async function getUserById(id: number) {
    const user = await db.user.findUnique({ where: { id: id } })
    return {id:user?.id, name: user?.name, email: user?.email};
}

export async function getUserByEmail(email: string) {
    const user = await db.user.findUnique({ where: { email: email } })
    return {id:user?.id, name: user?.name, email: user?.email};
}

export async function createUser(payload: UserPayload) {
    const { email, name, password } = payload;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return {id: user.id, name: user.name, email: user.email};
}
