include.module( 'tool-internal-layers', [
    // 'tool-base'
], function ( inc ) {
    "use strict";

    SMK.TYPE.ToolInternalLayers = function () {
        var self = this

        this.internalLayers = []

        this.$initializers.push( function ( smk ) {
            var self = this

            var groupItems = []

            this.internalLayers.forEach( function ( ly ) {               
                ly.id = self.id + '--' + ly.id
                ly.type = 'vector'
                ly.isVisible = true
                ly.isQueryable = false
                ly.isInternal = true

                var display = smk.$viewer.addLayer( ly )
                display.class = "smk-inline-legend"

                groupItems.push( { id: display.id } )
                // self.internalLayer[ ly.id ] = smk.$viewer.layerId[ ly.id ]
            } )

            smk.$viewer.setDisplayContextItems( this.type, [ {
                id: this.id,
                type: 'group',
                title: this.title,
                isVisible: false,
                isInternal: true,
                items: groupItems,
                showItem: false
            } ] )

            this.setInternalLayerVisible = function ( visible ) {
                smk.$viewer.displayContext[ self.type ].setItemVisible( self.id, visible )
            }

            this.getInternalLayer = function ( id ) {
                if ( !smk.$viewer.layerId[ this.id + '--' + id ] ) throw Error( 'internal layer ' + id + ' not defined' )

                return smk.$viewer.layerId[ this.id + '--' + id ]
            }

            this.clearInternalLayer = function ( id ) {
                this.getInternalLayer( id ).clear()
            }

            this.loadInternalLayer = function ( id, geojson ) {
                this.getInternalLayer( id ).load( geojson )
            }

        } )
    }
} )

