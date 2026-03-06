import { signInAction } from "./actions";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-semibold">Sign in to Alere</h1>
        <p className="mt-2 text-sm text-slate-300">This is a secure prototype auth gate for onboarding and personalization flows.</p>

        <form action={signInAction} className="mt-6 space-y-3">
          <label className="block text-sm">
            <span className="mb-1 block">Email</span>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-slate-400"
              placeholder="you@example.com"
            />
          </label>
          <button className="w-full rounded-xl bg-emerald-400 px-4 py-3 font-semibold text-slate-950 hover:bg-emerald-300">
            Continue
          </button>
        </form>
      </div>
    </main>
  );
}
