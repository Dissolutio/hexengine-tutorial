import {
  useType,
  useNewComponent,
  useDraw,
  Geometry,
  Polygon,
  SystemFont,
  Label,
  Mouse,
} from "@hex-engine/2d";
export default function Cell({ size, position, getContent, onClick }) {
  useType(Cell);
  useNewComponent(() =>
    Geometry({
      shape: Polygon.rectangle(size),
      position,
    })
  );
  const font = useNewComponent(() =>
    SystemFont({ name: "sans-serif", size: size.y })
  );
  const label = useNewComponent(() => Label({ font }));
  useDraw((context) => {
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.strokeRect(0, 0, size.x, size.y);
    // Get and render the latest text
    label.text = getContent();
    label.draw(context, { x: size.x / 3.5, y: size.y / 1.2 });
  });
  const mouse = useNewComponent(Mouse);
  mouse.onClick(onClick);
}
