
import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { Spine } from "pixi-spine";
import pointerImage from "../assets/wheel1.png";

function WheelSpine() {
  const spineRef = useRef(null);
    
  useEffect(() => {
    const app = new PIXI.Application({ resizeTo: window, transparent: true });
    window.__PIXI_APP__ = app;
    spineRef.current.appendChild(app.view);

    const container = new PIXI.Container();
    container.x = app.screen.width / 2;
    container.y = app.screen.height / 2;
    app.stage.addChild(container);

    let speed = 0;
    let hasPlayedWin = false;
    const TOTAL_SLOTS = 16;
    const SEGMENT_ANGLE = (Math.PI * 2) / TOTAL_SLOTS;
    let desiredIndex = 5;
    let targetAngle = null;
    let hasSnapped = false;
    

    PIXI.Assets.load("/Assets/Normal_wheel.json").then((spineResource) => {
      const skeleton = new Spine(spineResource.spineData);
      skeleton.scale.set(0.4);
      container.addChild(skeleton);

      skeleton.state.setAnimation(0, "golden/wheel_intro", false);
      const wheelBone = skeleton.skeleton.findBone("wheel");

          function setDesiredStop() {
          desiredIndex = 7;
          const anglePerSlot = SEGMENT_ANGLE;
          const currentRotation = wheelBone.rotation ;
          const fullSpins = 2; 
targetAngle = wheelBone.rotation + fullSpins * 2 * Math.PI + desiredIndex * SEGMENT_ANGLE;

         hasSnapped = false;
         speed = Math.PI * 2;
         
}
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
        if (!wheelBone) return;
        hasPlayedWin = false;
        hasSnapped = false;
        setDesiredStop(7);
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

         app.ticker.add(() => {
         if (speed > 0) {
          wheelBone.rotation -= speed;
          speed -= 0.007;

    if (desiredIndex !== null && !hasSnapped && speed < 0.05 ){
        const delta = wheelBone.rotation - targetAngle;
            if (Math.abs(delta) < 0.01) {
                wheelBone.rotation = targetAngle;
                speed = 0;
                hasSnapped = true;
    }
    if (!hasPlayedWin ) {
              hasPlayedWin = true;
              skeleton.state.setAnimation(0, "golden/win_wedge_with_special_effect_intro", false );
            }
          }
        }
        
        skeleton.update(app.ticker.deltaMS / 1000);
      });
    });

    return () => {
      app.destroy(true, true);
    };
  }, []);

  return <div ref={spineRef} />;
}

export default WheelSpine;
































































































