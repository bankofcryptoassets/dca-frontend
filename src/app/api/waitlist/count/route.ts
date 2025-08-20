import supabase from '../../config/db'

export async function GET() {
  const { count } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact' })

  return Response.json({ count })
}
