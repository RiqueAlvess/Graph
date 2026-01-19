"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem("user_data")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  const logout = () => {
    localStorage.clear()
    toast.info("Sessão encerrada")
    router.push("/login")
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-zinc-50/50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Dashboard</h1>
          <Button variant="outline" onClick={logout}>Sair</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-zinc-200">
            <CardHeader>
              <CardTitle>Perfil</CardTitle>
              <CardDescription>Conectado como {user.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{user.name}</p>
            </CardContent>
          </Card>

          <Card className="border-zinc-200">
            <CardHeader>
              <CardTitle>Assinatura & Role</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
              <span className="bg-zinc-900 text-white text-[10px] px-2 py-1 rounded-full font-bold">
                {user.role}
              </span>
              <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${
                user.plan === 'PREMIUM' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
              }`}>
                PLANO {user.plan}
              </span>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}