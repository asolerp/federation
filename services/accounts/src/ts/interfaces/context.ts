export interface UserContext {  
  id: string
  roles: string[] | undefined
}

export interface MessageContext {
    getParticipantIds: (messageId: string) => []
}