import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
// import { UserIdleModule } from 'angular-user-idle';
import { UserIdleService } from '../../../projects/angular-user-idle/src/lib/angular-user-idle.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  @Output() changeIdleValues = new EventEmitter();
  idle: number;
  timeout: number;
  ping: number;
  lastPing: string;
  isWatching: boolean;
  isTimer: boolean;
  timeIsUp: boolean;
  timerCount: number;

  private timerStartSubscription: Subscription;
  private timeoutSubscription: Subscription;
  private pingSubscription: Subscription;
  private idleStatusChangedSubscription: Subscription;

  constructor(private userIdle: UserIdleService) {
  }

  ngOnInit() {
    this.idle = this.userIdle.getConfigValue().idle / 1000;
    this.timeout = this.userIdle.getConfigValue().timeout;
    this.ping = this.userIdle.getConfigValue().ping / 1000;
    this.changeIdleValues.emit({
      idle: this.idle,
      timeout: this.timeout,
      ping: this.ping
    });
  }

  onStartWatching() {
    this.isWatching = true;
    this.timerCount = this.timeout;
    this.userIdle.setConfigValues({
      idle: this.idle,
      timeout: this.timeout,
      ping: this.ping
    });

    // Start watching for user inactivity.
    this.userIdle.startWatching();

    // Start watching when user idle is starting.
    this.timerStartSubscription = this.userIdle.onTimerStart()
      .pipe(tap(() => this.isTimer = true))
      .subscribe(count => this.timerCount = count);

    // Start watch when time is up.
    this.timeoutSubscription = this.userIdle.onTimeout()
      .subscribe(() => this.timeIsUp = true);

    this.idleStatusChangedSubscription = this.userIdle.onIdleStatusChanged()
        .subscribe((idle) => {
            console.log('timer.component -> onIdleStatusChanged -> idle: ', idle);
        });

    this.pingSubscription = this.userIdle.ping$
      .subscribe(value => this.lastPing = `#${value} at ${new Date().toString()}`);
  }

  onStopWatching() {
    this.userIdle.stopWatching();
    this.timerStartSubscription.unsubscribe();
    this.timeoutSubscription.unsubscribe();
    this.pingSubscription.unsubscribe();
    this.idleStatusChangedSubscription.unsubscribe();

    this.isWatching = false;
    this.isTimer = false;
    this.timeIsUp = false;
    this.lastPing = null;
  }

  onStopTimer() {
    this.userIdle.stopTimer();
    this.isTimer = false;
  }

  onResetTimer() {
    this.userIdle.resetTimer();
    this.isTimer = false;
    this.timeIsUp = false;
  }

  onIdleKeyup() {
    this.changeIdleValues.emit({idle: this.idle});
  }

  onTimeoutKeyup() {
    this.changeIdleValues.emit({timeout: this.timeout});
  }

  onPingKeyup() {
    this.changeIdleValues.emit({ping: this.ping});
  }
}
