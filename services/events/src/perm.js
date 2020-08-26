const { AuthenticationError } = require('apollo-server');

const assertAuthenticated = (context) => {
  if (!context.user) {
    throw new AuthenticationError('You need to be logged in');
  }
};

const assertAdmin = (context) => {
  assertAuthenticated(context);

  if (!context.user.roles.includes('ADMIN')) {
    throw new AuthenticationError('You need to be a admin');
  }
};

const assertMessageParticipant = (messageId, context) => {
  assertAuthenticated(context)

  const participantIds = context.Message.getParticipantIds(messageId)
  if (!participantIds.includes(context.user.id)) {
    throw new AuthenticationError('You need to be a participant in the message');
  }
}

module.exports = {
  assertAuthenticated, assertAdmin, assertMessageParticipant
}