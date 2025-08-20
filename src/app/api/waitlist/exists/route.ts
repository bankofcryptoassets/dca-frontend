import supabase from '../../config/db'

export async function POST(request: Request) {
  const { fid } = await request.json()
  if (!fid) {
    return Response.json({ exists: false })
  }

  const { data, error } = await supabase
    .from('waitlist')
    .select('fid')
    .eq('fid', fid)
    .single()

  console.log('data ===============>', data, error)

  if (data) {
    return Response.json({ exists: true })
  }

  return Response.json({ exists: false })
}
