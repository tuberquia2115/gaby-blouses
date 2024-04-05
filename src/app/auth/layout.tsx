export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex justify-center h-screen items-center">
      <div className="w-full sm:w-[350px] bg-white shadow-md rounded-2xl p-4 mx-4 sm:mx-0">{children}</div>
    </main>
  );
}
