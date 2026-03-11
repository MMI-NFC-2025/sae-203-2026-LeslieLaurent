import PocketBase from 'pocketbase';

export const pb = new PocketBase('https://chorussymphonia.leslie-laurent.fr');

// Liste des artistes triés par date, avec scène et photo principale
export async function getArtistesByDate({ genre = '' } = {}) {
  let filter = undefined;
  if (genre) filter = `genre_musical = '${genre}'`;
  const records = await pb.collection('artiste').getFullList({
    sort: 'Date_representation',
    expand: 'Scene',
    filter,
  });
  return records.map(a => ({
    id: a.id,
    nom: a.nom,
    date: a.Date_representation,
    genre: a.genre_musical || '',
    scene: a.expand?.Scene?.nom || '',
    photo: a.photo,
    photoUrl: pb.files.getUrl(a, a.photo),
  }));
}

// Détail d'un artiste (nom, dates, scène, photo principale, description, galerie)
export async function getArtisteById(id) {
  const record = await pb.collection('artiste').getOne(id, { expand: 'Scene' });
  return {
    id: record.id,
    nom: record.nom,
    description: record.description,
    date: record.Date_representation,
    scene: record.expand?.Scene?.nom || '',
    photo: record.photo,
    photoUrl: pb.files.getUrl(record, record.photo),
    galerie: (record.galerie || []).map(img => pb.files.getUrl(record, img)),
  };
}
