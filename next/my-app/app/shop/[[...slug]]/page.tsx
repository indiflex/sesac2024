export default function ShopSlug({
  params,
}: {
  params: {
    slug: string[];
  };
}) {
  const { slug } = params;
  console.log('🚀  slug:', slug);
  if (!slug) return <h2>AAA</h2>;
  return <h3 className='text-2xl'>ShopSlug - {slug?.join()}</h3>;
}
