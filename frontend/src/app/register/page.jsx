"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner" 
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("http://localhost:3333/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
    
        toast.success(data.toast?.title || "Sucesso!", { 
          description: data.toast?.message || "Sua conta foi criada." 
        })
        router.push("/login")
      } else {
      
        toast.error(data.toast?.title || "Erro no cadastro", { 
          description: data.toast?.message || "Não foi possível criar sua conta." 
        })
      }
    } catch (error) {
      toast.error("Erro de conexão", { 
        description: "O servidor backend parece estar offline." 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-50/50 p-4">
      <Card className="mx-auto max-w-sm border-zinc-200 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight text-zinc-900">
            Criar Conta
          </CardTitle>
          <CardDescription>
            Preencha os campos abaixo para começar no Graphite
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input 
                id="name" 
                placeholder="Henrique Silva" 
                required 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="m@exemplo.com" 
                required 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <Button disabled={loading} type="submit" className="w-full bg-zinc-900 text-zinc-50 hover:bg-zinc-800">
              {loading ? "Criando..." : "Registrar"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Já tem uma conta?{" "}
            <a href="/login" className="underline underline-offset-4 font-medium">
              Fazer login
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}