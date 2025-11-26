
window.addEventListener("load",()=>{

const canvas=document.getElementById("pixelSwarmCanvas");
if(!canvas) return;
const ctx=canvas.getContext("2d");

function resize(){
    const hero=document.getElementById("home");
    canvas.width=hero.offsetWidth;
    canvas.height=hero.offsetHeight;
}
resize();
window.addEventListener("resize",resize);

class Pixel{
    constructor(){
        this.reset();
    }
    reset(){
        const sizes=[1,3,5];
        this.size=sizes[Math.floor(Math.random()*sizes.length)];
        this.x=Math.random()*canvas.width;
        this.y=Math.random()*canvas.height;
        this.color=Math.random()<0.5?"white":"black";
        this.vx=(Math.random()-0.5)*0.25;
        this.vy=(Math.random()-0.5)*0.25;
        this.clusterX=this.x+((Math.random()-0.5)*120);
        this.clusterY=this.y+((Math.random()-0.5)*120);
    }
    move(){
        this.x+=(this.clusterX-this.x)*0.003 + this.vx;
        this.y+=(this.clusterY-this.y)*0.003 + this.vy;

        if(Math.random()<0.002){
            this.clusterX=Math.random()*canvas.width;
            this.clusterY=Math.random()*canvas.height;
        }
        if(this.x<0||this.x>canvas.width||this.y<0||this.y>canvas.height){
            this.reset();
        }
    }
    draw(){
        ctx.fillStyle=this.color;
        ctx.fillRect(this.x,this.y,this.size,this.size);
    }
}

let pixels=[];
for(let i=0;i<120;i++){ pixels.push(new Pixel()); }

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pixels.forEach(p=>{p.move();p.draw();});
    requestAnimationFrame(animate);
}
animate();

});
