pc.script.create('mySample', function (app) {
    // Creates a new MySample instance
    var MySample = function (entity) {
        this.entity = entity;
    };

    MySample.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            var student1 = new Student("Berkan USLU", "DignityAI");
            student1.sayHello();
            
            this.tank = app.root.findByName('tank');
            this.tank.enabled = false;
            this.map = app.root.findByName('map');
            this.tanks = app.root.findByName('tanks');

            this.repairModel = app.root.findByName('pickable-repair');
            this.shieldModel = app.root.findByName('pickable-shield');
            this.damageModel = app.root.findByName('pickable-damage');
            this.pickDefaultModel = app.root.findByName('pickable-default');
            this.pickParent = app.root.findByName('pickables');
        },

        addRandomModelCreator: function() {
            //create random model creator
            var _action = new DignityAction();
            _action.customActionObj = this;
            _action.customActionName = 'createRandomModel';

            var _mission = new DignityMission();
            _mission.async = true;
            _mission.continuous = true;
            _mission.actionTime = _action;
            _mission.actionTimeName = 'custom';
            _mission.time = 10000; //create every 10 seconds

            var _creator = new DignityStructure();
            _creator.missionList.push(_mission);
            _creator.start();
        },

        createRandomModel: function() {
            var model = this.getRandomModel();
            model.setPosition(this.getRandomPosition());
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        },
        
        getRandomPosition: function() {
            var worldWidth = this.map.script.createmap.map[0].length;
            var worldHeight = this.map.script.createmap.map.length;

            var randomX = Math.floor((Math.random() * (worldWidth-2)) + 1);
            var randomY = Math.floor((Math.random() * (worldHeight-2)) + 1);

            if(isNaN(randomX) || isNaN(randomY)) {
                this.getRandomPosition();
                return;
            }

            var usageInfo = this.map.script.createmap.map[randomX][randomY];
            if(usageInfo === 1) {
                this.getRandomPosition();
                return;
            }
            var x1 = 0.5 + (randomY*1);
            var z1 = 47.5 - (randomX*1);
            return (new pc.Vec3(x1, 0, z1));
        },

        getRandomPositionRange: function(minX, maxX, minY, maxY) {
            var randomX = Math.floor((Math.random() * (maxX - minX + 1)) + minX);
            var randomY = Math.floor((Math.random() * (maxY - minY + 1)) + minY);

            console.log("getRandomPositionRange: X=" + randomX + " -  Y=" + randomY);

            if(isNaN(randomX) || isNaN(randomY)) {
                this.getRandomPosition();
                return;
            }

            var usageInfo = this.map.script.createmap.map[randomX][randomY];
            if(usageInfo === 1) {
                this.getRandomPosition();
                return;
            }
            var x1 = 0.5 + (randomY*1);
            var z1 = 47.5 - (randomX*1);
            console.log("getRandomPositionRange: x1=" + x1 + " -  z1=" + z1);
            return (new pc.Vec3(x1, 0, z1));
        },

        getRandomModel: function() {
            var randomModel = Math.floor((Math.random() * 4) + 1);
            var model = null;
            switch(randomModel) {
                case 1:
                    var repair = this.repairModel.clone();
                    repair.name = 'repair_'+ new Date().getTime();
                    this.pickParent.addChild(repair);
                    //repair.addComponent('collision', { type: 'box', halfExtents: new pc.Vec3(0.5, 0.5, 0.5) });
                    console.log(repair.name);
                    model = repair;
                    break;
                case 2:
                    var shield = this.shieldModel.clone();
                    shield.name = 'shield_'+ new Date().getTime();
                    this.pickParent.addChild(shield);
                    //shield.addComponent('collision', { type: 'box', halfExtents: new pc.Vec3(0.5, 0.5, 0.5) });
                    console.log(shield.name);
                    model = shield;
                    break;
                case 3:
                    var damage = this.damageModel.clone();
                    damage.name = 'damage_'+ new Date().getTime();
                    this.pickParent.addChild(damage);
                    //damage.addComponent('collision', { type: 'box', halfExtents: new pc.Vec3(0.5, 0.5, 0.5) });
                    console.log(damage.name);
                    model = damage;
                    break;
                default:
                    var pickDefault = this.pickDefaultModel.clone();
                    pickDefault.name = 'default_'+ new Date().getTime();
                    this.pickParent.addChild(pickDefault);
                    //pickDefault.addComponent('collision', { type: 'box', halfExtents: new pc.Vec3(0.5, 0.5, 0.5) });
                    console.log(pickDefault.name);
                    model = pickDefault;
            }

            return model;
        },

        addRedTankCreator: function() {
            //create red tank creator
            var _action = new DignityAction();
            _action.customActionObj = this;
            _action.customActionName = 'createRedTankModel';

            var _mission = new DignityMission();
            _mission.async = true;
            _mission.continuous = false;
            _mission.actionTime = _action;
            _mission.actionTimeName = 'custom';
            _mission.time = 10000; //create after 10 seconds

            var _creator = new DignityStructure();
            _creator.missionList.push(_mission);
            _creator.start();
        },

        createRedTankModel: function() {
            var tankName = 'tank_' + new Date().getTime();
            var newTank = this.tank.clone();
            newTank.setName(tankName);
            newTank.enabled = true;
            newTank.setPosition(this.getRandomPositionRange(2, 10, 2, 10)); //left bottom
            //newTank.addComponent('collision', { type: 'box', halfExtents: new pc.Vec3(0.5, 0.5, 0.5) });
            this.tanks.addChild(newTank);

            var ourPath = new DignityPath();
            ourPath.map = this.map.script.createmap.map;

            var mapX = Math.round((47.5 - newTank.getPosition().z) / 1.0);
            var mapY = Math.round((newTank.getPosition().x - 0.5) / 1.0);

            while(ourPath.movementPath.length === 0) {
                ourPath.from =[mapX,mapY];
                ourPath.randomable = true;
                ourPath.findPath();
            }

            console.log('red path: ' + ourPath.movementPath);

            var vehicle = new DignityVehicle();
            vehicle.appContext = app;
            vehicle.enemyList.push('tank');
            vehicle.enemyList.push('damage');
            vehicle.enemyList.push('repair');
            vehicle.enemyList.push('shield');
            vehicle.enemyList.push('default');
            vehicle.ignoreList.push('wall');
            vehicle.pathList.push(ourPath);
            vehicle.parentObject = newTank;

            newTank.script.tank.setHP(10);
            newTank.script.tank.ai = vehicle;
            newTank.script.tank.hidden(false);
            newTank.script.tank.setTankName('red1');

            var firstAction = new DignityAction();
            firstAction.moveObj = vehicle;

            var firstMission = new DignityMission();
            firstMission.async = true;
            firstMission.actionStart = firstAction;
            firstMission.actionStartName = 'move';

            var secondAction = new DignityAction();
            secondAction.senseObj = vehicle;
            secondAction.senseRadius = 10;

            var secondMission = new DignityMission();
            secondMission.async = true;
            secondMission.actionStart = secondAction;
            secondMission.actionStartName = 'sense';

            vehicle.missionList.push(firstMission);
            vehicle.missionList.push(secondMission);
            vehicle.start();
        },

        addBlueTankCreator: function() {
            //create blue tank creator
            var _action = new DignityAction();
            _action.customActionObj = this;
            _action.customActionName = 'createBlueTankModel';

            var _mission = new DignityMission();
            _mission.async = true;
            _mission.continuous = false;
            _mission.actionTime = _action;
            _mission.actionTimeName = 'custom';
            _mission.time = 10000; //create after 10 seconds

            var _creator = new DignityStructure();
            _creator.missionList.push(_mission);
            _creator.start();
        },

        createBlueTankModel: function() {
            var tankName = 'tank_' + new Date().getTime();
            var newTank = this.tank.clone();
            newTank.setName(tankName);
            newTank.enabled = true;
            newTank.setPosition(this.getRandomPositionRange(37, 45, 2, 10)); //right top
            //newTank.addComponent('collision', { type: 'box', halfExtents: new pc.Vec3(0.5, 0.5, 0.5) });
            this.tanks.addChild(newTank);

            var ourPath = new DignityPath();
            ourPath.map = this.map.script.createmap.map;

            var mapX = Math.round((47.5 - newTank.script.tank.entity.getPosition().z) / 1.0);
            var mapY = Math.round((newTank.script.tank.entity.getPosition().x - 0.5) / 1.0);

            while(ourPath.movementPath.length === 0) {
                ourPath.from =[mapX,mapY];
                ourPath.randomable = true;
                ourPath.findPath();
            }

            console.log('blue path: ' + ourPath.movementPath);

            var vehicle = new DignityVehicle();
            vehicle.appContext = app;
            vehicle.enemyList.push('tank');
            vehicle.enemyList.push('damage');
            vehicle.enemyList.push('repair');
            vehicle.enemyList.push('shield');
            vehicle.enemyList.push('default');
            vehicle.ignoreList.push('wall');
            vehicle.pathList.push(ourPath);
            vehicle.parentObject = newTank;

            newTank.script.tank.setHP(10);
            newTank.script.tank.ai = vehicle;
            newTank.script.tank.hidden(false);
            newTank.script.tank.setTankName('blue1');

            var firstAction = new DignityAction();
            firstAction.moveObj = vehicle;

            var firstMission = new DignityMission();
            firstMission.async = true;
            firstMission.actionStart = firstAction;
            firstMission.actionStartName = 'move';

            var secondAction = new DignityAction();
            secondAction.senseObj = vehicle;
            secondAction.senseRadius = 10;

            var secondMission = new DignityMission();
            secondMission.async = true;
            secondMission.actionStart = secondAction;
            secondMission.actionStartName = 'sense';

            vehicle.missionList.push(firstMission);
            vehicle.missionList.push(secondMission);
            vehicle.start();
        },

        tankMove: function() {
            var ourPath = new DignityPath();
            ourPath.map = this.map.script.createmap.map;
            
            //convert tank 3d position to x,y array in map
            var mapX = Math.round((47.5 - this.tank.script.tank.entity.getPosition().z) / 1.0);
            var mapY = Math.round((this.tank.script.tank.entity.getPosition().x - 0.5) / 1.0);
            
            console.log('tankX: ' + mapX + ' - tankY: ' + mapY);
            
            while(ourPath.movementPath.length === 0) {
                ourPath.from =[mapX,mapY];
                ourPath.randomable = true;
                ourPath.findPath();
            }
            
            console.log('path: ' + ourPath.movementPath);
            
            var ourPath2 = new DignityPath();
            ourPath2.map = this.map.script.createmap.map;
            
            while(ourPath2.movementPath.length === 0) {
                ourPath2.from = ourPath.movementPath[ourPath.movementPath.length-1]; //get last path of previous path
                ourPath2.randomable = true;
                ourPath2.findPath();
            }
            
            console.log('path: ' + ourPath2.movementPath);
            
            var vehicle = new DignityVehicle();
            vehicle.appContext = app;
            vehicle.enemyList.push('damage');
            vehicle.enemyList.push('repair');
            vehicle.enemyList.push('shield');
            vehicle.enemyList.push('default');
            vehicle.ignoreList.push('wall');
            vehicle.pathList.push(ourPath);
            vehicle.pathList.push(ourPath2);
            vehicle.parentObject = this.tank;
            
            this.tank.script.tank.setHP(10);
            this.tank.script.tank.ai = vehicle;
            this.tank.script.tank.hidden(false);
            this.tank.script.tank.setTankName('berkan');
            
            var firstAction = new DignityAction();
            firstAction.moveObj = vehicle;
            
            var firstMission = new DignityMission();
            firstMission.async = true;
            firstMission.actionStart = firstAction;
            firstMission.actionStartName = 'move';
            
            var secondAction = new DignityAction();
            secondAction.senseObj = vehicle;
            secondAction.senseRadius = 10;
            
            var secondMission = new DignityMission();
            secondMission.async = true;
            secondMission.actionStart = secondAction;
            secondMission.actionStartName = 'sense';
            
            vehicle.missionList.push(firstMission);
            vehicle.missionList.push(secondMission);
            vehicle.start();
        }
    };

    return MySample;
});
