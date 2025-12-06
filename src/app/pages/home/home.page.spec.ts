import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { UserListComponent } from 'src/app/components/user-list/user-list.component';

describe('HomePage', () => {
  let component: HomePage;
  let commponent: UserListComponent;
  let fixture: ComponentFixture<HomePage>;
  let comfixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage, UserListComponent]
    }).compileComponents();
    comfixture = TestBed.createComponent(UserListComponent);
    commponent = comfixture.componentInstance;
    comfixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
