export async function GET(request, { params }) {
  const { cabinId } = await params;
  return Response.json({ message: "Hello, world!" });
}
