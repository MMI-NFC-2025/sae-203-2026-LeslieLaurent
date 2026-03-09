/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_223627941")

  // remove field
  collection.fields.removeById("date4056942177")

  // update field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "date3899666902",
    "max": "",
    "min": "",
    "name": "Date_representation",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_223627941")

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "date4056942177",
    "max": "",
    "min": "",
    "name": "heure_fin",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // update field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "date3899666902",
    "max": "",
    "min": "",
    "name": "heure_debut",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
})
