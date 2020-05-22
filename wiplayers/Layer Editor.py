village_layers = QgsProject.instance().mapLayersByName('Village_Points')
village_layer = village_layers[0]
villages = village_layer.getFeatures()

village_layer.startEditing()
for entry in buffer:
    village_layer.changeAttributeValue(entry["id"], 4, entry["index_village"])
#    village_layer.changeAttributeValue(1, 4 , "test")
village_layer.commitChanges()