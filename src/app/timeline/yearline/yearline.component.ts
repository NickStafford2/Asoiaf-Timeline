import { Component, OnInit, Input, OnChanges, SimpleChanges, ElementRef } from "@angular/core";
import { LinesService } from "../lines.service";
import { TimelineService } from "../timeline.service";

@Component({
  selector: "app-yearline",
  templateUrl: "./yearline.component.html",
  styleUrls: ["./yearline.component.scss"],
})
export class YearlineComponent {}
