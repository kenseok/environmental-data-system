import Link from "next/link";

export default function Navigation () {
    return (

        <nav className="bg-blue-600 text-white p-4">
            <div className="flex space-x-6">
                <Link href="/" className="hover:underline">Home</Link>
                <Link href="/dashboard" className="hover:underline">Dashboard</Link>
                <Link href="/data" className="hover:underline">Data care</Link>
                <Link href="/data/create" className="hover:underline">Data create</Link>
            </div>
        </nav>
    )
}