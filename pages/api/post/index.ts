import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { options } from '../auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { title, content } = req.body;

    const session = await getServerSession(req, res, options);
    console.log(session);
    const result = await prisma.post.create({
        data: {
            title: title,
            content: content,
            author: { connect: { email: session?.user?.email } },
        },
    });
    res.json(result);
}
