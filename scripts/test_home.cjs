async function test() {
  const res = await fetch('http://localhost:3000');
  console.log('Homepage status:', res.status);
  const text = await res.text();
  console.log('Contains hero section:', text.includes('id="hero"'));
  console.log('Contains heroCareerWord:', text.includes('id="heroCareerWord"'));
  console.log('Contains Book Demo class:', text.includes('Book Demo class'));
}
test().catch(err => console.error(err));
