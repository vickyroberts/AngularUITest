module.exports = function(grunt)
{   
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        
        jshint: 
        {
            options:{reporter:require('jshint-stylish')},
            build : ['GruntFile.js','app.js','app/**/*.js']
        },
        uglify:
        {
          options:{banner:'/*\n<%=pkg.name%>  <%=grunt.template.today("yyyy-mm-dd")%>\n*/\n'},
          build : {files:{'source/js/allservice.js':['app/shared/authservice.js', 'app/shared/flash.service.js','app/shared/httpinterceptor.service.js','app/shared/userservice.js'],
                    'source/js/usercontrollers.js':['app/usermanagement/useradd.controller.js','app/usermanagement/userlist.controller.js']}}
        },
        watch:
        {
            scripts: {
                files:'app/**/*.js',tasks:['jshint','uglify']
            }
        }            
    });
    
    grunt.registerTask('default', ['jshint','uglify']); 
    
    
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
};