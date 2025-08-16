import supabase from '../config/db'

export async function POST(request: Request) {
  const { fid } = await request.json()
  console.log('Received fid:', fid)
  if (!fid) {
    return Response.json({ error: 'Fid is required' }, { status: 400 })
  }

  try {
    const { data: existingUser } = await supabase
      .from('waitlist')
      .select('fid')
      .eq('fid', fid)
      .single()

    if (existingUser) {
      return Response.json(
        { error: 'You are already on the waitlist!' },
        { status: 409 }
      )
    }

    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ fid: fid }])

    console.log('Inserted data:', data)

    if (error) {
      throw error
    }

    return Response.json({ success: true, data })
  } catch (error) {
    console.error('Error inserting into waitlist:', error)
    return Response.json(
      { error: 'Failed to add to waitlist' },
      { status: 500 }
    )
  }
}
