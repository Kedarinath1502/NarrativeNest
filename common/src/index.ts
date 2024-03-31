import z from "zod";

export const signupschema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

export const signinschema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const blogpostschma = z.object({
    title: z.string(),
    content: z.string()
})

export const updatepostschema = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
})

export type Updatepostschema = z.infer<typeof updatepostschema>
export type Blogpostschema = z.infer<typeof blogpostschma>
export type Signinschema = z.infer<typeof signinschema>
export type Signupschema = z.infer<typeof signupschema>