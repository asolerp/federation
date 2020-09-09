import { AuthenticationError } from 'apollo-server'

//TS
import { UserContext, MessageContext } from './ts/interfaces/context'

const assertAuthenticated = (user: UserContext) => {
  if (!user) {
    throw new AuthenticationError('You need to be logged in');
  }
};

const assertAdmin = (user: UserContext) => {
  assertAuthenticated(user);

  if (user!.roles!.includes('ADMIN')) {
    throw new AuthenticationError('You need to be a admin');
  }
};

const assertMessageParticipant = (messageId: string, user: UserContext, message: MessageContext) => {
  assertAuthenticated(user)

  const participantIds: string[] = message.getParticipantIds(messageId)
  if (!participantIds.includes(user.id)) {
    throw new AuthenticationError('You need to be a participant in the message');
  }
}

export {
  assertAuthenticated, assertAdmin, assertMessageParticipant
}