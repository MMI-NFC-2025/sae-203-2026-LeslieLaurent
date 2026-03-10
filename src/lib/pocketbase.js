import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090'); // adapte l'URL si besoin

export async function getArtisteById(id) {
  const record = await pb.collection('artiste').getOne(id);
  return {
    nom: record.nom,
    role: record.role,
    description: record.description,
    photoUrl: pb.files.getUrl(record, record.photo) // suppose un champ 'photo'
  };
}
