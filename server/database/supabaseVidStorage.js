const { createClient } = require('@supabase/supabase-js');

const supabase = createClient('https://yourapp.supabase.co', 'YOUR_SUPABASE_KEY');

const uploadVideo = async (filename, file) => {
  try {
    const { data, error } = await supabase.storage.from('videos').upload(filename, file);
    if (error) {
      throw new Error(error.message);
    }
    const publicUrl = supabase.storage.from('videos').getPublicUrl(filename);
    return publicUrl;
  } catch (error) {
    console.error(error);
    throw new Error('Error uploading video to Supabase Storage');
  }
};

module.exports = {
  uploadVideo,
};
