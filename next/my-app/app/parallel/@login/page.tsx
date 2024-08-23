export default function Login({
  searchParams,
}: {
  searchParams: { didLogin: string };
}) {
  console.log('🚀 xx - searchParams:', searchParams);

  const { didLogin } = searchParams;

  return <>Login - {didLogin}</>;
}
