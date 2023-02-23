import { useXR, useController } from '@react-three/xr';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';

import { useRef, useEffect } from 'react';

// mapping
// 1: Trigger
// 2: Grip
// 4: Stick Buttons
// 5: A/X
// 6: B/Y

// axes
// 2: XStick
// 3: YStick

export default function VRControls({
	hand = 'right',
	zeroY = true,
	horizontalSensitivity = 0.5,
	forwardSensistivity = 0.05,
	rotationSensitivity = 0.05,
	deadzone = 0.05,
	horizontalAxis = 2,
	forwardAxis = 3,
	rotationAxis = 2,
	applyForward = true,
	applyHorizontal = false,
	applyRotation = true,
	scale,
	setScale
}) {
	const { player } = useXR();
  const val = useXR();
	const controller = useController(hand);
	const left = useController('left');
	const forward = useRef(new Vector3());
	const horizontal = useRef(new Vector3());
	console.log(player)

	const { gl, camera, scene } = useThree();

	const cam = gl.xr.getCamera()

	console.log(scene)


	useEffect(() => {
		return
		}, [])

	let i = 1
	useFrame((_,delta) => {


		if (controller && player) {
			const { axes } = controller.inputSource.gamepad;
			const { buttons } = controller.inputSource.gamepad;
			const camera = player.children[0];
			const cameraMatrix = camera.matrixWorld.elements;

			
			if(left.inputSource.gamepad.buttons[5].pressed){
				setScale(scale+0.001)
			}
			if(left.inputSource.gamepad.buttons[4].pressed){
				setScale(scale-0.001)
			}

			forward.current
				.set(-cameraMatrix[8], -cameraMatrix[9], -cameraMatrix[10])
				.normalize();

			if (zeroY) {
				forward.current.y = 0;
				horizontal.current.y = 0;
			}

			if (applyHorizontal) {
				horizontal.current.copy(forward.current);
				horizontal.current.cross(camera.up).normalize();
				player.position.add(
					horizontal.current.multiplyScalar(
						(Math.abs(axes[horizontalAxis]) > deadzone
							? axes[horizontalAxis]
							: 0) * horizontalSensitivity,
					),
				);
			}

			if (applyForward) {
				player.position.add(
					forward.current.multiplyScalar(
						(Math.abs(axes[forwardAxis]) > deadzone ? -axes[forwardAxis] : 0) *
							forwardSensistivity,
					),
				);
			}

			if (applyRotation) {
				player.rotation.y -=
					(Math.abs(axes[rotationAxis]) > deadzone ? axes[rotationAxis] : 0) *
					rotationSensitivity;
			}
		}
	});
	return <></>;
}
