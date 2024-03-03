import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Event } from '../model/event';
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  events: Event[] = [];
  eventForm!: FormGroup;

  constructor(private eventService: EventService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getEvents();
    this.initEventForm();

  }

  getEvents(): void {
    this.eventService.retrieveAllEvents().subscribe(events => this.events = events);
  }


  initEventForm(): void {
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      banner: [''],
      date: ['', Validators.required],
      category: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      status: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const eventData = this.eventForm.value;
      this.eventService.addEvent(eventData).subscribe(
        (newEvent: Event) => {
          this.events.push(newEvent);
          this.eventForm.reset();
        },
        (error) => {
          console.error('Error adding event:', error);
          // Add the following line to log the error details
          console.log('Error details:', error);
        }
      );

    } else {
      console.log('Form has validation errors');
    }
  }


  deleteEvent(idEvent: number): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.removeEvent(idEvent).subscribe(
        () => {
          console.log('Event deleted successfully.');
          // Remove the deleted event from the local array to update the UI
          this.events = this.events.filter((event) => event.idEvent !== idEvent);
        },
        (error) => {
          console.error('Error removing event:', error);
        }
      );
    }


  }

}
