import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signinschema, signupschema } from "@kedarinath/blog-common"

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWTSECRET: string
    }
}>()


userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = signupschema.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            msg: "Inputs not correct"
        })
    }
    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name
            }
        })
        console.log(user)
        const jwt = await sign({ id: user.id }, c.env.JWTSECRET)
        return c.text(jwt)
    } catch (e) {
        c.status(403)
        return c.json({ error: e })
    }

})

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = signinschema.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            msg: "Inputs not correct"
        })
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password
            }
        })

        if (!user) {
            c.status(404)
            return c.json({ error: "User not found" })
        }
        const jwt = await sign({
            id: user.id
        }, c.env.JWTSECRET)

        return c.text(jwt)
    } catch (error) {
        console.log(error);
        c.status(403)
        return c.json({ msg: error })
    }
})