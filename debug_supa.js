
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://setkfmjqreramgqrgdpc.supabase.co'
const supabaseKey = 'sb_publishable_x-bhu4TeOqoO0RvbZBTD0Q_EHCcHkg_'
const supabase = createClient(supabaseUrl, supabaseKey)

async function debug() {
    const { data, error } = await supabase
        .from('case_studies')
        .select('title, published, is_featured, thumbnail_url')

    if (error) {
        console.error('Error fetching data:', error)
    } else {
        data.forEach(d => {
            console.log(`- ${d.title}`);
            console.log(`  Published: ${d.published}, Featured: ${d.is_featured}`);
            console.log(`  Thumb: ${d.thumbnail_url}`);
        });
    }
}

debug()
