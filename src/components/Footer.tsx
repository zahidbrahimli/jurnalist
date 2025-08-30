import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-neutral-600">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-neutral-700">© {new Date().getFullYear()} Ön Yoxlama Platforması</p>
          <nav className="flex flex-wrap gap-4">
            <Link href="#" className="hover:text-teal-700">Məxfilik</Link>
            <Link href="#" className="hover:text-teal-700">Şərtlər</Link>
            <Link href="#" className="hover:text-teal-700">Əlaqə</Link>
            <Link href="#" className="hover:text-teal-700">Media üçün qaydalar</Link>
            <Link href="#" className="hover:text-teal-700">API/İnteqrasiya</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
