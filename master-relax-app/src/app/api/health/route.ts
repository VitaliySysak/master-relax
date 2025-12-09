export async function GET() {
  return new Response(JSON.stringify('OK'), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}
