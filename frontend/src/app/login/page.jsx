"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("http://localhost:3333/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("graphite_token", data.token)
        localStorage.setItem("user_data", JSON.stringify(data.user))
        
        toast.success("Bem-vindo!", { description: "Login realizado com sucesso." })
        router.push("/dashboard")
      } else {
        toast.error(data.toast?.title || "Erro no Login", { 
          description: data.toast?.message || "Verifique suas credenciais." 
        })
      }
    } catch (error) {
      toast.error("Erro de Conexão", { description: "O backend está fora do ar." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-50/50">
      <Card className="mx-auto max-w-sm border-zinc-200 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight text-zinc-900">Login</CardTitle>
          <CardDescription>Acesse sua conta no Graphite Engine</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="nome@exemplo.com" required 
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-zinc-600 underline-offset-4 hover:underline"
                >
                  Esqueci minha senha
                </Link>
              </div>
              <Input id="password" type="password" required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button disabled={loading} type="submit" className="w-full bg-zinc-900 text-zinc-50">
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}