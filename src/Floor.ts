import {
  useType,
  useNewComponent,
  Geometry,
  Polygon,
  Vector,
  Physics,
  useDraw,
} from "@hex-engine/2d";
import Draggable from "./Draggable";

export default function Floor(position: Vector) {
  useType(Floor);

  const geometry = useNewComponent(() =>
    Geometry({
      shape: Polygon.rectangle(new Vector(400, 10)),
      position: position.clone(),
    })
  );

  useNewComponent(() => Physics.Body(geometry, { isStatic: true }));
  useNewComponent(() => Draggable(geometry));
  useDraw((context) => {
    context.fillStyle = "#ddd";
    geometry.shape.draw(context, "fill");
  });
}
