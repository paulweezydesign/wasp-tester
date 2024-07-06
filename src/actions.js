import { HttpError } from 'wasp/server'

export const createSnippet = async (args, context) => {
    if (!context.user) { throw new HttpError(401) };
    return context.entities.Snippet.create({
        data: {
            title: args.title,
            content: args.content,
            isFavorite: args.isFavorite || false,
            user: { connect: { id: context.user.id } }
        }
    });
}

export const updateSnippet = async (args, context) => {
    if (!context.user) { throw new HttpError(401) };
    const snippet = await context.entities.Snippet.findUnique({
        where: { id: args.id }
    });
    if (snippet.userId !== context.user.id) { throw new HttpError(403) };
    return context.entities.Snippet.update({
        where: { id: args.id },
        data: {
            title: args.title,
            content: args.content,
            isFavorite: args.isFavorite
        }
    });
}

export const deleteSnippet = async (args, context) => {
    if (!context.user) { throw new HttpError(401) };

    const snippet = await context.entities.Snippet.findUnique({
        where: { id: args.snippetId }
    });
    if (!snippet) { throw new HttpError(404, 'Snippet not found') };
    if (snippet.userId !== context.user.id) { throw new HttpError(403, 'Snippet does not belong to user') };

    return context.entities.Snippet.delete({
        where: { id: args.snippetId }
    });
}