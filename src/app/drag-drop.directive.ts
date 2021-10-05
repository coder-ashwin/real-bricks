import { Directive, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDragDrop]'
})

export class DragDropDirective {
  @Output() onFileDropped = new EventEmitter<any>();

  @HostBinding('style.background-color') private background = 'rgba(255,255,255,1)'
  @HostBinding('style.opacity') private opacity = '1'
  @HostBinding('style.border-color') private border = '#BBB'
  @HostBinding('style.color') private color = '#BBB'

  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = 'rgba(0,0,0,0.25)';
    this.opacity = '0.8';
    this.border = '#FFF';
    this.color = '#FFF';
  }
  
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = 'rgba(255,255,255,1)';
    this.opacity = '1';
    this.border = '#BBB';
    this.color = '#BBB';
  }
  
  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = 'rgba(255,255,255,1)';
    this.opacity = '1'
    this.border = '#BBB';
    this.color = '#BBB';
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files)
    }
  }
}