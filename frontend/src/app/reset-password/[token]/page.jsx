"use client"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ResetPasswordPage() {
  const router = useRouter()
  const params = useParams()
  const token = params.token

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(true)
  const [tokenValid, setTokenValid] = useState(false)
  const [userData, setUserData] = useState(null)
  const [passwordReset, setPasswordReset] = useState(false)

  // Verifica o token ao carregar a página
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(`http://localhost:3333/auth/verify-reset-token/${token}`)
        const data = await response.json()

        if (response.ok && data.valid) {
          setTokenValid(true)
          setUserData(data.user)
        } else {
          setTokenValid(false)
          toast.error(data.toast?.title || "Token inválido", {
            description: data.toast?.message || "Este link não é válido ou expirou."
          })
        }
      } catch (error) {
        setTokenValid(false)
        toast.error("Erro de Conexão", {
          description: "Não foi possível verificar o token."
        })
      } finally {
        setVerifying(false)
      }
    }

    if (token) {
      verifyToken()
    }
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validação de senha
    if (password !== confirmPassword) {
      toast.error("Senhas não conferem", {
        description: "As senhas digitadas não são iguais."
      })
      return
    }

    if (password.length < 8) {
      toast.error("Senha muito curta", {
        description: "A senha deve ter no mínimo 8 caracteres."
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch("http://localhost:3333/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password })
      })

      const data = await response.json()

      if (response.ok) {
        setPasswordReset(true)
        toast.success(data.toast?.title || "Senha redefinida", {
          description: data.toast?.message || "Sua senha foi alterada com sucesso."
        })
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      } else {
        toast.error(data.toast?.title || "Erro ao redefinir senha", {
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

  // Estado de carregamento
  if (verifying) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-zinc-50/50">
        <Card className="mx-auto max-w-sm border-zinc-200 shadow-xl">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-900"></div>
              <p className="text-sm text-zinc-600">Verificando token...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Token inválido
  if (!tokenValid) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-zinc-50/50">
        <Card className="mx-auto max-w-sm border-zinc-200 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight text-zinc-900">
              Link Inválido
            </CardTitle>
            <CardDescription>
              Este link de redefinição não é válido ou expirou
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="text-sm text-red-800">
                  O link que você está tentando usar não é válido, já foi utilizado ou expirou.
                  Solicite um novo link de redefinição de senha.
                </p>
              </div>
              <div className="space-y-2">
                <Button
                  onClick={() => router.push("/forgot-password")}
                  className="w-full bg-zinc-900 text-zinc-50"
                >
                  Solicitar novo link
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/login")}
                  className="w-full"
                >
                  Voltar para o login
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Senha redefinida com sucesso
  if (passwordReset) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-zinc-50/50">
        <Card className="mx-auto max-w-sm border-zinc-200 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight text-zinc-900">
              Senha Redefinida
            </CardTitle>
            <CardDescription>
              Sua senha foi alterada com sucesso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-sm text-emerald-800">
                  Sua senha foi redefinida com sucesso! Você será redirecionado para a página de login.
                </p>
              </div>
              <Button
                onClick={() => router.push("/login")}
                className="w-full bg-zinc-900 text-zinc-50"
              >
                Ir para o login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Formulário de redefinição de senha
  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-50/50">
      <Card className="mx-auto max-w-sm border-zinc-200 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight text-zinc-900">
            Redefinir Senha
          </CardTitle>
          <CardDescription>
            {userData && `Olá, ${userData.name}. Digite sua nova senha`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
              <p className="text-xs text-blue-800">
                A senha deve ter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula
                e um caractere especial (., @, !, #)
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Nova Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua nova senha"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirme sua nova senha"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={8}
              />
            </div>

            <Button
              disabled={loading}
              type="submit"
              className="w-full bg-zinc-900 text-zinc-50"
            >
              {loading ? "Redefinindo..." : "Redefinir senha"}
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
        </CardContent>
      </Card>
    </div>
  )
}
