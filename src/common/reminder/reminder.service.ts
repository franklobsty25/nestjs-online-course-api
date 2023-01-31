import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationDto } from '../notification/dto/notification.dto';
import { NotificationService } from '../notification/service/notification.service';

@Injectable()
export class ReminderService {
  private readonly logger = new Logger();

  constructor(private readonly notificationService: NotificationService) {}

  @Cron(CronExpression.MONDAY_TO_FRIDAY_AT_09_30AM, { name: 'course_reminder' })
  async handleCourseReminder(email: string) {
    try {
      const payload: NotificationDto = {
        email: email,
        subject: 'Course Reminder',
        message:
          'This is to reminder you of your course lessions. \nPlease do well to complete it.',
      };

      this.logger.log('Course reminder');

      await this.notificationService.sendEmailNotification(payload);
    } catch (error) {
      throw new Error(error);
    }
  }
}
