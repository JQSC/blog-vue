/**
 * Created by chi on 2016/12/1.
 */
suite('"About" Page Tests',function(){
    test('page should contain link to contact page',function(){
        assert($('a[href="/contact"]').length)

    })

})