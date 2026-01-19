"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("http://localhost:3333/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (response.ok) {
        setEmailSent(true)
        toast.success(data.toast?.title || "Email enviado", {
          description: data.toast?.message || "Verifique sua caixa de entrada."
        })
      } else {
        toast.error(data.toast?.title || "Erro ao enviar email", {
          description: data.toast?.message || "Tente novamente."
        })
      }
    } catch (error) {
      toast.error("Erro de Conexão", {
        description: "O backend está fora do ar."
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-50/50">
      <Card className="mx-auto max-w-sm border-zinc-200 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight text-zinc-900">
            Esqueci minha senha
          </CardTitle>
          <CardDescription>
            {emailSent
              ? "Email enviado com sucesso"
              : "Digite seu email para receber o link de redefinição"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {emailSent ? (
            <div className="space-y-4">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-sm text-emerald-800">
                  Enviamos um link de redefinição de senha para <strong>{email}</strong>.
                  Verifique sua caixa de entrada e spam.
                </p>
              </div>
              <div className="space-y-2">
                <Button
                  onClick={() => router.push("/login")}
                  className="w-full bg-zinc-900 text-zinc-50"
                >
                  Voltar para o Login
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEmailSent(false)
                    setEmail("")
                  }}
                  className="w-full"
                >
                  Enviar novamente
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nome@exemplo.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button
                disabled={loading}
                type="submit"
                className="w-full bg-zinc-900 text-zinc-50"
              >
                {loading ? "Enviando..." : "Enviar link de redefinição"}
              </Button>
              <div className="text-center text-sm">
                <Link
                  href="/login"
                  className="text-zinc-600 underline-offset-4 hover:underline"
                >
                  Voltar para o login
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
