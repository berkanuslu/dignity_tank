pc.script.create('createmap', function (app) {
    // Creates a new Createmap instance
//    var totalTime = 0;
//    var totalTimeTank = 0;
//    var initializeCompleted = false;
    
    var Createmap = function (entity) {
        this.entity = entity;
        this.map = [[]];
        this.berkan = "berkan uslu";
    };

    Createmap.prototype = {
        initialize: function () {
            this.floorModel = app.root.findByName('map0_0');
            this.wallModel = app.root.findByName('wall0_0');
            this.mapParent = app.root.findByName('map');
            
            this.initializeMap(48, 48);
        },

        update: function (dt) {
//            if(initializeCompleted) {
//                totalTime += dt;
//                totalTimeTank += dt;
//                if(totalTime > 5) { //every 30 seconds create pickables
//                    this.pickables = app.root.findByName('pickables');
//                    this.pickables.script.createpickables.createRandom(this.mapWidth, this.mapHeight);
//                    totalTime = 0;
//                }
//
//                if(totalTimeTank > 10) {
//                    this.example = app.root.findByName('tanx');
//                    this.example.script.mySample.tankMove();
//                    totalTimeTank = -1000000;
//                }
//            }
        },
        
        initializeMap: function(_worldWidth, _worldHeight) {
            for (var x=0; x < _worldWidth; x++)
            {
                this.map[x] = [];
        
                for (var y=0; y < _worldHeight; y++)
                {
                    this.map[x][y] = 0;
                    var floor = this.floorModel.clone();
                    var pos = floor.getPosition();
                    this.mapParent.addChild(floor);
                    floor.setPosition(new pc.Vec3(pos.x+(y*1), pos.y, pos.z-(x*1)));
                    console.log("yol eklendi");
                }
            }
        
            for (var x1=0; x1 < _worldWidth; x1++)
            {
                for (var y1=0; y1 < _worldHeight; y1++)
                {
                    if (Math.random() > 0.95 || (y1 === 0) || (x1 === 0) || (x1  == _worldWidth-1) || (y1 == _worldHeight-1)) {
                        this.map[x1][y1] = 1;
                        var wall = this.wallModel.clone();
                        wall.name = "wall_"+x1+"_"+y1;
                        var pos1 = wall.getPosition();
                        this.mapParent.addChild(wall);
                        wall.setPosition(new pc.Vec3(pos1.x+(y1*1), pos1.y, pos1.z-(x1*1)));
                        console.log("duvar eklendi");
                    }
                }
            }
            this.onInitCompeted();
        },

        onInitCompeted: function() {
            app.root.getChildren()[0].script.mySample.addRandomModelCreator();
            app.root.getChildren()[0].script.mySample.addRedTankCreator();
            app.root.getChildren()[0].script.mySample.addBlueTankCreator();
        }
    };

    return Createmap;
});
