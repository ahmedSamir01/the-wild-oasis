import Link from "next/link";

export const metadata = {
  title: "The Wild Oasis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <span>The Wild Oasis</span>
    </Link>
  );
}

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/cabins">Cabins</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/account">Guest area</Link>
        </li>
      </ul>
    </nav>
  );
}
