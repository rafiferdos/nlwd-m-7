type Gender = 'male' | 'female'

export interface IProfile {
  id: number
  user_id: number
  bio: string
  address: string
  phone: string
  gender: Gender
}
