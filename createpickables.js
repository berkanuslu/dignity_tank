pc.script.attribute('mapWidth', 'number', 48);
pc.script.attribute('mapHeight', 'number', 48);
pc.script.create('createpickables', function (app) {
    // Creates a new Createpickables instance
    var Createpickables = function (entity) {
        this.entity = entity;
    };

    Createpickables.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.repairModel = app.root.findByName('pickable-repair');
            this.shieldModel = app.root.findByName('pickable-shield');
            this.damageModel = app.root.findByName('pickable-damage');
            this.pickDefaultModel = app.root.findByName('pickable-default');
            this.pickParent = app.root.findByName('pickables');
            
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            
        },
        
        createRandom: function(_worldWidth, _worldHeight) {
            var randomModel = Math.floor((Math.random() * 4) + 1);
            var randomX = Math.floor((Math.random() * (_worldWidth-2)) + 1);
            var randomY = Math.floor((Math.random() * (_worldHeight-2)) + 1);
            if(isNaN(randomX) || isNaN(randomY)) {
                return;
            }
            
            this.map = app.root.findByName('map');
//            console.log(this.map.script.createmap.berkan); //access another script file fields

            var usageInfo = this.map.script.createmap.map[randomX][randomY];
            if(usageInfo === 1) {
                this.createRandom(this.mapWidth, this.mapHeight);
                return;
            }
            
            switch(randomModel) {
                case 1:
                    var repair = this.repairModel.clone();
                    repair.name = 'repair_'+ new Date().getTime();
                    this.pickParent.addChild(repair);
                    var x1 = 0.5 + (randomY*1);
                    var z1 = 47.5 - (randomX*1);
                    //repair.addComponent('collision', { type: 'box', halfExtents: new pc.Vec3(0.5, 0.5, 0.5) });

                    repair.setPosition(new pc.Vec3(x1, 0, z1));
                    console.log(repair.name);
                    break;
                case 2:
                    var shield = this.shieldModel.clone();
                    shield.name = 'shield_'+ new Date().getTime();
                    this.pickParent.addChild(shield);
                    var x2 = 0.5 + (randomY*1);
                    var z2 = 47.5 - (randomX*1);
                    //shield.addComponent('collision', { type: 'box', halfExtents: new pc.Vec3(0.5, 0.5, 0.5) });
                    shield.setPosition(new pc.Vec3(x2, 0, z2));
                    console.log(shield.name);
                    break;
                case 3:
                    var damage = this.damageModel.clone();
                    damage.name = 'damage_'+ new Date().getTime();
                    this.pickParent.addChild(damage);
                    var x3 = 0.5 + (randomY*1);
                    var z3 = 47.5 - (randomX*1);
                    //damage.addComponent('collision', { type: 'box', halfExtents: new pc.Vec3(0.5, 0.5, 0.5) });
                    damage.setPosition(new pc.Vec3(x3, 0, z3));
                    console.log(damage.name);
                    break;
                default:
                    var pickDefault = this.pickDefaultModel.clone();
                    pickDefault.name = 'default_'+ new Date().getTime();
                    this.pickParent.addChild(pickDefault);
                    var x4 = 0.5 + (randomY*1);
                    var z4 = 47.5 - (randomX*1);
                    //pickDefault.addComponent('collision', { type: 'box', halfExtents: new pc.Vec3(0.5, 0.5, 0.5) });
                    pickDefault.setPosition(new pc.Vec3(x4, 0, z4));
                    console.log(pickDefault.name);
            }
        }
    };

    return Createpickables;
});
