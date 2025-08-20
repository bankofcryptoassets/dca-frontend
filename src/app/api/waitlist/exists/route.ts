import supabase from '../../config/db'

export async function POST(request: Request) {
  const { fid } = await request.json()
  if (!fid) {
    return Response.json({ exists: false })
  }

  const { data } = await supabase
    .from('waitlist')
    .select('fid')
    .eq('fid', fid)
    .single()

  if (data?.fid) {
    return Response.json({ exists: true })
  }

  return Response.json({ exists: false })
}
