include.module( 'tool-feature-list', [ 
    'component-feature-list'
], function ( inc ) {
    "use strict";

    SMK.TYPE.ToolFeatureList = function ( featureSetCallback ) {
        this.defineProp( 'layers' )
        this.defineProp( 'highlightId' )

        this.layers = []

        this.$initializers.push( function ( smk ) {
            var self = this

            this.featureSet = featureSetCallback.call( this, smk )
            
            smk.on( this.id, {
                'active': function ( ev ) {
                    self.featureSet.pick( ev.featureId )
                },
    
                'hover': function ( ev ) {
                    self.featureSet.highlight( ev.features && ev.features.map( function ( f ) { return f.id } ) )
                },
    
                'clear': function ( ev ) {
                    self.featureSet.clear()
                },
    
                'remove': function ( ev ) {
                    self.featureSet.remove( [ ev.featureId ] )
                },
    
                'swipe-up': function ( ev ) {
                    smk.$sidepanel.setExpand( 2 )
                },
    
                'swipe-down': function ( ev ) {
                    smk.$sidepanel.incrExpand( -1 )
                }
            } )
      
            // = : = : = : = : = : = : = : = : = : = : = : = : = : = : = : = : = : = : =
    
            self.featureSet.addedFeatures( function ( ev ) {
                self.active = true
    
                var ly = smk.$viewer.layerId[ ev.layerId ]
                var index = smk.$viewer.displayContext.layers.getLayerIndex( ev.layerId ) || 0
    
                self.modifyComponentProp( 'layers', function ( prop ) {
                    if ( !prop[ index ] )
                        Vue.set( prop, index, {
                            id:         ly.id,
                            title:      ly.config.title,
                            features:   []
                        } )

                    Vue.set( prop[ index ], 'features', prop[ index ].features.concat( ev.features.map( function ( ft ) {
                        if ( !self.firstId )
                            self.firstId = ft.id
        
                        return {
                            id:     ft.id,
                            title:  ft.title
                        }
                    } ) ) ) 
                } )
            } )
    
            self.featureSet.clearedFeatures( function ( ev ) {
                self.layers = []
                self.firstId = null
                self.clearInternalLayer( 'highlight-polygon' )
                self.clearInternalLayer( 'highlight-line' )
                self.clearInternalLayer( 'highlight-point' )
            } )
    
            self.featureSet.removedFeatures( function ( ev ) {
                var ly = smk.$viewer.layerId[ ev.features[ 0 ].layerId ]
                var index = smk.$viewer.displayContext.layers.getLayerIndex( ev.features[ 0 ].layerId ) || 0
    
                self.layers[ index ].features = self.layers[ index ].features.filter( function ( ft ) {
                    return ft.id != ev.features[ 0 ].id
                } )
            } )

            self.featureSet.pickedFeature( function ( ev ) {
                self.clearInternalLayer( 'highlight-polygon' )
                self.clearInternalLayer( 'highlight-line' )
                self.clearInternalLayer( 'highlight-point' )
                if ( !ev.feature ) return

                displayFeature( ev.feature )
            } )

            self.featureSet.highlightedFeatures( function ( ev ) {
                self.clearInternalLayer( 'highlight-polygon' )
                self.clearInternalLayer( 'highlight-line' )
                self.clearInternalLayer( 'highlight-point' )
               
                if ( ev.features ) 
                    ev.features.forEach( function ( f ) {
                        displayFeature( f )
                    } )

                var picked = self.featureSet.getPicked()
                if ( picked )
                    displayFeature( picked )
            } )
    
            function displayFeature( feature ) {
                if ( feature.layerId ) {
                    var ly = smk.$viewer.layerId[ feature.layerId ]
                    if ( ly.config.isDisplayed === false ) return
                }
                
                switch ( turf.getType( feature ) ) {
                    case 'Point':
                    case 'MultiPoint':
                        self.loadInternalLayer( 'highlight-point', feature )
                        break
    
                    case 'LineString':
                    case 'MultiLineString':
                        self.loadInternalLayer( 'highlight-line', feature )
                        break
    
                    case 'Polygon':
                    case 'MultiPolygon':
                        self.loadInternalLayer( 'highlight-polygon', feature )
                        break
    
                    case 'GeometryCollection':                    
                        break
                }
            }
        } )    
    }
} )
