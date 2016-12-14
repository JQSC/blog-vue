/**
 * Created by chi on 2016/12/1.
 */
suite('Global Tests',function(){
    test('page has a valid title',function(){
        assert(document.title && document.title.match(/\S/) &&
            document.title.toUpperCase()!=='TODD');
    })

})