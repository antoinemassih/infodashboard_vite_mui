import {ChartModifierBase2D} from "scichart/Charting/ChartModifiers/ChartModifierBase2D";
import {EChart2DModifierType} from "scichart/types/ChartModifierType";
import {LineAnnotation} from "scichart/Charting/Visuals/Annotations/LineAnnotation.js";
import {
    EAnnotationLayer,
    ECoordinateMode,
    EHorizontalAnchorPoint,
    EVerticalAnchorPoint,
    TextAnnotation
} from "scichart";
export class SimpleChartModifierJs extends ChartModifierBase2D {
    constructor() {
        super();
        this.type = EChart2DModifierType.Custom;
    }
    modifierMouseDown(args) {
        super.modifierMouseDown(args);
        console.log(`MouseDown at point ${args.mousePoint.x}, ${args.mousePoint.y} and the mouse button is ${args.button}`);
        if(args.button === 2) {
            this.parentSurface.annotations.add(
                new TextAnnotation({
                    text: "SPY Aug 15 5min",
                    horizontalAnchorPoint: EHorizontalAnchorPoint.Center,
                    verticalAnchorPoint: EVerticalAnchorPoint.Center,
                    x1: 0.1,
                    y1: 0.1,
                    fontSize: 24,
                    fontWeight: "Bold",
                    textColor: "#FFFFFF22",
                    xCoordinateMode: ECoordinateMode.Relative,
                    yCoordinateMode: ECoordinateMode.Relative,
                    annotationLayer: EAnnotationLayer.BelowChart,
                }));

        }
    }
    modifierMouseMove(args) {
        super.modifierMouseMove(args);
        //console.log(`MouseMove at point ${args.mousePoint.x}, ${args.mousePoint.y}`);
    }
    modifierMouseUp(args) {
        super.modifierMouseUp(args);
        //console.log(`MouseUp at point ${args.mousePoint.x}, ${args.mousePoint.y}`);
    }
    modifierDoubleClick(args) {
        super.modifierDoubleClick(args);
        //.log(`DoubleClick at point ${args.mousePoint.x}, ${args.mousePoint.y}`);
    }
    modifierMouseWheel(args) {
        super.modifierMouseWheel(args);
      //  console.log(`MouseWheel delta=${args.mouseWheelDelta} at point ${args.mousePoint.x}, ${args.mousePoint.y}`);
    }
    modifierMouseEnter(args) {
        super.modifierMouseEnter(args);
        //console.log(`MouseEnter!`);
    }
    modifierMouseLeave(args) {
        super.modifierMouseLeave(args);
        //console.log(`MouseLeave!`);
    }
}