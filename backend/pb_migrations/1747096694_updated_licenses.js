/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1065113382")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_3BoTs07ALZ` ON `licenses` (`licenseKey`)",
      "CREATE UNIQUE INDEX `idx_vMHqhbaLPV` ON `licenses` (`userId`)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1065113382")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_3BoTs07ALZ` ON `licenses` (`licenseKey`)",
      "CREATE INDEX `idx_vMHqhbaLPV` ON `licenses` (`userId`)"
    ]
  }, collection)

  return app.save(collection)
})
