import { HttpError } from 'wasp/server'

export const getUserSnippets = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401)
  }
  return context.entities.Snippet.findMany({ where: { userId: context.user.id } })
}

export const getSnippet = async ({ id }, context) => {
  if (!context.user) {
    throw new HttpError(401)
  }

  const snippet = await context.entities.Snippet.findUnique({
    where: { id },
    include: { user: true }
  })

  if (!snippet) {
    throw new HttpError(404, 'No snippet with id ' + id)
  }
  if (snippet.userId !== context.user.id) {
    throw new HttpError(400, 'Snippet does not belong to the authenticated user')
  }

  return snippet
}