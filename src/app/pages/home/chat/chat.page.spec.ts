import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatPage } from './chat.page';
import { ChatBoxComponent } from 'src/app/components/chat-box/chat-box.component';

describe('ChatPage', () => {
  let component: ChatPage;
  let commponent: ChatBoxComponent;
  let fixture: ComponentFixture<ChatPage>;
  let comfixture: ComponentFixture<ChatBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatPage, ChatBoxComponent]
    }).compileComponents();
    comfixture = TestBed.createComponent(ChatBoxComponent);
    commponent = comfixture.componentInstance;
    comfixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
