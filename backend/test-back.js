import PocketBase from "pocketbase";
import {
    getArtistesByDate,
    getScenesByNom,
    getArtistesByAlpha,
    getArtiste,
    getScene,
    getArtistesBySceneId,
    getArtistesBySceneNom,
    upsertRecord,
} from './backend.mjs';



// TEST 1 — Artistes triés par date de représentation
try {
    const records = await getArtistesByDate();
    console.log('TEST 1 — Artistes triés par date :');
    console.log(JSON.stringify(records, null, 2));
} catch (e) {
    console.error('TEST 1 erreur :', e);
}

// TEST 2 — Scènes triées par nom
try {
    const records = await getScenesByNom();
    console.log('TEST 2 — Scènes triées par nom :');
    console.log(JSON.stringify(records, null, 2));
} catch (e) {
    console.error('TEST 2 erreur :', e);
}

// TEST 3 — Artistes triés par ordre alphabétique
try {
    const records = await getArtistesByAlpha();
    console.log('TEST 3 — Artistes triés alphabétiquement :');
    console.log(JSON.stringify(records, null, 2));
} catch (e) {
    console.error('TEST 3 erreur :', e);
}

// TEST 4 — Infos d'un artiste par id
try {
    const artistes = await getArtistesByDate();
    const record = await getArtiste(artistes[0].id);
    console.log('TEST 4 — Infos artiste par id :');
    console.log(JSON.stringify(record, null, 2));
} catch (e) {
    console.error('TEST 4 erreur :', e);
}

// TEST 5 — Infos d'une scène par id
try {
    const scenes = await getScenesByNom();
    const record = await getScene(scenes[0].id);
    console.log('TEST 5 — Infos scène par id :');
    console.log(JSON.stringify(record, null, 2));
} catch (e) {
    console.error('TEST 5 erreur :', e);
}

// TEST 6 — Artistes d'une scène par id, triés par date
try {
    const scenes = await getScenesByNom();
    const records = await getArtistesBySceneId(scenes[0].id);
    console.log(`TEST 6 — Artistes de la scène "${scenes[0].nom}" par id :`);
    console.log(JSON.stringify(records, null, 2));
} catch (e) {
    console.error('TEST 6 erreur :', e);
}

// TEST 7 — Artistes d'une scène par nom, triés par date
try {
    const scenes = await getScenesByNom();
    const records = await getArtistesBySceneNom(scenes[0].nom);
    console.log(`TEST 7 — Artistes de la scène "${scenes[0].nom}" par nom :`);
    console.log(JSON.stringify(records, null, 2));
} catch (e) {
    console.error('TEST 7 erreur :', e);
}

// TEST 8 — Ajouter un artiste, le modifier, puis le supprimer
try {
    const nouvelArtiste = {
        nom: "Artiste Test",
        genre_musical: "Classique",
        description: "Artiste créé automatiquement par test-back.js",
        Date_representation: "2026-08-30 10:00:00.000Z",
        ordre_de_passage: 99,
    };
    const artisteAjoute = await upsertRecord('artiste', nouvelArtiste);
    console.log('TEST 8 — Artiste ajouté :', artisteAjoute);

    const artisteModifie = await upsertRecord('artiste', { nom: "Artiste Test Modifié" }, artisteAjoute.id);
    console.log('TEST 8 — Artiste modifié :', artisteModifie);

    const nouvelleScene = {
        nom: "Scène Test",
        description: "Scène créée automatiquement par test-back.js",
        localisation: "Test",
        capacite: 100,
    };
    const sceneAjoutee = await upsertRecord('scene', nouvelleScene);
    console.log('TEST 8 — Scène ajoutée :', sceneAjoutee);

    const sceneModifiee = await upsertRecord('scene', { nom: "Scène Test Modifiée" }, sceneAjoutee.id);
    console.log('TEST 8 — Scène modifiée :', sceneModifiee);
} catch (e) {
    console.error('TEST 8 erreur :', e);
}