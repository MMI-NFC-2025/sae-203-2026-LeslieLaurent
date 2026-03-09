
import PocketBase from "pocketbase";
export const pb = new PocketBase("http://127.0.0.1:8090");

// Authentification admin (à adapter avec tes identifiants)
// await pb.adminAuthWithPassword('admin@email.com', 'motdepasse');

// 1. Retourne la liste de tous les artistes triés par date de représentation

export async function getArtistesByDate() {
    const records = await pb.collection('artiste').getFullList({
        sort: 'Date_representation',
        expand: 'Scene',
    });
    return records;
}

// 2. Retourne la liste de toutes les scènes triées par nom

export async function getScenesByNom() {
    const records = await pb.collection('scene').getFullList({
        sort: 'nom',
    });
    return records;
}

// 3. Retourne la liste de tous les artistes triés par ordre alphabétique

export async function getArtistesByAlpha() {
    const records = await pb.collection('artiste').getFullList({
        sort: 'nom',
        expand: 'Scene',
    });
    return records;
}

// 4. Retourne les infos d'un artiste en donnant son id en paramètre

export async function getArtiste(id) {
    const record = await pb.collection('artiste').getOne(id, {
        expand: 'Scene',
    });
    return record;
}

// 5. Retourne les infos d'une scène en donnant son id en paramètre

export async function getScene(id) {
    const record = await pb.collection('scene').getOne(id);
    return record;
}

// 6. Retourne tous les artistes se produisant sur une scène donnée par son id, triés par date

export async function getArtistesBySceneId(sceneId) {
    const records = await pb.collection('artiste').getFullList({
        filter: `Scene = "${sceneId}"`,
        sort: 'Date_representation',
        expand: 'Scene',
    });
    return records;
}

// 7. Retourne tous les artistes se produisant sur une scène donnée par son nom, triés par date

export async function getArtistesBySceneNom(sceneNom) {
    const scenes = await pb.collection('scene').getFullList({
        filter: `nom = "${sceneNom}"`,
    });
    const records = await pb.collection('artiste').getFullList({
        filter: `Scene = "${scenes[0].id}"`,
        sort: 'Date_representation',
        expand: 'Scene',
    });
    return records;
}

// 8. Permet d'ajouter ou modifier les informations d'un artiste ou d'une scène

export async function upsertRecord(type, record, id = null) {
    if (id) {
        return await pb.collection(type).update(id, record);
    } else {
        return await pb.collection(type).create(record);
    }
}

// Helper — URL d'un fichier PocketBase

export function getImageUrl(record, filename) {
    return pb.files.getURL(record, filename);
}

// Static paths — pour les routes dynamiques Astro [id].astro

export async function getStaticPathsArtistes() {
    const artistes = await getArtistesByDate();
    return artistes.map(artiste => ({
        params: { id: artiste.id },
        props: { artiste }
    }));
}

export async function getStaticPathsScenes() {
    const scenes = await getScenesByNom();
    return scenes.map(scene => ({
        params: { id: scene.id },
        props: { scene }
    }));
}