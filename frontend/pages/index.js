import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <Link href="/portfolio">
        <button>Go to Portfolios</button>
      </Link>
    </div>
  );
}