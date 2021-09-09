var app = new Vue({
    el: "#app",
    data: {
        player_health : 100,
        monster_health : 100,
        isStarted : false,
        points: [{player_point : null,monster_point : null, type: ''}]
    },
    methods: {
        start_game: function(){
            this.player_health = 100
            this.monster_health = 100
            this.points = [{player_point : null,monster_point : null}]
            return this.isStarted = true
        },
        attack: function(){
            const player_attack_point = Math.floor(Math.random() * 20);
            const monster_attack_point = Math.floor(Math.random() * 20);
            
            this.points.push({ 
                player_point: player_attack_point, 
                monster_point: monster_attack_point, 
                type: 'normal'})

            this.player_health -= monster_attack_point;
            this.monster_health -= player_attack_point;      
        },
        special_attack: function(){
            const player_special_attack_point = Math.floor(Math.random() * (50-20)) + 20;
            const monster_special_attack_point = Math.floor(Math.random() * (50-20)) + 20;
           
            this.points.push({ 
                player_point: player_special_attack_point, 
                monster_point: monster_special_attack_point,
                type: 'special'})

            this.player_health -= monster_special_attack_point;
            this.monster_health -= player_special_attack_point;
            this.update_game()
        },
        heal_up : function(){
            const player_heal_up_point = Math.floor(Math.random() * (20-10) + 10);

            this.points.push({ 
                player_point: player_heal_up_point, 
                monster_point: 0,
                type: 'heal'})

            this.player_health += player_heal_up_point;   
        },
        give_up : function(){
            this.player_health = 0
        } 
    },
    watch : {
        player_health : function(value){
            if(value <= 0) {
                this.player_health = 0
                if(confirm("Defeat! Play again?")){
                    this.start_game()
                }
            } else if ( value >= 100){
                this.player_health = 100
            }
        },
        monster_health : function(value){
            if(value <= 0) {
                this.monster_health = 0
                if(confirm("Victory! Play again?")){
                    this.start_game()
                }
            } else if ( value >= 100){
                this.monster_health = 100
            }
        }
    }
});