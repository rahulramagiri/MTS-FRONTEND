import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNavComponent } from './new-nav.component';

describe('NewNavComponent', () => {
  let component: NewNavComponent;
  let fixture: ComponentFixture<NewNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
