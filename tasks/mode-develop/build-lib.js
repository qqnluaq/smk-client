module.exports = function( grunt ) {

    grunt.registerTask( 'build-lib', [
        'jshint:lib',
        'copy:lib',
    ] )

    grunt.config.merge( {

        copy: {
            'lib': {
                files: [
                    {
                        expand: true,
                        cwd: '<%= srcPath %>/smk',
                        src: [ '**', '!**/*.{gif,png,jpg,jpeg}' ],
                        dest: '<%= distPath %>/smk'
                    },
                    {
                        expand: true,
                        cwd: '<%= srcPath %>/lib',
                        src: [ '**', '!include.js', '!tag-gen.js'  ],
                        dest: '<%= distPath %>/lib'
                    },
                ]
            },
        },

    } )

    grunt.log.ok( 'Task mode-develop/build-lib' )
}