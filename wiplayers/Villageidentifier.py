import json
import processing
#
#alliance_layers = QgsProject.instance().mapLayersByName('Alliance_Bounds')
#alliance_layer = alliance_layers[0]
#alliances = alliance_layer.getFeatures()
#
#
#village_layers = QgsProject.instance().mapLayersByName('Village_Points')
#village_layer = village_layers[0]
#
#for alliance in alliances:
#    
#    if alliance["TOWNSHIP"] != NULL:
#        print(AttList)
#        
#        params={ 
#        'INPUT' : village_layer, 
#        'INTERSECT' : QgsProcessingFeatureSourceDefinition(alliance.id(), True), 
#        'METHOD' : 0, 
#        'PREDICATE' : [0] }
#        
#        selectedFeatures = processing.run('qgis:selectbylocation', params)
#    else:
#        continue
#


#village_layer.startEditing()
#for village in villages:
#    village_layer.changeAttributeValue(village.id(), 5, "test")
#    print(village.id())
#village_layer.commitChanges()
#
JSONpath = "D:\\programming\\putien\\Text Parse\\output\\alliance_membership.json"
VillagePoints = 'D:/programming/putien/wiplayers/Village_Points.geojson|layername=Village_Points'
AllianceBounds = 'D:/programming/putien/wiplayers/Alliance_Bounds.geojson|layername=Alliance_Bounds'

buffer = []

with open (JSONpath, "r") as f:
    village_index = json.load(f)
    
    village_layer = iface.addVectorLayer(VillagePoints, "village_layer", "ogr")
    layer = iface.addVectorLayer(AllianceBounds, "Alliance_Bounds", "ogr")
    alliances = layer.getFeatures()

    for alliance in alliances:
        township = alliance["TOWNSHIP"]
        query = '\"TOWNSHIP\" = \'' + township + '\''
        layer.selectByExpression(query, QgsVectorLayer.SetSelection)
        params= { 
            'INPUT' : village_layer, 
            'INTERSECT' :  QgsProcessingFeatureSourceDefinition(layer.id(), True),
            'METHOD' : 0, 
            'PREDICATE' : [0] }
        
        selectedFeatures = processing.run('qgis:selectbylocation', params)
    
        index_entry = next((entry for entry in village_index if entry["UID_A"] == township), None)
        if index_entry != None:
            for index_village in index_entry["Villages"]:                
                correct_point = next((entry for entry in village_layer.getFeatures() if entry["hanzi"] == index_village["Name_zh"]), None)
                    
                if correct_point != None:
                    buffer.append({
                        "id" : correct_point.id(),
                        "index_village": index_village["UID_V"],
                        "feature": correct_point
                        })

print(buffer)