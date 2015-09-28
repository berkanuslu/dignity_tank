pc.script.create('singlePlayer', function (context) {
    // Creates a new SinglePlayer instance
    var SinglePlayer = function (entity) {
        this.entity = entity;
        this.id = null;
        this.movement = [ 0, 0 ];
        context.keyboard = new pc.input.Keyboard(document.body);
        
        document.body.style.cursor = 'none';
    };
    
    var getParameterByName = function(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    SinglePlayer.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.tank = context.root.findByName('tank');
            this.tank.enabled = true;

            this.camera = context.root.findByName('camera');
            
            this.overlay = context.root.getChildren()[0].script.overlay;
            
            //this.tanks = context.root.getChildren()[0].script.tanks;
            //this.bullets = context.root.getChildren()[0].script.bullets;
            //this.pickables = context.root.getChildren()[0].script.pickables;
            //this.teams = context.root.getChildren()[0].script.teams;
            //this.profile = context.root.getChildren()[0].script.profile;
            
            //var newTank = this.tank.clone();
            
            //this.camera.script.link.link = this.tank;
            
            this.overlay.killer(false);
            this.overlay.cinematic(false);
            this.overlay.overlay(false);
            //this.minimap.state(true);
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return SinglePlayer;
});