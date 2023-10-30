const db_services = require('./dbservices');
var UglifyJS = require("uglify-js");
var UglifyHtml = require('html-minifier').minify;
const ejs = require('ejs');

exports.init = async (app) => {
    app.get('/', async (req, res) => { return res.redirect('/pages/home'); });

    /**
     * get page by url
     */
    app.get('/pages/:url', async (req, res) => {
        try {
            var url = req.params.url;

            var page_response = await db_services.exec_query(
                `select title,page_content from pages where url=:url and page_type = 1`, { url: url }
            );

            if (page_response !== null && page_response.length === 1) {
                var page = page_response[0];
                let template = ejs.render(page.page_content, {
                    title: page.title
                });
                html = UglifyHtml(template);
                res.setHeader('content-type', 'text/html');
                return res.send(html);
            }
            else return res.send({ code: 404, message: 'صفحه یافت نشد!' });
        }
        catch (e) {
            return res.send({
                code : 500 , 
                message : 'خطا در بارگذاری صفحه!',
                error : e
            });
        }
    });

    /**
     * get script by url
     */
    app.get('/js/:url', async (req, res) => {
        try {
            var url = req.params.url;

            var page_response = await db_services.exec_query(
                `select title,page_content from pages where url=:url and page_type = 2`, { url: url }
            );

            if (page_response !== null && page_response.length === 1) {
                var page = page_response[0];

                // var result = UglifyJS.minify(page.content, {
                //     compress: {
                //         drop_console: false,
                //         drop_debugger: true,
                //         toplevel: true
                //     }
                // });
                // console.log(result.code);
                // var html = result.code;

                res.setHeader('content-type', 'application/javascript');  
                return res.send(page.page_content);
            }
            else return res.send({ code: 404, message: 'صفحه یافت نشد!' });
        }
        catch (e) {
            return res.send({
                code : 500 , 
                message : 'خطا در بارگذاری صفحه!',
                error : e
            });
        }
    });

    /**
     * get style by url
     */
    app.get('/css/:url', async (req, res) => {
        try {
            var url = req.params.url;

            var page_response = await db_services.exec_query(
                `select title,page_content from pages where url=:url and page_type = 3`, { url: url }
            );

            if (page_response !== null && page_response.length === 1) {
                var page = page_response[0];

                res.setHeader('content-type', 'text/css');  
                return res.send(page.page_content);
            }
            else return res.send({ code: 404, message: 'صفحه یافت نشد!' });
        }
        catch (e) {
            return res.send({
                code : 500 , 
                message : 'خطا در بارگذاری صفحه!',
                error : e
            });
        }
    });

    /**
     * execute function as api
     */
    app.post('/api/:url', async (req, res) => {
        try{
            var url = req.params.url;

            var page_response = await db_services.exec_query(
                `select page_content from pages where url=:url and page_type = 4`, { url: url }
            );
    
            if (page_response != null) return res.send(await eval(page_response[0].page_content));
            else return res.send({ code: 404, message: 'درخواست یافت نشد!' });
        }
        catch(e){
            return res.send({ 
                code : 500 ,
                message : 'خطا در بارگذاری درخواست!',
                error : e
            });
        }
    });
    
    app.use((req, res, next) => {
        res.status(404).json({
            message: 'Ohh you are lost, read the API documentation to find your way back home :)'
        })
    });
};