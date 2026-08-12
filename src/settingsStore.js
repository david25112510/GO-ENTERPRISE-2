'use strict';
const fs = require('fs');
const path = require('path');
const DEFAULTS = { sharedFolder:null, dataSubfolder:'dados', dataFileName:'gestao_operacional.json', updatesSubfolder:'atualizacoes', tv:{displayId:null,autoFullscreen:true}, autoCheckUpdates:true, updateCheckIntervalMinutes:60, lastUpdateCheck:null };
let settingsPath=null, cache=null;
function init(userDataPath){settingsPath=path.join(userDataPath,'settings.json');load();}
function load(){try{if(fs.existsSync(settingsPath)){cache={...DEFAULTS,...JSON.parse(fs.readFileSync(settingsPath,'utf-8'))};}else cache={...DEFAULTS};}catch(e){console.warn('[settingsStore] Falha ao ler settings.json, usando padrão:',e.message);cache={...DEFAULTS};}return cache;}
function save(){try{fs.mkdirSync(path.dirname(settingsPath),{recursive:true});fs.writeFileSync(settingsPath,JSON.stringify(cache,null,2),'utf-8');}catch(e){console.warn('[settingsStore] Falha ao salvar settings.json:',e.message);}}
function get(){return cache||load();}
function set(partial){cache={...get(),...partial};save();return cache;}
function dataFilePath(){const s=get();return s.sharedFolder?path.join(s.sharedFolder,s.dataSubfolder,s.dataFileName):null;}
function updatesFolderPath(){const s=get();return s.sharedFolder?path.join(s.sharedFolder,s.updatesSubfolder):null;}
module.exports={init,load,save,get,set,dataFilePath,updatesFolderPath,DEFAULTS};
