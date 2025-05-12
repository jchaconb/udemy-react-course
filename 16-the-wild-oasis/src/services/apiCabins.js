import { SUPABASE_URL } from '../utils/constants';
import supabase from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error('error');
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function createUpdateCabin(newCabin, id) {
  const hasImagePath =
    typeof newCabin.image === 'string' &&
    newCabin.image.startsWith(SUPABASE_URL);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    '',
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/Update cabin
  let query = supabase.from('cabins');

  // a) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // b) UPDATE
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error('error');
    throw new Error('Cabins could not be created');
  }

  // 2. Upload Image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created',
    );
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error('error');
    throw new Error('Cabins could not be deleted');
  }

  return data;
}
