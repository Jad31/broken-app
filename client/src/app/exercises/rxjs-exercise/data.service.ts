import { HttpClient } from "@angular/common/http";
import { DestroyRef, Injectable, inject, signal } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map, shareReplay, takeUntil } from "rxjs/operators";

export interface User {
  id: number;
  name: string;
  score: number;
}

@Injectable({
  providedIn: "root",
})
export class DataService {
  private destroyRef = inject(DestroyRef);
  private destroy$ = new Subject<void>();
  private apiUrl = "http://localhost:3000/users";
  private cache$: Observable<User[]>;

  users = signal<User[]>([]);

  constructor(private http: HttpClient) {
    this.destroyRef.onDestroy(() => {
      this.destroy$.next();
      this.destroy$.complete();
    });

    this.cache$ = this.http.get<User[]>(this.apiUrl).pipe(
      map((users) => users.sort((a, b) => b.score - a.score)),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    this.http
      .get<User[]>(this.apiUrl)
      .pipe(takeUntil(this.destroy$))
      .subscribe((users) => {
        this.users.set(users.sort((a, b) => b.score - a.score));
      });
  }

  loadUsers(): Observable<User[]> {
    return this.cache$;
  }

  updateScore(userId: number, newScore: number): void {
    this.users.update((users) =>
      users.map((user) =>
        user.id === userId ? { ...user, score: newScore } : user
      )
    );

    this.http
      .patch<User>(`${this.apiUrl}/${userId}/score`, { score: newScore })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
