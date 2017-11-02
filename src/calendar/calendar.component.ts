import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output,} from '@angular/core';
import $ from 'jquery';
import 'fullcalendar';
import 'fullcalendar-scheduler';

import {Options} from 'fullcalendar';

@Component({
    template: '<div></div>',
    selector: 'jl-angular-fullcalendar'
})
export class CalendarComponent implements AfterViewInit {

    @Input() options: Options;
    @Input('scheduler-license') scheduler: string;
    @Output() initialized: EventEmitter<boolean> = new EventEmitter<boolean>();
    private _calendarElement: any;

    constructor(private elRef: ElementRef) {
        this._calendarElement = $(this.elRef.nativeElement);
    }

    ngAfterViewInit() {
        setTimeout(async () => {
            // console.log("100ms after ngAfterViewInit ");
            if (this.scheduler) {
                this.options.schedulerLicenseKey = this.scheduler;
            }
            this._calendarElement.fullCalendar(this.options);
            this.initialized.emit(true);
        }, 100);
    }


    fullCalendar(...args: any[]) {
        if (!args) {
            return;
        }
        return this._calendarElement.fullCalendar(...args);
    }

}
