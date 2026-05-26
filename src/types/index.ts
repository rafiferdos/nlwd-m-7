export const UserRoles = {
  user: 'user',
  admin: 'admin',
  moderator: 'moderator'
} as const 

export type Roles = 'admin' | 'user' | 'moderator'