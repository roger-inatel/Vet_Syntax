"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../stores/auth-store";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const error = useAuthStore((state) => state.error);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    await login(data.email, data.password);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-mist text-ink">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl items-center justify-between gap-12 px-6">
        <div className="max-w-md space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-fern">Vet Platform</p>
          <h1 className="text-4xl font-semibold">Acesso admin</h1>
          <p className="text-base text-ink/70">
            Entre com seu email e senha para acessar o painel da clinica.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm space-y-4 rounded-3xl bg-white p-8 shadow-soft"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full rounded-xl border border-clay/40 bg-transparent px-4 py-2 focus:border-fern focus:outline-none"
              {...register("email")}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Senha</label>
            <input
              type="password"
              className="w-full rounded-xl border border-clay/40 bg-transparent px-4 py-2 focus:border-fern focus:outline-none"
              {...register("password")}
            />
          </div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-fern px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
