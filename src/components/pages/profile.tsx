import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import userService from '@/services/userService'

interface ProfileData {
  nick: string
  interests: string[]
  xp: number
  level: string
  createdAt: string
  cpfVerified: boolean
  twitter: string
  twitch: string
  instagram: string
}

interface profileProps{
  id: number
}

export default function UserProfile({id} : profileProps) {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getLevelBg = (level: string) => {
    switch(level) {
        case 'Filhote de Fera':
            return 'bg-orange-100 text-orange-800';
        case 'Pantera em treinamento':
            return 'bg-blue-100 text-blue-800';
        case 'Pantera Furiosa':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

  useEffect(() => {
    const fetchProfile = async () => {
      try {

        const response = await userService.getProfile(id)
        setProfile(response.data)
        
      } catch (err) {
        let errorMessage = 'Erro ao carregar perfil'
        if (err instanceof Error) {
          errorMessage = err.message
        }
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  },[id])

  if (loading) {
    return <div>Carregando perfil...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (!profile) {
    return <div className="text-red-500">Perfil não encontrado</div>
  }

  return (
    <Card>
      <CardContent className="space-y-4 p-4">
        <div className="text-xl">{profile.nick}</div>
        <p>XP: {profile.xp}</p>
        <p> 
          <span className={`${getLevelBg(profile.level)} rounded-full px-2 py-1 text-xs font-medium`}>{profile.level}</span>
        </p>
        {profile.interests && profile.interests.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest, index) => (
              <div 
                key={index}
                className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm"
              >
                {interest}
              </div>
            ))}
          </div>
        )}

        <div className="text-sm text-gray-500">
          Conta criada em: {new Date(profile.createdAt).toLocaleDateString()}
        </div>
        {profile.cpfVerified && (
          <div className="text-green-500 text-sm">CPF Verificado</div>
        )}

{(profile.twitter || profile.twitch || profile.instagram) && (
  <div className="flex gap-4 mt-4">
    {profile.twitter && (
      <a 
        href={profile.twitter} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-600 transition-colors"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
        </svg>
      </a>
    )}
    {profile.twitch && (
      <a
        href={profile.twitch}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-400 hover:text-purple-600 transition-colors"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2.149 0l-1.612 4.119v16.836h5.731v3.045h3.224l3.045-3.045h4.657l6.269-6.269v-14.686h-21.314zm19.164 13.612l-3.582 3.582h-5.731l-3.045 3.045v-3.045h-4.836v-15.045h17.194v11.463zm-3.582-7.343v6.262h-2.149v-6.262h2.149zm-5.731 0v6.262h-2.149v-6.262h2.149z"/>
        </svg>
      </a>
    )}
    {profile.instagram && (
      <a
        href={profile.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-500 hover:text-pink-700 transition-colors"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </a>
    )}
  </div>
)}
      </CardContent>
    </Card>
  )
}