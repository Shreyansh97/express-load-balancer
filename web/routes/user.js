const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const validator = require('../joivalidator');
const schemas = require('../schemas/user');


const { domain, server } = require('../models');

const writeconfig = async id => {
  return new Promise(async (resolve,reject) => {
    try {
      let currDom = await domain.findOne({ where: {id} });
      let servers = await server.findAll({ where: {domainId: id}});

      let flag = true; // flag to check if any servers are available for this domain
      for(let i=0;i<servers.length;i++) {
        if(servers[i].backup == '0' && servers[i].down == '0') {
          flag = false;
          break;
        }
      }
      if(flag) {
        await deleteConfig(id);
        return resolve();
      }
      let config = 
`upstream myapp${currDom.id} {
  ${currDom.type == 2?'least_conn;':(currDom.type == 3?'ip_hash;':'')}
  ${servers.map(x=>(`server ${x.ip} weight=${x.weight} max_conns=${x.max_conns} max_fails=${x.max_fails} fail_timeout=${x.fail_timeout} ${x.backup==1?'backup':''} ${x.down==1?'down':''};`))
  .join('\n    ')}
}

server {
  listen ${currDom.protocol == 'http'?'80':'443'};

  location / {
    proxy_pass ${currDom.protocol}://myapp${currDom.id};
  }
}
`
    console.log(config);
    fs.writeFile(path.join(__dirname,'..','..','conf',currDom.protocol+'.'+currDom.name+'.nginx.conf'),config,function(err){
      if(err) return reject(err);
      return resolve();
    })
    } catch (err) {
      reject(err);
    }
  });
}

const deleteConfig = async id =>{
  return new Promise(async(resolve,reject) =>{
    try {
      let currDom = await domain.findOne({ where: { id }});
      fs.unlink(path.join(__dirname,'..','..','conf',currDom.protocol+'.'+currDom.name+'.nginx.conf'),err=>{
        resolve();
      });
    } catch(err) {
      return reject(err);
    }
  });
};

const restartNginx = new Promise(async (resolve,reject) => {
  //figure this part out
  return resolve();
});

router.post(
  '/addDomain',
  validator(schemas.addDomain),
  async (req,res) => {
    try {
      let newDomain = await domain.create(req.body);
      await writeconfig(newDomain.id);
      return res.sendSuccess(newDomain);
    } catch (err) {
      return res.sendError(err);
    }
  }
);

router.post(
  '/deleteDomain',
  validator(schemas.deleteDomain),
  async (req,res) => {
    try {
      await deleteConfig(req.body.id);
      await server.destroy({ where: {domainId: req.body.id } });
      await domain.destroy({ where: { id: req.body.id } });
      return res.sendSuccess();
    } catch(err) {
      return res.sendError(err);
    }
  }
);

router.post(
  '/addServer',
  validator(schemas.addServer),
  async (req,res) => {
    try {
      let newServer = await server.create(req.body);
      await writeconfig(req.body.domainId);
      return res.sendSuccess(newServer);
    } catch(err) {
      return res.sendError(err);
    }
  }
)


module.exports = router;