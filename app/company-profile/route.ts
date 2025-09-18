export async function GET(req: Request) {
  return Response.redirect(new URL("/company-profile.pdf", req.url), 308);
}
