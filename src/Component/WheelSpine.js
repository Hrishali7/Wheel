import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { Spine } from "pixi-spine";
import pointerImage from "../assets/wheel1.png";
import gsap from "gsap";

function WheelSpine() {

  const spineRef = useRef(null);
  let wheelRef = useRef(null);

  function rotationWheel() {
    console.log("rotation wheel called");

    const wheelBone = wheelRef?.current.skeleton.findBone("wheel");
    const fullSpins = 2;
    const desiredIndex = 5;
    console.log("targetRotation", wheelBone);
  console.log(wheelBone.rotation);
     if(wheelBone){
       const targetRotation =  (fullSpins * 360) + (22.5 * (desiredIndex - 1));   
        
        gsap.to(wheelBone, {
           rotation: targetRotation,
           duration: 4,         
           ease: "power4.out",   
           onUpdate: () => {
           },

           onComplete: () => {
          console.log(wheelBone.rotation);
             wheelBone.rotation = 22.5 * (desiredIndex - 1);
             wheelRef.current.state.setAnimation(
  0,
  "golden/win_wedge_with_special_effect_intro",
  false
);
     }
   });
     }
  }
  useEffect(() => {
    const app = new PIXI.Application({ resizeTo: window, transparent: true });
    window.__PIXI_APP__ = app;
    spineRef.current.appendChild(app.view);

    const container = new PIXI.Container();
    container.x = app.screen.width / 2;
    container.y = app.screen.height / 2;
    app.stage.addChild(container);


    PIXI.Assets.load("/Assets/Normal_wheel.json").then((spineResource) => {
      const skeleton = new Spine(spineResource.spineData);
      skeleton.scale.set(0.4);
      container.addChild(skeleton);
      wheelRef.current = skeleton;

      skeleton.state.setAnimation(0, "golden/wheel_intro", false);
      const wheelBone = skeleton.skeleton.findBone("wheel");

      const pointerSprite = new PIXI.Sprite(PIXI.Texture.from(pointerImage));
      pointerSprite.anchor.set(0.5,1);
      pointerSprite.scale.set(0.5);
      pointerSprite.x = 4;   
      pointerSprite.y = 580; 
      container.addChild(pointerSprite);

      const buttonContainer = new PIXI.Container();
      buttonContainer.y = 400;
      container.addChild(buttonContainer);
      
      const buttonGraphics = new PIXI.Graphics();
      buttonGraphics.beginFill(0xffffff);
      buttonGraphics.drawRoundedRect(-70, 0, 140, 50, 10);
      buttonGraphics.endFill();
      buttonGraphics.interactive = true;
      buttonGraphics.buttonMode = true;
      buttonGraphics.eventMode= "static";
      buttonGraphics.cursor ="pointer";
      buttonContainer.addChild(buttonGraphics);

        const buttonText = new PIXI.Text("SPIN", {
        fontFamily: "Arial",
        fontSize: 24,
        fill: 0x000000,
        fontWeight: "bold",
      });

      buttonText.anchor.set(0.5);
      buttonText.x = 0;
      buttonText.y = 25;
      buttonContainer.addChild(buttonText);

   buttonGraphics.on("pointerdown", () => {
    console.log("button clicked");
    rotationWheel()
    
  });
        const numberStyle = new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 40,
        fill: "#ffffff",
        fontWeight: "bold",
        align: "center",
      });
        for (let i = 1; i <= 16; i++) {
        const slotName = "place_holder" + (i === 1 ? "" : i);
        const slot = skeleton.skeleton.findSlot(slotName);
        if (!slot || !slot.currentSprite) continue;

        const numberText = new PIXI.Text(i.toString(), numberStyle);
        numberText.anchor.set(0.5);
        slot.currentSprite.addChild(numberText);
      }
        skeleton.state.addListener({
        complete: (entry) => {
        const name = entry.animation.name;
            if (name === "golden/win_wedge_with_special_effect_intro") {
            skeleton.state.setAnimation(0,"golden/win_wedge_with_special_effect_loop",true);
          }
        },
      });

    });

    return () => {
      app.destroy(true, true);
    };
  }, []);

  return <div ref={spineRef} />;
}

export default WheelSpine;



























































































































































