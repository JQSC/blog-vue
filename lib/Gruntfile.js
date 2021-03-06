/**
 * Created by chi on 2016/12/1.
 */
module.exports=function(grunt){
    //加载插件
    [   'grunt-cafe-mocha',
        'grunt-contrib-jshint',
        'grunt-exec'
    ].forEach(function(task){
        grunt.loadNpmTasks(task)
    });
    //配置插件
    grunt.initConfig({
        //运行逻辑跨页测试
        cafemocha: {
            all: {src: 'qa/tests-*.js',options:{ui:'tdd'}}
        },
        jshint:{
           /* app:['app.js','lib/!**!/!*.js'],*/
            qa:['Gruntfile.js','public/qa/**/*.js','qa/**/*.js']
        },
        exec:{
            linkchecker:
            {cmd:'linkchecker http://localhost:8080'}
        }
    });
    //注册任务
    grunt.registerTask('default',['cafemocha','jshint','exec'])
};