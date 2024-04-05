import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnDestroy {
  errorMessage: string | null = null;
  private errorMessageSubscription: Subscription;

  constructor(private errorService: ErrorService) {
    this.errorMessageSubscription = this.errorService.errorMessage.subscribe(
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  ngOnDestroy() {
    this.errorMessageSubscription.unsubscribe();
  }

  clearError() {
    this.errorService.clearError();
  }
}
