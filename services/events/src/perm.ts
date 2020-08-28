import { AuthenticationError } from 'apollo-server'

//TS
import { ContextWithUser } from './ts/interfaces/context'

const assertAuthenticated = (context: ContextWithUser) => {
  if (!context.user) {
    throw new AuthenticationError('You need to be logged in');
  }
};

const assertAdmin = (context: ContextWithUser) => {
  assertAuthenticated(context);

  if (!context.user!.roles!.includes('ADMIN')) {
    throw new AuthenticationError('You need to be a admin');
  }
};

const assertMessageParticipant = (messageId: string, context: ContextWithUser) => {
  assertAuthenticated(context)

  const participantIds: string[] = context.Message.getParticipantIds(messageId)
  if (!participantIds.includes(context.user.id)) {
    throw new AuthenticationError('You need to be a participant in the message');
  }
}

export {
  assertAuthenticated, assertAdmin, assertMessageParticipant
}