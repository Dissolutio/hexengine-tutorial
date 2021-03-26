import {
  useType,
  useNewComponent,
  useChild,
  Canvas,
  Grid,
  // Physics,
  Vector,
  useDraw,
  SystemFont,
  Label,
} from "@hex-engine/2d";
import Cell from "./Cell";

export default function Root() {
  useType(Root);

  const canvas = useNewComponent(() => Canvas({ backgroundColor: "white" }));
  canvas.fullscreen();
  // This is the current state of the game
  let state = "PLACING_X";

  const grid = new Grid<string>(3, 3, " ");
  const cellSize = new Vector(32, 32);
  const firstCellPosition = new Vector(100, 100);
  for (const [rowIndex, columnIndex] of grid.contents()) {
    useChild(() =>
      Cell({
        size: cellSize,
        position: firstCellPosition
          .addX(cellSize.x * rowIndex)
          .addY(cellSize.y * columnIndex),
        getContent: () => grid.get(rowIndex, columnIndex),
        onClick: () => {
          switch (state) {
            case "PLACING_X": {
              const content = grid.get(rowIndex, columnIndex);
              if (content === " ") {
                grid.set(rowIndex, columnIndex, "x");
                state = "PLACING_O";
              }
              break;
            }
            case "PLACING_O": {
              const content = grid.get(rowIndex, columnIndex);
              if (content === " ") {
                grid.set(rowIndex, columnIndex, "o");
                state = "PLACING_X";
              }
              break;
            }
          }
        },
      })
    );
  }

  // Create the font
  const font = useNewComponent(() =>
    SystemFont({ name: "sans-serif", size: 14 })
  );
  // Create the label
  const stateLabel = useNewComponent(() => Label({ font }));
  // Render the label on each frame
  useDraw((context) => {
    switch (state) {
      case "PLACING_X": {
        stateLabel.text = "X's turn";
        break;
      }
      case "PLACING_O": {
        stateLabel.text = "O's turn";
        break;
      }
      case "X_WON": {
        stateLabel.text = "X won";
        break;
      }
      case "O_WON": {
        stateLabel.text = "O won";
        break;
      }
      case "TIE": {
        stateLabel.text = "Tie game";
        break;
      }
    }
    stateLabel.draw(context);
  });
}
