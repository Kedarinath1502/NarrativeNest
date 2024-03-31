import { blogpostschma, updatepostschema } from "@kedarinath/blog-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { format } from 'date-fns';


export const blogRouter = new Hono<
    {
        Bindings: {
            DATABASE_URL: string,
            JWTSECRET: string
        },
        Variables: {
            UserId: string
        }
    }>()
blogRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header("Authorization") || "";
    const user = await verify(authHeader, c.env.JWTSECRET)

    if (user) {
        c.set("UserId", user.id)
        await next()
    } else {
        c.status(411)
        return c.json({
            msg: "user not authenticated"
        })
    }
})

blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const { success } = blogpostschma.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            msg: "Inputs not correct"
        })
    }
    const authorId = c.get("UserId")
    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId
            }
        })
        const formattedDate = format(new Date(blog.createdAt), 'dd MMMM yyyy')
        return c.json({
            ...blog,
            createdAt: formattedDate
        })
    } catch (error) {
        console.log(error)
        c.status(411)
        return c.json({
            msg: error
        })
    }

})

blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const { success } = updatepostschema.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            msg: "Inputs not correct"
        })
    }
    try {
        const blog = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
        return c.json({ blog })
    } catch (error) {
        console.log(error)
        c.status(411)
        return c.json({
            msg: error
        })
    }

})


blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    try {
        const blog = await prisma.post.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                title: true,
                content: true,
                id: true,
                createdAt: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })

        const formattedBlogs = blog.map(blog => ({
            ...blog,
            createdAt: format(new Date(blog.createdAt), 'dd MMMM yyyy')
        }));
        return c.json({
            blog: formattedBlogs
        })
    } catch (error) {
        console.log(error)
        c.status(411)
        return c.json({
            msg: error
        })
    }

})

blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const id = c.req.param("id")
    try {
        const blog = await prisma.post.findFirst({
            where: {
                id
            },
            select: {
                title: true,
                content: true,
                id: true,
                createdAt: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        if (blog) {
            const formattedDate = format(new Date(blog.createdAt), 'dd MMMM yyyy')
            const formattedBlog = {
                ...blog,
                createdAt: formattedDate
            }
            return c.json({
                blog: formattedBlog
            })
        }


    } catch (error) {
        console.log(error)
        c.status(411)
        return c.json({
            msg: error
        })
    }

})

