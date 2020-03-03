import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostUploadComponent } from './post-upload.component';

describe('PostUploadComponent', () => {
  let component: PostUploadComponent;
  let fixture: ComponentFixture<PostUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
