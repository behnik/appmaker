const node_cron = require('node-cron');
const db_services = require('./dbservices');

//const vm = require('vm');
//const {VM} = require('vm2');

var asyncEval = require('async-eval');

exports.init = async () => {

    node_cron.schedule(`*/1 * * * *`, async () => {
        var schedules = await db_services.exec_query('select * from schedules where is_active = 1');

        schedules.forEach(async element => {
            try{
                console.log(`schedule ${element.title} started.`);
                console.log(element.content);

                // var result = await eval(`(async()=>{ ${element.content}})`);
                //var result = 
                is_script_ended = false;
                eval(`(async()=>{ ${element.content}})`);
                while(!is_script_ended){ await this.sleep(1000); }
                //console.log(result);

                // const context = {  db_services : db_services };
                // vm.createContext(context); // Contextify the object.

                // await vm.runInContext(element.content, context);
                // asyncEval(element.content,{},function(){

                // });

                //let result = Function(await element.content);

                await db_services.exec_query(`update schedules set last_executed = current_timestamp() where id=:id`,{
                    id : element.id
                });
                console.log(`schedule ${element.title} finished.`);
            }
            catch(e){
                console.log(`schedule ${element.title} failed.`);
                console.log(e);
            }
        });
    });
};

exports.sleep = (time)=> {
    return new Promise(resolve => setTimeout(resolve, time));
}