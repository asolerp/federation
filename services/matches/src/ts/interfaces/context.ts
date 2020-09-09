export interface ContextWithUser {  
  Message: {
    getParticipantIds: (messageId: string) => []
  }
  user: {
    id: string
    roles: string[] | undefined
  }
}