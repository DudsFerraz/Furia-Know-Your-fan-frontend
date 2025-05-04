import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import userService from '@/services/userService';
import Profile from "./profile"

interface userShortData {
  id: number
  nickname: string
  xp: number
  level: string
}

export default function Ranking() {
    const [users, setUsers] = useState<userShortData[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

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
        const fetchUsers = async () => {
            try {
                const response = await userService.getAllXp();
                setUsers(response.data);
            } catch (error) {
                console.error('Erro ao carregar ranking:', error);
            }
        };
        
        fetchUsers();
    }, []);

    const handleUserClick = (userId: number) => {
        setSelectedUserId(prevId => prevId === userId ? null : userId);
    };

    return (
        <Card>
            <CardContent className="space-y-4 p-4">
                <div className="text-xl font-bold mb-4">Top Fãs</div>
                <ol className="space-y-2">
                    {users.map((user, index) => (
                        <li key={user.id} className="space-y-2">
                            <button
                                onClick={() => handleUserClick(user.id)}
                                className={`w-full text-left p-2 rounded transition-colors ${
                                    selectedUserId === user.id 
                                    ? 'bg-gray-100' 
                                    : 'hover:bg-gray-50'
                                }`}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">
                                            {index + 1}. {user.nickname}
                                        </span>
                                        <span className={`${getLevelBg(user.level)} rounded-full px-2 py-1 text-xs font-medium`}>
                                            {user.level}
                                        </span>
                                    </div>
                                    <span className="font-semibold">{user.xp} XP</span>
                                </div>
                            </button>
                            {selectedUserId === user.id && (
                                <div className="ml-8">
                                    <Profile id={selectedUserId} />
                                </div>
                            )}
                        </li>
                    ))}
                </ol>
            </CardContent>
        </Card>
    )
}