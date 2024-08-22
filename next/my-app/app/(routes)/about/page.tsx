export default function About() {
  const now = new Date().getTime();
  console.log('About!!');
  return <div className='border p-5'>About Page : {now}</div>;
}
