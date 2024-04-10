import {MatSnackBar} from "@angular/material/snack-bar";
import {Injectable} from "@angular/core";
import {NotificationType} from "./notification.type";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {
  }

  showSuccess(message: string) {
    this.showNotification(message, NotificationType.Success);
  }

  showWarning(message: string) {
    this.showNotification(message, NotificationType.Warning);
  }

  showError(message: string) {
    this.showNotification(message, NotificationType.Error);
  }

  private showNotification(message: string, type: NotificationType) {
    this.snackBar.open(message, 'Zamknij', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [type]
    });
  }
}
